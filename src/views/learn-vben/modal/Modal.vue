<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @ok="handleConfirm"
    title="Modal 示例"
    :helpMessage="['Modal 基本使用', '一般 Modal 我们作为单文件处理']"
  >
    Modal Info.
    <template #insertFooter> 左边插槽描述 </template>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    components: {
      BasicModal,
    },
    setup() {
      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        // data, 外部传递的数据
        console.log('_modal data', data);
      });

      // changeOkLoading(true); 修改 ok loading
      // changeLoading(true); 修改 modal loading

      // 确定
      const handleConfirm = () => {
        closeModal();
      };

      return {
        register,
        closeModal,
        setModalProps: () => {
          setModalProps({ title: 'Modal New Title' });
        },
        handleConfirm,
      };
    },
  });
</script>

<style scoped lang="scss"></style>
