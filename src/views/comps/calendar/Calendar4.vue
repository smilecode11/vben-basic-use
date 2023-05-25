<template>
  <!-- 
    step 翻页级别, 默认 1 个月
    Min & Max Dates 设置最小和最大选择区域 :min-date="new Date()" 
    Key Commands - 日历 focus 时可响应系列键盘事件
    Move Methods - 移动多少月或返回多少月 moveBy(num)  calendarRef.value.moveBy()
   -->
  <Calendar
    ref="calendarRef"
    class="my-calendar"
    :attributes="attrs"
    :color="selectedColor"
    :step="1"
  />
  <br />
  <div>
    <a-button type="primary" @click="moveBy(3)">向前三个月</a-button>
    <a-button type="primary" @click="moveBy(-3)">往返三个月</a-button>
    <a-button type="primary" @click="move({ month: 5, year: 1995 })">移动到某一天</a-button>
    <a-button type="primary" @click="move(`1995-05-04`)">移动到某一天2</a-button>
  </div>
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
          key: 'test4',
          highlight: true,
          dates: [new Date(), new Date(1995, 4, 3)],
        },
      ]);

      const calendarRef = ref(null);
      const moveBy = (step) => {
        calendarRef.value.moveBy(step);
      };
      const move = (date) => {
        calendarRef.value.move(date);
      };

      return {
        selectedColor,
        attrs,
        calendarRef,
        moveBy,
        move,
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
