<template>
  <PageWrapper>
    <template #title>MarkDown</template>
    <div class="main">
      <a-button @click="toggleTheme('dark')" class="mb-2" type="primary">
        切换主题 - 黑暗主题
      </a-button>
      <br />
      <a-button @click="toggleTheme('classic')" class="mb-2" type="primary">
        切换主题 - 默认
      </a-button>

      <MarkDown ref="markDownRef" v-model:value="value" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { MarkDown, MarkDownActionType } from '/@/components/Markdown';

  export default defineComponent({
    components: {
      PageWrapper,
      MarkDown,
    },
    setup() {
      const markDownRef = ref<null | MarkDownActionType>(null);
      const value = ref('');

      function toggleTheme(type) {
        const markDown = unref(markDownRef);
        if (!markDown) return;
        const vditor = markDown.getVditor();
        vditor.setTheme(type);
      }
      return {
        markDownRef,
        value,
        toggleTheme,
      };
    },
  });
</script>

<style scoped>
  .main {
    padding: 12px;
  }
</style>
