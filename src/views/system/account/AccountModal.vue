<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { getAllDepts, addAccount, editAccount, isAccountExist } from '/@/api/system';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [
        registerForm,
        {
          setFieldsValue,
          updateSchema,
          resetFields,
          validate,
          removeSchemaByField,
          appendSchemaByField,
        },
      ] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          //  编辑时, 添加 id 字段
          removeSchemaByField('id'); //  清除字段
          appendSchemaByField(
            {
              field: 'id',
              label: '账号ID',
              required: true,
              component: 'Input',
              componentProps: {
                disabled: true,
                defaultValue: data.record.id,
              },
            },
            undefined,
            true,
          );
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        } else {
          removeSchemaByField('id'); //  清除字段
        }

        const treeData = await getAllDepts();
        updateSchema([
          // {
          //   field: 'pwd',
          //   show: !unref(isUpdate),
          // },
          {
            field: 'dept',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 角色保存操作
          console.log('_values', values);
          try {
            !unref(isUpdate) ? await addAccount(values) : await editAccount(values);
            closeModal();
            emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
          } catch (error) {
            console.log('role save eror', error);
          }
        } finally {
          setModalProps({ confirmLoading: true });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
