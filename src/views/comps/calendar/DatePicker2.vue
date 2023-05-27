<template>
  <DatePicker v-model="date" mode="dateTime" is24hr />
  <DatePicker v-model="date" mode="dateTime" is24hr hide-time-header />
  <!-- 1 huors 2 minutes 3 seconds 4 milliseconds -->
  <DatePicker v-model="date" mode="dateTime" is24hr :time-accuracy="4" />
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

      return {
        date,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
