<template>
  <DatePicker v-model="date" mode="dateTime" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';

  export default defineComponent({
    components: {
      DatePicker,
    },
    setup() {
      return {
        date: new Date(),
      };
    },
  });
</script>

<style lang="scss" scoped></style>
