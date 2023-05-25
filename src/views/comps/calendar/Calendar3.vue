<template>
  <!-- 
    expanded 拉伸占满容器
    title-position 标题位置 left right
    view 查看模式 weekly 周  => view="weekly"
    show-weeknumbers 查看第几周 left-outside | right-outside | left | right
    trim-weeks
    Footer slot 底部插槽
    Multiple Rows & Columns 多行或多列
    useScreens 根据视口设置行数
   -->
  <Calendar
    ref="calendar"
    title-position="left"
    :attributes="attrs"
    :rows="rows"
    :columns="columns"
  >
    <template #footer>
      <button
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
        @click="moveToday"
      >
        Today
      </button>
    </template>
  </Calendar>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Calendar } from 'v-calendar';
  import { useScreens } from 'vue-screen-utils';
  import 'v-calendar/style.css';

  export default defineComponent({
    components: {
      Calendar,
    },
    setup() {
      const attrs = ref([
        {
          key: 'test',
          highlight: true,
          dates: new Date(),
        },
      ]);

      const calendar = ref(null);
      function moveToday() {
        calendar.value.move(new Date());
      }

      const { mapCurrent } = useScreens({
        xs: '0px',
        sm: '640px',
        md: '1000px',
        lg: '1800px',
      });

      const columns = mapCurrent({ lg: 6, md: 3 }, 1);
      const rows = mapCurrent({ lg: 2, md: 4 }, 2);
      const expanded = mapCurrent({ lg: false }, true);

      return {
        calendar,
        attrs,
        moveToday,
        columns,
        rows,
        expanded,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
