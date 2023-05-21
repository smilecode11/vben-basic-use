<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>Table 组件</template>
    <template #headerContent>useTable</template>
    <div class="main">
      <BasicTable @register="registerTable" :columns="columns">
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '编辑',
                onClick: handleEdit.bind(null, record),
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
      </BasicTable>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';
  import { getMenuListByPage } from '/@/api/system/index';

  /**
   * setProps 设置表格参数
   * reload 刷新
   * redoHeight 重新计算高度
   * getDataSource 获取表格数据
   * getRawDataSource 获得后端接口返回原始数据
   */

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      TableAction,
    },
    setup() {
      const [registerTable, { reload, scrollTo, redoHeight }] = useTable({
        title: 'useForm 示例',
        api: getMenuListByPage,
        bordered: true,
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 250,
          slots: { customRender: 'action' },
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
          redoHeight();
          scrollTo('bottom');
        },
      };
    },
  });
</script>

<style scoped lang="scss"></style>
