<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ name }}</a>
          是一个基于Vue3.0、Vite、 Ant-Design-Vue 、TypeScript
          的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。
        </span>
      </div>
      <a-input v-model="inputValue" placeholder="输入文案" />
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { ref, defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'TestControlPage',
    components: { PageWrapper },
    setup() {
      const inputValue = ref('滴滴滴');

      const { pkg } = __APP_INFO__;
      const { name } = pkg;

      return {
        inputValue,
        name,
      };
    },
  });
</script>
