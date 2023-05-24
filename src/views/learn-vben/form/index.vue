<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title> <BasicTitle :span="true">Form 示例</BasicTitle> </template>
    <div class="main">
      <CollapseContainer title="表单综合示例">
        <Tabs v-model:activeKey="activeKey">
          <TabPane key="form1" tab="活动发布">
            <Form1 />
          </TabPane>
          <TabPane key="form2" tab="报名">
            <Form2 />
          </TabPane>
        </Tabs>
      </CollapseContainer>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicTitle } from '/@/components/Basic';
  import Form1 from './Form1.vue';
  import Form2 from './Form2.vue';

  export default defineComponent({
    name: 'LearnVbenFormIndex',
    components: {
      Tabs,
      TabPane,
      PageWrapper,
      BasicTitle,
      CollapseContainer,
      Form1,
      Form2,
    },
    setup() {
      const activeKey = ref('form1');

      return {
        activeKey,
      };
    },
  });
</script>

<style scoped lang="scss">
  .main {
    padding: 12px;
    .form-control {
      max-width: 450px;
    }
  }
</style>
