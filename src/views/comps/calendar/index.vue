<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>V-Calendar</template>
    <div class="main">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="calendar1" tab="Calendar">
          <Calendar1 />
        </TabPane>
        <TabPane key="calendar2" tab="Events">
          <Calendar2 />
        </TabPane>
        <TabPane key="calendar3" tab="Layouts">
          <Calendar3 />
        </TabPane>
        <TabPane key="calendar4" tab="Navigation">
          <Calendar4 />
        </TabPane>
        <TabPane key="calendar5" tab="Attributes">
          <Calendar5 />
        </TabPane>
        <TabPane key="calendar6" tab="Dates">
          <Calendar6 />
        </TabPane>
        <TabPane key="datePicker1" tab="DatePicker">
          <DatePicker1 />
        </TabPane>
        <TabPane key="datePicker2" tab="TimePicker">
          <DatePicker2 />
        </TabPane>
        <TabPane key="datePicker3" tab="TimeRules">
          <DatePicker3 />
        </TabPane>
        <TabPane key="datePicker4" tab="slot content">
          <DatePicker4 />
        </TabPane>
        <TabPane key="datePicker5" tab="custom attribute">
          <DatePicker5 />
        </TabPane>
        <TabPane key="customcalendar" tab="customcalendar">
          <CustomCalendar />
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
  import Calendar5 from './Calendar5.vue';
  import Calendar6 from './Calendar6.vue';
  import DatePicker1 from './DatePicker1.vue';
  import DatePicker2 from './DatePicker2.vue';
  import DatePicker3 from './DatePicker3.vue';
  import DatePicker4 from './DatePicker4.vue';
  import DatePicker5 from './DatePicker5.vue';
  import CustomCalendar from './CustomCalendar.vue';

  export default defineComponent({
    components: {
      PageWrapper,
      Tabs,
      TabPane,
      Calendar1,
      Calendar2,
      Calendar3,
      Calendar4,
      Calendar5,
      Calendar6,
      DatePicker1,
      DatePicker2,
      DatePicker3,
      DatePicker4,
      DatePicker5,
      CustomCalendar,
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
