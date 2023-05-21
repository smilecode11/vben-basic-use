<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>Table 组件</template>
    <template #headerContent>template</template>
    <div class="main">
      <!--  -->
    </div>
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

<style scoped lang="scss"></style>
