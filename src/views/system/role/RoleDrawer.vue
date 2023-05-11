<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'menuName', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { getAllMenu, createRole, editorRole } from '/@/api/system';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const [
        registerForm,
        {
          resetFields,
          setFieldsValue,
          getFieldsValue,
          appendSchemaByField,
          removeSchemaByField,
          validate,
        },
      ] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          // TODO: 获取菜单列表
          treeData.value = (await getAllMenu()) as any as TreeItem[];
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          //  编辑时, 添加 id 字段
          removeSchemaByField('id'); //  清除字段
          appendSchemaByField(
            {
              field: 'id',
              label: '角色ID',
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
          //  表单赋值
          setFieldsValue({
            ...data.record,
          });
        } else {
          removeSchemaByField('id'); //  清除字段
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // 角色保存操作
          console.log('_values', values, '_filedValue', getFieldsValue());
          try {
            !unref(isUpdate) ? await createRole(values) : await editorRole(values);
            closeDrawer();
            emit('success');
          } catch (error) {
            console.log('role save eror', error);
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>
