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

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  export default defineComponent({
    components: {
      Calendar,
    },
    setup() {
      const attrs = ref([
        {
          key: 'attrs5',
          dot: {
            style: {
              backgroundColor: 'brown',
            },
          },
          popover: {
            label: '自定义 popover.',
            visibility: 'hover',
          },
          customData: {},
          dates: [
            `${year}-${month - 1}-26`,
            `${year}-${month - 1}-28`,
            {
              start: `${year}-${month - 1}-11`,
              end: `${year}-${month - 1}-13`,
            },
          ],
          order: 0,
        },
        {
          key: 'attrs6',
          dot: {
            style: {
              backgroundColor: 'skyblue',
            },
          },
          popover: {
            label: '自定义 popover.',
            visibility: 'hover',
          },
          customData: {},
          dates: [
            `${year}-${month - 1}-26`,
            `${year}-${month - 1}-28`,
            {
              start: `${year}-${month}-11`,
              end: `${year}-${month}-13`,
            },
          ],
          order: 0,
        },
        {
          key: 'attrs11',
          bar: {
            style: {
              backgroundColor: 'brown',
            },
          },
          customData: {},
          dates: [date, `${year}-${month}-21`],
          order: 0,
        },
        {
          key: 'attrs12',
          bar: {
            style: {
              backgroundColor: 'red',
            },
          },
          customData: {},
          dates: [date, `${year}-${month}-21`, `${year}-${month}-20`],
          order: 0,
        },
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
