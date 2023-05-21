<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>Table 组件</template>
    <template #headerContent>useTable</template>
    <div class="main">
      <BasicTable @register="registerTable" :columns="columns" @edit-end="onEditEnd">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  label: '编辑',
                  onClick: handleEdit.bind(null, record),
                  type: 'primary',
                  tooltip: {
                    title: '编辑能力',
                  },
                  // auth: 'other', // 根据权限控制是否显示: 无权限，不显示
                },
                {
                  label: '删除',
                  icon: 'ic:outline-delete-outline',
                  popConfirm: {
                    title: '是否删除？',
                    confirm: handleDelete.bind(null, record),
                  },
                  // auth: 'super', // 根据权限控制是否显示: 有权限，会显示
                },
              ]"
              :drop-down-actions="[
                {
                  label: '启用',
                  popConfirm: {
                    title: '是否启用？',
                    confirm: handleOpen.bind(null, record),
                  },
                  ifShow: (_action) => {
                    return record.status === '1'; // 根据业务控制是否显示: 非enable状态的不显示启用按钮
                  },
                },
                {
                  label: '禁用',
                  popConfirm: {
                    title: '是否禁用？',
                    confirm: handleOpen.bind(null, record),
                  },
                  ifShow: () => {
                    return record.status === '0'; // 根据业务控制是否显示: enable状态的显示禁用按钮
                  },
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getBasicData, searchFormSchema } from './tableData';
  import { getMenuListByPage } from '/@/api/system/index';

  /**
   * useForm methods
   *  setProps 设置表格参数
   *  reload 刷新
   *  redoHeight 重新计算高度
   *  getDataSource 获取表格数据
   *  getRawDataSource 获得后端接口返回原始数据
   *
   * 内置组件
   *  TableAction 右侧操作列渲染
   *  TableImg 渲染单元格图片, 支持预览
   */

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      TableAction,
    },
    setup() {
      const [registerTable, { reload, getForm }] = useTable({
        // title: 'useForm 示例',
        api: getMenuListByPage,
        bordered: true,
        showHeader: true,
        useSearchForm: true,
        showTableSetting: true,
        tableSetting: {
          redo: true, //  刷新
          size: true, //  尺寸
          setting: true, // 字段调整
          fullScreen: true, //  全屏幕
        },
        afterFetch: (data) => {
          console.log('_afterFetch', data);
          return data;
        },
        // 单元格编辑提交
        // beforeEditSubmit: ({ record }) => {
        //   console.log('_beforeEditSubmit', record);
        // },
        // fetchSetting
        //  额外请求参数
        searchInfo: {
          customVari: 'smiling',
        },
        formConfig: {
          labelWidth: '120px',
          schemas: searchFormSchema,
        },
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 250,
        },
      });
      return {
        registerTable,
        columns: getBasicColumns(),
        data: getBasicData(),
        bordered: true,
        handleEdit(record) {
          console.log('handleEdit', record.id);
          setTimeout(() => {
            reload();
          }, 1500);
        },
        handleDelete(record) {
          console.log('handleDelete', record.id);

          setTimeout(() => {
            reload();
          }, 1500);
        },
        handleOpen(record) {
          console.log('点击了启用', record);

          // 当然表单设置了搜索时 getForm 即是获取表单对象
          const formRef = getForm();
          const values = formRef.getFieldsValue(); // 获取字段值
          console.log('_formRef values', values);
        },
        // 单元格编辑结束触发事件
        onEditEnd({ record, index, key, value }) {
          console.log('_onEditEnd', record, index, key, value);
        },
      };
    },
  });
</script>

<style scoped lang="scss"></style>
