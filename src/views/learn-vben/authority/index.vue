<template>
  <PageWrapper>
    <template #title>Authority 权限组件</template>
    <template #headerContent>根据不同角色展示</template>

    <div class="main">
      <Authority :value="['00001', '10001']">
        <a-button type="primary" block> 只有admin角色可见 </a-button>
      </Authority>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Authority } from '/@/components/Authority';

  export default defineComponent({
    components: {
      PageWrapper,
      Authority,
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
