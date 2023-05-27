<template>
  <Calendar :attributes="attributes" :disabled-dates="disabledDates" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Calendar } from 'v-calendar';
  import 'v-calendar/style.css';

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  export default defineComponent({
    components: {
      Calendar,
    },
    setup() {
      return {
        disabledDates: ref([[new Date(year, month, 29), null]]),
        attributes: ref([
          {
            key: 'attrs',
            highlight: true,
            dates: [
              new Date(year, month, 2),
              new Date(year, month, 7),
              new Date(year, month, 17),
              new Date(year, month, 23),
            ],
          },
          {
            key: 'attrs2',
            highlight: {
              color: 'red',
            },
            dates: [
              new Date(year, month, 3),
              new Date(year, month, 4),
              [new Date(year, month, 17), new Date(year, month, 19)],
            ],
            order: 3, //  覆盖层级
          },
          {
            key: 'attrs3',
            highlight: 'green',
            dates: [
              [new Date(year, month, 19), new Date(year, month, 24)],
              { start: new Date(year, month, 25), span: 3 },
            ],
            order: 2,
          },
          {
            key: 'repeat',
            highlight: {
              color: 'red',
            },
            dot: {
              color: 'red',
            },
            dates: {
              start: new Date(year, month - 2, 12),
              // end: new Date(year, month, 12),
              repeat: {
                every: 'month',
                days: [12, 13],
              },
            },
          },
        ]),
      };
    },
  });
</script>
