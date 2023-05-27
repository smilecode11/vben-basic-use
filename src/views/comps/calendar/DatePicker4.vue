<template>
  <DatePicker v-model="date" mode="date" />
  <DatePicker v-model="date">
    <template #default="{ togglePopover }">
      <button
        class="px-3 py-2 bg-blue-500 text-sm text-white font-semibold rounded-md"
        @click="togglePopover"
      >
        Select date
      </button>
    </template>
  </DatePicker>

  <DatePicker v-model="date">
    <template #default="{ inputValue, inputEvents }">
      <input :value="inputValue" v-on="inputEvents" />
    </template>
  </DatePicker>

  <DatePicker v-model="range" is-range :input-debounce="500">
    <template #default="{ inputValue, inputEvents }">
      <div style="display: flex; width: 250px">
        <a-input :value="inputValue.start" v-on="inputEvents.start" />
        -
        <a-input :value="inputValue.end" v-on="inputEvents.end" />
      </div>
    </template>
  </DatePicker>

  <DatePicker v-model="date" :popover="false">
    <template #default="{ togglePopover, inputValue, inputEvents }">
      <div class="flex">
        <button
          class="flex justify-center items-center px-2 bg-accent-100 hover:bg-accent-200 text-accent-700 border-r border-gray-300 dark:bg-gray-700 dark:text-accent-300 dark:border-gray-600 dark:hover:bg-gray-600"
          @click="() => togglePopover()"
        >
          <CalendarFilled class="w-5 h-5" />
        </button>
        <a-input :value="inputValue" v-on="inputEvents" style="width: 120px" />
      </div>
    </template>
  </DatePicker>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { CalendarFilled } from '@ant-design/icons-vue';
  import { DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';

  export default defineComponent({
    components: {
      DatePicker,
      CalendarFilled,
    },
    setup() {
      const date = ref(new Date());

      const range = ref({
        start: new Date(2020, 9, 12),
        end: new Date(2020, 9, 16),
      });

      return {
        date,
        range,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
