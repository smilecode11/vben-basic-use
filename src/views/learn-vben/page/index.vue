<template>
  <!-- 
      contentFullHeight 主体区域占满整个区域高度
      contentBackground 主体区域背景
      fixedHeight 主体区域固定高度
      contentStyle 主体区域样式
      contentClass 主体区域 class
     -->
  <PageWrapper contentBackground contentFullHeight>
    <template #title>PageWrpper component title slot</template>
    <template #headerContent>headerContent slot</template>
    <!-- <template #leftFooter>leftFooter slot</template>
      <template #rightFooter>rightFooter slot</template> -->

    <div class="main">PageWrapper main</div>

    <PageFooter>
      <template #left>PageFooter left</template>
      <template #right>PageFooter right</template>
    </PageFooter>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper, PageFooter } from '/@/components/Page';

  export default defineComponent({
    components: {
      PageWrapper,
      PageFooter,
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
