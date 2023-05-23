<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>Editor Tinymce</template>
    <template #headerContent>富文本编辑器</template>

    <div class="main">
      <Tinymce v-model="value" @change="onValueChange" width="100%" />
      <a-button @click="submitContent" style="margin-top: 20px">提交富文本</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tinymce } from '/@/components/Tinymce/index';

  export default defineComponent({
    components: {
      PageWrapper,
      Tinymce,
    },
    setup() {
      const value = ref('hello world!');
      function onValueChange(value: string) {
        console.log('_', value);
      }

      return {
        value,
        onValueChange,
        submitContent: () => {
          console.log('提交内容', value);
        },
      };
    },
  });
</script>

<style scoped lang="scss">
  .main {
    padding: 16px;
  }
</style>
