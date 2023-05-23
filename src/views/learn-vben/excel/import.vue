<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title> <BasicTitle :span="true">Excel</BasicTitle> </template>
    <template #headerContent>Excel import</template>
    <div class="main">
      <ImpExcel @success="loadDataSuccess">
        <a-button>导入 Excel</a-button>
      </ImpExcel>

      <!-- table -->
      <BasicTable
        :title="tableData.title"
        :data-source="tableData.dataSource"
        :columns="tableData.columns"
      />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';
  import { ImpExcel, ExcelData } from '/@/components/Excel';
  import { BasicTable } from '/@/components/Table';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTitle,
      ImpExcel,
      BasicTable,
    },
    setup() {
      const tableListRef = ref<any>(null);
      let tableData = ref<{ title: string; dataSource: any; columns: any }>({
        title: '',
        dataSource: [],
        columns: [],
      });

      function loadDataSuccess(excelDataList: ExcelData[]) {
        console.log('_loadDataSuccess', excelDataList);
        for (const excelData of excelDataList) {
          const {
            header,
            results,
            meta: { sheetName },
          } = excelData;
          const columns: any[] = [];
          for (const title of header) {
            columns.push({ title, dataIndex: title });
          }
          tableData.value = { title: sheetName, dataSource: results, columns };
        }
      }

      return {
        tableListRef,
        loadDataSuccess,
        tableData,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .main {
    padding: 16px;
  }
</style>
