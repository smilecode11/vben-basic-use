<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dept.data';

  import { getAllDepts, addDept, editDept } from '/@/api/system';

  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [
        registerForm,
        {
          resetFields,
          setFieldsValue,
          updateSchema,
          validate,
          removeSchemaByField,
          appendSchemaByField,
        },
      ] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        const treeData = await getAllDepts();
        //  填充上级部门数据
        updateSchema({
          field: 'parentDept',
          componentProps: { treeData },
        });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          //  编辑时, 添加 id 字段
          removeSchemaByField('id'); //  清除字段
          appendSchemaByField(
            {
              field: 'id',
              label: '部门ID',
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
          setFieldsValue({
            ...data.record,
          });
        } else {
          removeSchemaByField('id');
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        // 新增/编辑部门项
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          console.log(values);
          const result = unref(isUpdate) ? await editDept(values) : await addDept(values);
          console.log('_result', result);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
