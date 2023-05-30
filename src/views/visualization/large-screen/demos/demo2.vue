<template>
  <PageWrapper
    contentBackground
    contentFullHeight
    dense
    :contentStyle="{ backgroundColor: '#282c34', color: '#ffffff' }"
  >
    <div class="session">
      <BorderBox1
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox1 </div>
      </BorderBox1>
      <BorderBox2
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox2 </div>
      </BorderBox2>
      <BorderBox3
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox3 </div>
      </BorderBox3>
      <BorderBox4
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox4 </div>
      </BorderBox4>
      <BorderBox4
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
        reverse
      >
        <div :style="controlStyles"> BorderBox4 reverse</div>
      </BorderBox4>
      <BorderBox5
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox5 </div>
      </BorderBox5>
      <BorderBox5
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
        reverse
      >
        <div :style="controlStyles"> BorderBox5 reverse</div>
      </BorderBox5>
      <BorderBox6
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox6</div>
      </BorderBox6>
      <BorderBox7
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox7</div>
      </BorderBox7>
      <BorderBox8
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox8 </div>
      </BorderBox8>
      <BorderBox8
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
        reverse
        :dur="1"
      >
        <div :style="controlStyles"> BorderBox8 reverse</div>
      </BorderBox8>
      <BorderBox9
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox9</div>
      </BorderBox9>
      <BorderBox10
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox10</div>
      </BorderBox10>
      <BorderBox12
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox12</div>
      </BorderBox12>
      <BorderBox13
        style="width: 300px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
      >
        <div :style="controlStyles"> BorderBox13</div>
      </BorderBox13>
      <BorderBox11
        style="width: 430px; height: 180px"
        :color="borderColor"
        :backgroundColor="borderBackgroundColor"
        title="温州第一深情"
        :titleWidth="200"
      >
        <div :style="controlStyles"> BorderBox11</div>
      </BorderBox11>
      <Decoration1 style="width: 300px; height: 30px" />
      <Decoration2 style="width: 300px; height: 30px" />
      <Decoration2 :dur="1" reverse style="width: 30px; height: 180px" />
      <Decoration3 style="width: 300px; height: 30px" />
      <Decoration4 style="width: 5px; height: 150px" />
      <Decoration4 :dur="1" reverse style="width: 250px; height: 5px" />
      <Decoration5 :dur="2" reverse style="width: 300px; height: 40px" />
      <Decoration6 :dur="1" reverse style="width: 300px; height: 30px" />
      <Decoration7 :color="borderColor" style="width: 300px; height: 30px">
        温州第一深情
      </Decoration7>
      <Decoration8 style="width: 300px; height: 50px" />
      <Decoration8 reverse style="width: 300px; height: 50px" />
      <Decoration9 :color="borderColor" style="width: 150px; height: 150px">
        <div> 66% </div>
      </Decoration9>
      <Decoration10 style="width: 300px; height: 5px" />
      <Decoration11 style="width: 200px; height: 60px">温州第一深情</Decoration11>
      <Decoration12 :color="borderColor" style="width: 150px; height: 150px">
        <div> 66% </div>
      </Decoration12>
      <ConicalColumnChart :config="conicalColumnChartConfig" style="width: 400px; height: 200px" />
      <PercentPond :config="percentPondConfig" style="width: 200px; height: 100px" />
      <WaterLevelPond :config="waterLevelPondConfig" style="width: 150px; height: 200px" />
      <Loading style="width: 200px; height: 200px">Loading...</Loading>
      <ScrollRankingBoard :config="scrollRankingBoardConfig" style="width: 500px; height: 300px" />
      <ScrollBoard
        :config="scrollBoardConfig"
        style="width: 500px; height: 220px"
        @click="clickHandler"
      />
      <CapsuleChart :config="capsuleChartConfig" style="width: 25rem; height: 15rem" />
      <ActiveRingChart :config="activeRingChartConf" style="width: 300px; height: 300px" />
      <DigitalFlop :config="digitalFlopConfig" />
      <Charts :option="chartsOption" style="width: 25rem; height: 15rem" />
      <br />
      <FlylineChart :config="flylineChartConfig" :dev="true" style="width: 600px; height: 600px" />
      <FlylineChartEnhanced
        :config="flylineChartEnhancedConfig"
        :dev="true"
        style="width: 600px; height: 600px"
      />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import {
    BorderBox1,
    BorderBox2,
    BorderBox3,
    BorderBox4,
    BorderBox5,
    BorderBox6,
    BorderBox7,
    BorderBox8,
    BorderBox9,
    BorderBox10,
    BorderBox11,
    BorderBox12,
    BorderBox13,
    Decoration1,
    Decoration2,
    Decoration3,
    Decoration4,
    Decoration5,
    Decoration6,
    Decoration7,
    Decoration8,
    Decoration9,
    Decoration10,
    Decoration11,
    Decoration12,
    ConicalColumnChart,
    PercentPond,
    WaterLevelPond,
    Loading,
    ScrollRankingBoard,
    ScrollBoard,
    CapsuleChart,
    ActiveRingChart,
    DigitalFlop,
    Charts,
    FlylineChart,
    FlylineChartEnhanced,
  } from '@kjgl77/datav-vue3';

  export default defineComponent({
    name: 'LargeScreenDemo2',
    components: {
      PageWrapper,
      BorderBox1,
      BorderBox2,
      BorderBox3,
      BorderBox4,
      BorderBox5,
      BorderBox6,
      BorderBox7,
      BorderBox8,
      BorderBox9,
      BorderBox10,
      BorderBox11,
      BorderBox12,
      BorderBox13,
      Decoration1,
      Decoration2,
      Decoration3,
      Decoration4,
      Decoration5,
      Decoration6,
      Decoration7,
      Decoration8,
      Decoration9,
      Decoration10,
      Decoration11,
      Decoration12,
      ConicalColumnChart,
      PercentPond,
      WaterLevelPond,
      Loading,
      ScrollRankingBoard,
      ScrollBoard,
      CapsuleChart,
      ActiveRingChart,
      DigitalFlop,
      Charts,
      FlylineChart,
      FlylineChartEnhanced,
    },
    setup() {
      // [文档说明]
      // https://datav-vue3.netlify.app/Other/ConicalColumnChart/ConicalColumnChart.html

      function formatter(number: number) {
        const numbers = number.toString().split('').reverse();
        const segs = [];
        while (numbers.length) segs.push(numbers.splice(0, 3).join(''));
        return segs.join(',').split('').reverse().join('');
      }

      const digitalFlopConfig = ref({
        number: [1000],
        content: '{nt}个',
        formatter,
      });

      onMounted(() => {
        let timer = null;
        timer = setInterval(() => {
          digitalFlopConfig.value.number[0] += Math.random() * 1000;
          if (digitalFlopConfig.value.number[0] >= 15000) clearInterval(timer);
        }, 2500);
      });

      const chartsOption = reactive({
        title: {
          text: '剩余油量表',
          style: {
            fill: '#fff',
          },
        },
        series: [
          {
            type: 'gauge',
            data: [{ name: 'itemA', value: 55 }],
            center: ['50%', '55%'],
            axisLabel: {
              formatter: '{value}%',
              style: {
                fill: '#fff',
              },
            },
            axisTick: {
              style: {
                stroke: '#fff',
              },
            },
            animationCurve: 'easeInOutBack',
          },
        ],
      });

      return {
        borderColor: ref([]),
        // borderColor: ref(['pink', 'skyblue']),
        // borderBackgroundColor: ref(''),
        borderBackgroundColor: ref('rgba(255, 255, 255, 0.02)'),
        controlStyles: ref({
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }),
        conicalColumnChartConfig: ref({
          data: [
            {
              name: '周口',
              value: 55,
            },
            {
              name: '南阳',
              value: 120,
            },
            {
              name: '西峡',
              value: 71,
            },
            {
              name: '驻马店',
              value: 66,
            },
            {
              name: '新乡',
              value: 80,
            },
            {
              name: '信阳',
              value: 35,
            },
            {
              name: '漯河',
              value: 15,
            },
          ],
          img: [],
          showValue: true,
        }),
        percentPondConfig: ref({
          value: 88,
          lineDash: [10, 2],
          borderWidth: 5,
          borderRadius: 10,
          borderGap: 5,
          localGradient: true,
        }),
        waterLevelPondConfig: ref({
          data: [66, 45],
          shape: 'roundRect', //  round
          waveNum: 5,
          formatter: '{value}%',
        }),
        scrollRankingBoardConfig: ref({
          data: [
            {
              name: '周口',
              value: 55,
            },
            {
              name: '南阳',
              value: 120,
            },
            {
              name: '西峡',
              value: 78,
            },
            {
              name: '驻马店',
              value: 66,
            },
            {
              name: '新乡',
              value: 80,
            },
            {
              name: '信阳',
              value: 45,
            },
            {
              name: '漯河',
              value: 29,
            },
          ],
          unit: '深情',
        }),
        scrollBoardConfig: ref({
          header: ['列1', '列2', '列3'],
          data: [
            ['行1列1', '行1列2', '行1列3'],
            ['行2列1', '行2列2', '行2列3'],
            ['行3列1', '行3列2', '行3列3'],
            ['行4列1', '行4列2', '行4列3'],
            ['行5列1', '行5列2', '行5列3'],
            ['行6列1', '行6列2', '行6列3'],
            ['行7列1', '行7列2', '行7列3'],
            ['行8列1', '行8列2', '行8列3'],
            ['行9列1', '行9列2', '行9列3'],
            ['行10列1', '行10列2', '行10列3'],
          ],
          index: true,
          columnWidth: [50],
          align: ['center'],
        }),
        clickHandler: (ev) => {
          console.log(ev);
        },
        capsuleChartConfig: ref({
          data: [
            {
              name: '南阳',
              value: 288,
            },
            {
              name: '周口',
              value: 123,
            },
            {
              name: '漯河',
              value: 98,
            },
            {
              name: '郑州',
              value: 75,
            },
            {
              name: '西峡',
              value: 66,
            },
          ],
          colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
          unit: '💰',
          // showValue: true,
        }),
        activeRingChartConf: ref({
          radius: 100, //  环半径 50% | 100
          activeRadius: 120, // 环半径(动态)
          lineWidth: 30,
          // activeTimeGap: 3000 // 切换间隔
          digitalFlopStyle: {
            fill: 'pink',
            fontSize: 28,
          },
          data: [
            {
              name: '杭州',
              value: 98,
            },
            {
              name: '金华',
              value: 150,
            },
            {
              name: '宁波',
              value: 62,
            },
            {
              name: '太原',
              value: 54,
            },
          ],
        }),
        digitalFlopConfig,
        chartsOption,
        flylineChartConfig: ref({
          centerPoint: [0.48, 0.35],
          points: [
            {
              position: [0.52, 0.235],
              text: '新乡',
            },
            {
              position: [0.43, 0.29],
              text: '焦作',
            },
            {
              position: [0.59, 0.35],
              text: '开封',
            },
            {
              position: [0.53, 0.47],
              text: '许昌',
            },
            {
              position: [0.45, 0.54],
              text: '平顶山',
            },
            {
              position: [0.36, 0.38],
              text: '洛阳',
            },
            {
              position: [0.62, 0.55],
              text: '周口',
            },
            {
              position: [0.56, 0.56],
              text: '漯河',
            },
            {
              position: [0.37, 0.66],
              text: '南阳',
            },
            {
              position: [0.55, 0.81],
              text: '信阳',
            },
            {
              position: [0.55, 0.67],
              text: '驻马店',
            },
            {
              position: [0.37, 0.29],
              text: '济源',
            },
            {
              position: [0.2, 0.36],
              text: '三门峡',
            },
            {
              position: [0.76, 0.41],
              text: '商丘',
            },
            {
              position: [0.59, 0.18],
              text: '鹤壁',
            },
            {
              position: [0.68, 0.17],
              text: '濮阳',
            },
            {
              position: [0.59, 0.1],
              text: '安阳',
            },
          ],
          // bgImgUrl: mapImg,
          // centerPointImg: {
          //   url: mapCenterPoint,
          // },
          // pointsImg: {
          //   url: mapPoint,
          // },
        }),
        flylineChartEnhancedConfig: ref({
          points: [
            {
              name: '郑州',
              coordinate: [0.48, 0.35],
              halo: {
                show: true,
              },
              icon: {
                // src: mapCenterPoint,
                width: 30,
                height: 30,
              },
              text: {
                show: false,
              },
            },
            {
              name: '新乡',
              coordinate: [0.52, 0.23],
            },
            {
              name: '焦作',
              coordinate: [0.43, 0.29],
            },
            {
              name: '开封',
              coordinate: [0.59, 0.35],
            },
            {
              name: '许昌',
              coordinate: [0.53, 0.47],
            },
            {
              name: '平顶山',
              coordinate: [0.45, 0.54],
            },
            {
              name: '洛阳',
              coordinate: [0.36, 0.38],
            },
            {
              name: '周口',
              coordinate: [0.62, 0.55],
              halo: {
                show: true,
                color: '#8378ea',
              },
            },
            {
              name: '漯河',
              coordinate: [0.56, 0.56],
            },
            {
              name: '南阳',
              coordinate: [0.37, 0.66],
              halo: {
                show: true,
                color: '#37a2da',
              },
            },
            {
              name: '信阳',
              coordinate: [0.55, 0.81],
            },
            {
              name: '驻马店',
              coordinate: [0.55, 0.67],
            },
            {
              name: '济源',
              coordinate: [0.37, 0.29],
            },
            {
              name: '三门峡',
              coordinate: [0.2, 0.36],
            },
            {
              name: '商丘',
              coordinate: [0.76, 0.41],
            },
            {
              name: '鹤壁',
              coordinate: [0.59, 0.18],
            },
            {
              name: '濮阳',
              coordinate: [0.68, 0.17],
            },
            {
              name: '安阳',
              coordinate: [0.59, 0.1],
            },
          ],
          lines: [
            {
              source: '新乡',
              target: '郑州',
            },
            {
              source: '焦作',
              target: '郑州',
            },
            {
              source: '开封',
              target: '郑州',
            },
            {
              source: '周口',
              target: '郑州',
              color: '#fb7293',
              width: 2,
            },
            {
              source: '南阳',
              target: '郑州',
              color: '#fb7293',
              width: 2,
            },
            {
              source: '济源',
              target: '郑州',
            },
            {
              source: '三门峡',
              target: '郑州',
            },
            {
              source: '商丘',
              target: '郑州',
            },
            {
              source: '鹤壁',
              target: '郑州',
            },
            {
              source: '濮阳',
              target: '郑州',
            },
            {
              source: '安阳',
              target: '郑州',
            },
            {
              source: '许昌',
              target: '南阳',
              color: '#37a2da',
            },
            {
              source: '平顶山',
              target: '南阳',
              color: '#37a2da',
            },
            {
              source: '洛阳',
              target: '南阳',
              color: '#37a2da',
            },
            {
              source: '驻马店',
              target: '周口',
              color: '#8378ea',
            },
            {
              source: '信阳',
              target: '周口',
              color: '#8378ea',
            },
            {
              source: '漯河',
              target: '周口',
              color: '#8378ea',
            },
          ],
          // icon: {
          //   show: true,
          //   src: mapPoint,
          // },
          // text: {
          //   show: true,
          // },
          // k: 0.5,
          // bgImgSrc: mapImg,
        }),
      };
    },
  });
</script>

<style lang="scss" scoped>
  .session {
    display: flex;
    flex-wrap: wrap;
  }
</style>
