<template>
  <DatePicker v-model="date" mode="date" :select-attribute="selectAttribute" />
  <DatePicker
    v-model.range="range"
    mode="dateTime"
    :select-attribute="selectDragAttribute"
    :drag-attribute="selectDragAttribute"
    @drag="dragValue = $event"
  >
    <template #day-popover="{ format }">
      <div class="text-sm">
        {{ format(dragValue ? dragValue.start : range.start, 'MMM D') }}
        -
        {{ format(dragValue ? dragValue.end : range.end, 'MMM D') }}
      </div>
    </template>
  </DatePicker>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';

  export default defineComponent({
    components: {
      DatePicker,
    },
    setup() {
      const date = ref(new Date());
      const selectAttribute = ref({ dot: true, highlight: true, bar: true });

      const range = ref({
        start: new Date(2020, 0, 6),
        end: new Date(2020, 0, 10),
      });
      const dragValue = ref(null);
      const selectDragAttribute = computed(() => ({
        popover: {
          visibility: 'hover',
          isInteractive: false,
        },
      }));

      return {
        date,
        range,
        dragValue,
        selectAttribute,
        selectDragAttribute,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
