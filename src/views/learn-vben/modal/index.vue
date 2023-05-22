<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title> <BasicTitle :span="true">Modal</BasicTitle> </template>
    <template #headerContent>Modal</template>
    <div class="main">
      <a-button @click="openModal">打开 Modal</a-button>
      <Modal @register="register" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';
  import { useModal } from '/@/components/Modal';
  import Modal from './Modal.vue';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTitle,
      Modal,
    },
    setup() {
      const [register, { openModal, setModalProps }] = useModal();

      // true/false: 打开/关闭弹窗
      // data: 传递到子组件的数据
      // openModal(true, data);
      // setModalProps(props) 修改弹窗 props

      return {
        register,
        openModal,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .main {
    padding: 16px;
  }
</style>
