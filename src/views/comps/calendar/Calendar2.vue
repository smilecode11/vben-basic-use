<template>
  <Calendar :attributes="attributes" @dayclick="onDayClick" @daymouseenter="onDaymouseenter" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Calendar } from 'v-calendar';
  import 'v-calendar/style.css';

  export default defineComponent({
    components: {
      Calendar,
    },
    setup() {
      const dates = ref(['2023-5-25', '2023-5-26', '2023-5-27']);

      const onDayClick = (data) => {
        const { year, month, day } = data;
        const newDate = `${year}-${month}-${day}`;
        const findIndex = dates.value.findIndex((date) => date === newDate);
        // console.log('_onDayClick', newDate, findIndex);
        if (findIndex > -1) {
          dates.value.splice(findIndex, 1);
        } else {
          dates.value.push(newDate);
        }
      };

      const onDaymouseenter = (data) => {
        console.log('_onDaymouseenter', data);
      };

      return {
        attributes: ref([
          {
            key: 'attrs',
            highlight: true,
            dates,
          },
        ]),
        onDayClick,
        onDaymouseenter,
      };
    },
  });
</script>
