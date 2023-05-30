<template>
  <PageWrapper
    contentBackground
    contentFullHeight
    dense
    :contentStyle="{ color: '#ffffff', backgroundColor: '#282c34' }"
  >
    <div class="session">
      <Charts :option="chartsOptions2" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions3" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions4" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions5" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions6" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions7" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions8" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions9" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions10" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions11" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions12" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions13" style="width: 28rem; height: 20rem" />
      <Charts :option="chartsOptions14" style="width: 38rem; height: 30rem" />
      <Charts :option="chartsOptions15" style="width: 28rem; height: 20rem" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Charts } from '@kjgl77/datav-vue3';

  export default defineComponent({
    name: 'LargeScreenDemo2',
    components: {
      PageWrapper,
      Charts,
    },
    setup() {
      // [文档说明]
      // http://charts.jiaminghi.com/example/

      onMounted(() => {});

      return {
        chartsOptions2: reactive({
          title: {
            text: '周销售额趋势',
          },
          xAxis: {
            name: '第一周',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            show: true,
            position: 'bottom',
            color: '#fff',
            dataTextStyle: {
              color: '#fff',
            },
          },
          yAxis: {
            name: '销售额',
            data: 'value',
          },
          series: [
            {
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'line',
            },
          ],
        }),
        chartsOptions3: reactive({
          title: {
            text: '周销售额趋势',
            style: {
              fill: '#fff',
            },
          },
          xAxis: {
            name: '第一周',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            style: {
              color: '#fff',
            },
          },
          yAxis: {
            name: '销售额',
            data: 'value',
          },
          series: [
            {
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'line',
              smooth: true, // 设置光滑
            },
          ],
        }),
        chartsOptions4: reactive({
          title: {
            text: '周销售额趋势',
            style: {
              fill: '#fff',
            },
          },
          xAxis: {
            name: '第一周',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            style: {
              fill: '#fff',
            },
          },
          yAxis: {
            name: '销售额',
            data: 'value',
          },
          series: [
            {
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'line',
              smooth: true, // 设置光滑
              lineArea: {
                show: true,
              },
            },
          ],
        }),
        chartsOptions5: reactive({
          textStyle: {
            color: '#fff',
          },
          title: {
            text: '周销售额趋势',
            style: {
              fill: '#fff',
            },
          },
          xAxis: {
            name: '第二周',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            style: {
              fill: '#fff',
            },
          },
          yAxis: {
            name: '销售额',
            data: 'value',
          },
          series: [
            {
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'line',
              // 渐变
              lineArea: {
                show: true,
                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)'],
              },
              // 值
              label: {
                show: true,
              },
            },
            {
              name: '系列A',
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'line',
              stack: 'a',
              fill: {
                show: true,
              },
            },

            {
              name: '系列B',
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'line',
              stack: 'a',
              smooth: true,
            },
            {
              name: '系列C',
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'line',
              stack: 'a',
              lineStyle: {
                lineDash: [5, 5],
              },
            },
          ],
        }),
        chartsOptions6: reactive({
          title: {
            text: '周销售额趋势',
          },
          legend: {
            data: [
              {
                name: '销售额',
                color: '#aeeff0',
              },
              {
                name: '人流量',
                color: '#f1829f',
              },
            ],
          },
          xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
          yAxis: [
            {
              name: '销售额',
              data: 'value',
            },
            {
              name: '人流量',
              data: 'value',
              position: 'right',
              max: 2000,
              splitLine: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: '人流量',
              data: [1000, 1200, 900, 1500, 900, 1200, 1000],
              type: 'line',
              smooth: true,
              lineArea: {
                show: true,
                gradient: ['rgba(251, 114, 147, 1)', 'rgba(251, 114, 147, 0)'],
              },
              lineStyle: {
                stroke: 'rgba(251, 114, 147, 1)',
                lineDash: [3, 3],
              },
              linePoint: {
                style: {
                  stroke: 'rgba(251, 114, 147, 1)',
                },
              },
              yAxisIndex: 1,
            },
            {
              name: '销售额',
              data: [1500, 1700, 1400, 2000, 1400, 1700, 1500],
              type: 'bar',
              gradient: {
                color: ['rgba(103, 224, 227, .6)', 'rgba(103, 224, 227, .1)'],
              },
              barStyle: {
                stroke: 'rgba(103, 224, 227, 1)',
              },
            },
          ],
        }),
        chartsOptions7: reactive({
          title: {
            text: '周销售额趋势',
          },
          xAxis: {
            name: '第一周',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
          yAxis: {
            name: '销售额',
            data: 'value',
          },
          series: [
            {
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'bar',
            },
          ],
        }),
        chartsOptions8: reactive({
          title: {
            text: '周销售额趋势',
          },
          xAxis: {
            name: '第一周',
            data: 'value',
          },
          yAxis: {
            name: '销售额',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
          series: [
            {
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'bar',
              animationCurve: 'easeOutBack',
            },
          ],
        }),
        chartsOptions9: reactive({
          title: {
            text: '周销售额趋势',
          },
          xAxis: {
            name: '第一周',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
          yAxis: {
            name: '销售额',
            data: 'value',
          },
          series: [
            {
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'bar',
              gradient: {
                color: ['rgba(251, 114, 147, .6)', 'rgba(251, 114, 147, .1)'],
              },
              barStyle: {
                stroke: '#fb7293',
              },
            },
          ],
        }),
        chartsOptions10: reactive({
          title: {
            text: '气温与降雨量走势图',
          },
          legend: {
            data: ['降雨量', '气温'],
            bottom: 10,
          },
          xAxis: {
            data: [
              '一月份',
              '二月份',
              '三月份',
              '四月份',
              '五月份',
              '六月份',
              '七月份',
              '八月份',
              '九月份',
              '十月份',
              '十一月份',
              '十二月份',
            ],
            axisLabel: {
              style: {
                rotate: 20,
                textAlign: 'left',
                textBaseline: 'top',
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              name: '降雨量',
              data: 'value',
              min: 0,
              max: 300,
              interval: 50,
              splitLine: {
                style: {
                  lineDash: [3, 3],
                },
              },
              axisLabel: {
                formatter: '{value} ml',
              },
              axisTick: {
                show: false,
              },
            },
            {
              name: '气温',
              data: 'value',
              position: 'right',
              min: 0,
              max: 30,
              interval: 5,
              splitLine: {
                show: false,
              },
              axisLabel: {
                formatter: '{value} °C',
              },
              axisTick: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: '降雨量',
              data: [175, 125, 90, 130, 45, 65, 65, 47, 50, 52, 45, 37],
              type: 'bar',
              gradient: {
                color: ['#37a2da', '#67e0e3'],
              },
              animationCurve: 'easeOutBounce',
            },
            {
              name: '气温',
              data: [23, 18, 16, 14, 10, 8, 6, 6, 6, 6, 6, 5],
              type: 'line',
              yAxisIndex: 1,
              animationCurve: 'easeOutBounce',
            },
          ],
        }),
        chartsOptions11: reactive({
          title: {
            text: '畅销饮料占比饼状图',
          },
          series: [
            {
              type: 'pie',
              data: [
                { name: '可口可乐', value: 93 },
                { name: '百事可乐', value: 32 },
                { name: '哇哈哈', value: 65 },
                { name: '康师傅', value: 44 },
                { name: '统一', value: 52 },
              ],
              insideLabel: {
                show: true,
              },
              roseType: true,
            },
          ],
        }),
        chartsOptions12: reactive({
          radar: {
            indicator: [
              { name: '西峡', max: 300 },
              { name: '周口', max: 300 },
              { name: '南阳', max: 300 },
              { name: '驻马店', max: 300 },
              { name: '郑州', max: 300 },
              { name: '洛阳', max: 300 },
            ],
          },
          series: [
            {
              type: 'radar',
              data: [111, 256, 178, 152, 266, 132],
            },
          ],
        }),
        chartsOptions13: reactive({
          series: [
            {
              type: 'gauge',
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 25,
              data: [{ name: 'itemA', value: 65, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] }],
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              pointer: {
                show: false,
              },
              dataItemStyle: {
                lineCap: 'round',
              },
              details: {
                show: true,
                formatter: '{value}%',
                style: {
                  fill: '#1ed3e5',
                  fontSize: 35,
                },
              },
            },
          ],
        }),
        chartsOptions14: reactive({
          series: [
            {
              type: 'gauge',
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 10,
              data: [
                { name: 'A', value: 32, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'] },
                {
                  name: 'B',
                  value: 78,
                  gradient: ['#03c2fd', '#1ed3e5', '#2fded6'],
                  radius: '53%',
                },
                {
                  name: 'C',
                  value: 55,
                  gradient: ['#e7bcf3', '#e690d1', '#fb7293'],
                  radius: '46%',
                },
                {
                  name: 'D',
                  value: 65,
                  gradient: ['#03c2fd', '#1ed3e5', '#2fded6'],
                  radius: '39%',
                },
                {
                  name: 'E',
                  value: 45,
                  gradient: ['#03c2fd', '#1ed3e5', '#2fded6'],
                  radius: '32%',
                },
              ],
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              pointer: {
                show: false,
              },
              dataItemStyle: {
                lineCap: 'round',
              },
              backgroundArc: {
                show: false,
              },
              details: {
                show: true,
                formatter: '{name}占比{value}%',
                position: 'start',
                offset: [-10, 0],
                style: {
                  fill: '#1ed3e5',
                  fontSize: 13,
                  textAlign: 'right',
                },
              },
            },
          ],
        }),
        chartsOptions15: reactive({
          title: {
            text: '剩余油量表',
          },
          series: [
            {
              type: 'gauge',
              data: [
                {
                  name: 'itemA',
                  value: 55,
                  gradient: ['#e7bcf3', '#e690d1', '#fb7293'],
                  localGradient: true,
                },
              ],
              axisLabel: {
                formatter: '{value}%',
              },
            },
          ],
        }),
      };
    },
  });
</script>

<style lang="scss" scoped>
  .session {
    display: flex;
    flex-wrap: wrap;
    padding: 32px;
  }
</style>
