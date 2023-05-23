<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>Qrcode</template>
    <template #headerContent>二维码生成</template>

    <div class="main">PageWrapper main</div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: {
      PageWrapper,
    },
    setup() {
      return {};
    },
  });
</script>

<style scoped lang="scss"></style>
