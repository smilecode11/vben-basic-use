<template>
  <!-- 
    borderless 无边框
    transparent 背景透明
    color 选中色彩 支持: gray, red, orange, yellow, green, teal, blue, indigo, purple, pink.
    is-dark 暗黑主题

    initial-page 初始页 { month: 4, year: 2019 }
   -->
  <Calendar
    class="my-calendar"
    :attributes="attrs"
    :color="selectedColor"
    :initial-page="{ month: 5, year: 1995 }"
  />
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
      const selectedColor = ref('purple');
      const attrs = ref([
        {
          key: 'test',
          highlight: true,
          dates: {
            //  月份要 -1?
            start: new Date(1995, 4, 1),
            end: new Date(1995, 4, 5),
          },
        },
      ]);

      return {
        selectedColor,
        attrs,
      };
    },
  });
</script>

<style lang="scss">
  // 设置周的颜色: 不能设置 scoped
  // .vc-container .vc-weekday-1,
  // .vc-container .vc-weekday-7 {
  //   color: #6366f1;
  // }

  .my-calendar .vc-weekday-1,
  .my-calendar .vc-weekday-7 {
    color: #6366f1;
  }
</style>
