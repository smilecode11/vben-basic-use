<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>V-Calendar</template>
    <div class="main">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="calendar1" tab="Calendar">
          <Calendar1 />
        </TabPane>
        <TabPane key="calendar3" tab="Layouts">
          <Calendar3 />
        </TabPane>
        <TabPane key="calendar4" tab="Navigation">
          <Calendar4 />
        </TabPane>
        <TabPane key="calendar2" tab="DatePicker">
          <Calendar2 />
        </TabPane>
      </Tabs>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import Calendar1 from './Calendar1.vue';
  import Calendar2 from './Calendar2.vue';
  import Calendar3 from './Calendar3.vue';
  import Calendar4 from './Calendar4.vue';

  export default defineComponent({
    components: {
      PageWrapper,
      Tabs,
      TabPane,
      Calendar1,
      Calendar2,
      Calendar3,
      Calendar4,
    },
    setup() {
      const activeKey = ref('calendar1');

      return {
        activeKey,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .main {
    padding: 12px;
  }
</style>
