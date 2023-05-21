<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title> <BasicTitle :span="true">Modal</BasicTitle> </template>
    <template #headerContent>Modal</template>
    <div class="main">
      <!-- modal -->
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTitle,
    },
    setup() {},
  });
</script>

<style lang="scss" scoped>
  .main {
    padding: 16px;
  }
</style>
