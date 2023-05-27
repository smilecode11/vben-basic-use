<template>
  <DatePicker v-model="date" mode="dateTime" is24hr />
  <DatePicker v-model="date" mode="date" is24hr />
  <DatePicker v-model="date" mode="time" is24hr />
  <DatePicker v-model="date" mode="dateTime" is24hr :rules="rules" />
  <DatePicker v-model.range="range" mode="dateTime" :rules="rulesWithRange" />
  <DatePicker v-model="date" mode="dateTime" :rules="rulesByNumberList" is24hr />
  <DatePicker v-model="date" mode="dateTime" :rules="rulesByNumberIncrements" is24hr />
  <DatePicker v-model="date2" mode="dateTime" :rules="rules2" is24hr />
  <DatePicker v-model="date2" mode="dateTime" rules="auto" is24hr />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  export default defineComponent({
    components: {
      DatePicker,
    },
    setup() {
      const date = ref(new Date());

      const rules = ref({
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });

      const range = ref({ start: new Date(year, month, 18), end: new Date(year, month, 21) });
      const rulesWithRange = ref([
        {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        },
        {
          hours: 23,
          minutes: 59,
          seconds: 59,
          milliseconds: 999,
        },
      ]);

      const rulesByNumberList = ref({
        hours: [12, 15, 18, 20],
      });

      const rulesByNumberIncrements = ref({
        hours: { min: 12, max: 20 },
        minutes: { interval: 5 },
      });

      const date2 = ref(new Date());
      const rules2 = ref({
        hours: (hour, { weekday }) => {
          if ([1, 7].includes(weekday)) return hour >= 7 && hour <= 12;
          return true;
        },
      });

      return {
        date,
        rules,
        range,
        rulesWithRange,
        rulesByNumberList,
        rulesByNumberIncrements,
        date2,
        rules2,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
