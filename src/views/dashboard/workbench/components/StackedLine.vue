<template>
  <Card title="📈折线图" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch, PropType } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '600px',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }

      setOptions({
        title: {
          // text: '普通折线图',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });

      // radar
      // setOptions({
      //   legend: {
      //     bottom: 0,
      //     data: ['Visits', 'Sales', 'custom'],
      //   },
      //   tooltip: {},
      //   radar: {
      //     radius: '60%',
      //     splitNumber: 8,
      //     indicator: [
      //       {
      //         name: '2017',
      //       },
      //       {
      //         name: '2017',
      //       },
      //       {
      //         name: '2018',
      //       },
      //       {
      //         name: '2019',
      //       },
      //       {
      //         name: '2020',
      //       },
      //       {
      //         name: '2021',
      //       },
      //     ],
      //   },
      //   series: [
      //     {
      //       type: 'radar',
      //       symbolSize: 0,
      //       areaStyle: {
      //         shadowBlur: 0,
      //         shadowColor: 'rgba(0,0,0,.2)',
      //         shadowOffsetX: 0,
      //         shadowOffsetY: 10,
      //         opacity: 1,
      //       },
      //       data: [
      //         {
      //           value: [90, 50, 86, 40, 50, 20],
      //           name: 'Visits',
      //           itemStyle: {
      //             color: '#b6a2de',
      //           },
      //         },
      //         {
      //           value: [70, 75, 70, 76, 20, 85],
      //           name: 'Sales',
      //           itemStyle: {
      //             color: '#67e0e3',
      //           },
      //         },
      //         {
      //           value: [100, 100, 100, 100, 100],
      //           name: 'custom',
      //           itemStyle: {
      //             color: 'skyblue',
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // });
    },
    { immediate: true },
  );
</script>
