<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title> <BasicTitle :span="true">Drawer</BasicTitle> </template>
    <template #headerContent>Drawer</template>
    <div class="main">
      <a-button @click="openDrawer">打开 Drawer</a-button>
      <Drawer @register="register" @success="onDrawerSuccess" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';
  import { useDrawer } from '/@/components/Drawer';
  import Drawer from './Drawer.vue';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTitle,
      Drawer,
    },
    setup() {
      const [register, { openDrawer, setDrawerProps }] = useDrawer();
      // openDrawer(boolean, any)
      // true/false: 打开关闭弹窗
      // data: 传递到子组件的数据
      // 新增
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }
      //  编辑
      function handleEdit(record) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      return {
        register, //  注册 drawer 实例
        openDrawer, //  打开 drawer
        setDrawerProps, //  修改 props
        handleCreate,
        handleEdit,
        onDrawerSuccess() {
          console.log('_onDrawerSuccess');
        },
      };
    },
  });
</script>

<style lang="scss" scoped>
  .main {
    padding: 16px;
  }
</style>
