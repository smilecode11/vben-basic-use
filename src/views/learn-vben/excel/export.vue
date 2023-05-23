<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title> <BasicTitle :span="true">Excel</BasicTitle> </template>
    <template #headerContent>Excel export</template>
    <div class="main">
      <a-button @click="excelExport">导出json格式</a-button>
      <a-button @click="excelExportByCustom">自定义导出格式</a-button>
      <BasicTable :title="title" :data-source="dataSource" :columns="columns" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';
  import { BasicTable } from '/@/components/Table';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { title, columns, dataSource } from './data';

  const fmtClumns = columns.map((item) => ({ title: item, dataIndex: item }));

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTitle,
      BasicTable,
    },
    setup() {
      const excelExportByCustom = () => {
        jsonToSheetXlsx({
          data: dataSource,
          filename: '自定义导出格式.csv',
          write2excelOpts: {
            // 可以是 xlsx/html/csv/txt
            bookType: 'csv',
          },
        });
      };
      const excelExport = () => {
        // json 格式导出
        jsonToSheetXlsx({
          data: dataSource,
          header: {
            id: 'ID',
            name: '姓名',
            age: '年龄',
            no: '编号',
            address: '地址',
            beginTime: '开始时间',
            endTime: '结束时间',
          },
          filename: '自定头部导出.xlsx',
          json2sheetOpts: {
            header: ['id', 'name'], //指定排序
          },
        });
      };
      return {
        title,
        columns: fmtClumns,
        dataSource,
        excelExport,
        excelExportByCustom,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .main {
    padding: 16px;
  }
</style>
