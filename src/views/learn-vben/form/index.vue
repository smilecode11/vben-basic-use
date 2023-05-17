<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>Form component</template>
    <template #headerContent>表单组件</template>

    <div class="main"> form 组件 </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: {
      PageWrapper,
    },
    data() {
      return {};
    },
    mounted() {},
    unmounted() {},
    methods: {},
  });
</script>

<style lang="scss" scoped></style>
