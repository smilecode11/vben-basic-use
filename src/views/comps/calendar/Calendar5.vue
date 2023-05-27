<template>
  <Calendar :attributes="attributes">
    <!-- popover -->
    <!-- <template #day-popover="{ dayTitle, attributes }">
      <div class="px-2">
        <div class="text-xs text-gray-700 dark:text-gray-300 font-semibold text-center">
          {{ dayTitle }}
        </div>
        <ul>
          <li
            v-for="{ key, customData } in attributes"
            :key="key"
            class="block text-xs text-gray-700 dark:text-gray-300 bg-red-100"
          >
            {{ customData.description }}
          </li>
        </ul>
      </div>
    </template> -->
  </Calendar>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Calendar } from 'v-calendar';
  import 'v-calendar/style.css';

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  // console.log('_date', date, '_year', year, '_month', month);

  export default defineComponent({
    components: {
      Calendar,
    },
    setup() {
      return {
        attributes: ref([
          {
            key: 'attrs',
            color: 'red',
            highlight: true,
            dot: true,
            bar: true,
            popover: {
              label: '自定义 popover.',
              visibility: 'focus',
            },
            customData: {},
            dates: date,
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
            key: 'attrs2',
            dot: 'red',
            popover: {
              label: '自定义 popover.',
              visibility: 'focus',
            },
            customData: {},
            dates: `${year}-${month}-28`, //new Date(),
            order: 0,
          },
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
              `${year}-${month}-26`,
              `${year}-${month}-28`,
              {
                start: `${year}-${month}-11`,
                end: `${year}-${month}-13`,
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
              `${year}-${month}-26`,
              `${year}-${month}-28`,
              {
                start: `${year}-${month}-11`,
                end: `${year}-${month}-13`,
              },
            ],
            order: 0,
          },
          {
            key: 'attrs3',
            highlight: {
              color: 'purple',
              start: { fillMode: 'outline' }, //  outline light
              base: { fillMode: 'light' },
              end: { fillMode: 'outline' },
            },
            content: {
              style: {
                color: '#000000',
                // fontStyle: 'italic', //  倾斜
                fontWeight: '400', //  加粗
              },
            },
            // popover: {},
            customData: {},
            dates: [{ start: `${year}-${month}-10`, end: `${year}-${month}-16` }],
            order: 0,
          },
        ]),
      };
    },
  });
</script>
