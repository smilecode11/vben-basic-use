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
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
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
    },
    setup() {
      // [文档说明]
      // https://datav-vue3.netlify.app/Other/ConicalColumnChart/ConicalColumnChart.html

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
