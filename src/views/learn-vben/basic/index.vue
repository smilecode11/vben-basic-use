<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>Basic 组件</template>
    <template #headerContent>基础组件</template>
    <div class="main">
      <BasicTitle :helpMessage="['BasicTitle', '多个提示使用数组字符串']"> BasicTitle </BasicTitle>
      <BasicTitle :helpMessage="'span 默认不显示左侧蓝边'" :span="true">
        BasicTitle prop span
      </BasicTitle>
      <BasicTitle :normal="true"> BasicTitle prop normal </BasicTitle>
      <!-- 箭头
          expand	箭头展开 -> 向下
        -->
      <div class="title">
        BasicArrow 带箭头的组件
        <BasicArrow />
      </div>
      <div class="helper">
        BasicHelp 带帮助的组件
        <BasicHelp
          showIndex
          :text="['placement	方向', 'showIndex 显示序列号', 'color 颜色']"
          :placement="'bottom'"
          :color="'skyblue'"
        />
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle, BasicArrow, BasicHelp } from '/@/components/Basic/index';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTitle,
      BasicArrow,
      BasicHelp,
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
