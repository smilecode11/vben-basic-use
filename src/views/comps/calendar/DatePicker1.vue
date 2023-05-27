<template>
  <DatePicker v-model="date" mode="dateTime" />
  <DatePicker v-model.range="range" mode="dateTime" />
  <DatePicker v-model.number="range2" mode="dateTime" />
  <DatePicker v-model="date" mode="dateTime" :disabled-dates="disabledDates" />
  <DatePicker v-model.range="range" mode="dateTime" :disabled-dates="disabledDates" />
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

      const range = ref({
        start: new Date(year, month, 18),
        end: new Date(year, month, 21),
      });

      const range2 = ref({ start: 1578290400000, end: 1578636000000 });

      const disabledDates = ref([
        {
          repeat: {
            weekdays: [4, 5],
          },
        },
      ]);

      return {
        date,
        range,
        range2,
        disabledDates,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
