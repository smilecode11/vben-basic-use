<template>
  <PageWrapper
    contentBackground
    contentFullHeight
    dense
    :contentStyle="{ backgroundColor: '#282c34', color: '#ffffff' }"
  >
    <div class="wrapper">
      <!-- <div class="session session1">
        <BorderBox1>
          <div class="broderBox"> BorderBox1 </div>
        </BorderBox1>
      </div>
      <div class="session session2">
        <BorderBox2>
          <div class="broderBox"> BorderBox2 </div>
        </BorderBox2>
      </div>
      <div class="session session4">
        <BorderBox4 :color="['skyblue', 'orange']" backgroundColor="rgba(255, 255, 2555, 0.05)">
          <div class="broderBox"> BorderBox4 </div>
        </BorderBox4>
      </div>
      <div class="session session4">
        <BorderBox4 :reverse="true">
          <div class="broderBox"> BorderBox4 reverse</div>
        </BorderBox4>
      </div>
      <div class="session session5">
        <BorderBox5 :color="['orange', 'skyblue']">
          <div class="broderBox"> BorderBox5 </div>
        </BorderBox5>
      </div>
      <div class="session session5">
        <BorderBox5 :reverse="true">
          <div class="broderBox"> BorderBox5 reverse</div>
        </BorderBox5>
      </div>
      <div class="session session6">
        <BorderBox6>
          <div class="broderBox"> BorderBox6 </div>
        </BorderBox6>
      </div>
      <div class="session session7">
        <BorderBox7>
          <div class="broderBox"> BorderBox7 </div>
        </BorderBox7>
      </div>
      <div class="session session8">
        <BorderBox8>
          <div class="broderBox"> BorderBox8 </div>
        </BorderBox8>
      </div>
      <div class="session session8">
        <BorderBox8 reverse :duration="1">
          <div class="broderBox"> BorderBox8 reverse</div>
        </BorderBox8>
      </div>
      <div class="session session9">
        <BorderBox9>
          <div class="broderBox"> BorderBox9</div>
        </BorderBox9>
      </div>
      <div class="session session10">
        <BorderBox10>
          <div class="broderBox"> BorderBox10</div>
        </BorderBox10>
      </div>
      <div class="session session11">
        <BorderBox11 title="温州第一深情" :titleWidth="220">
          <div class="broderBox"> BorderBox11</div>
        </BorderBox11>
      </div>
      <div class="session session12">
        <BorderBox12>
          <div class="broderBox"> BorderBox12</div>
        </BorderBox12>
      </div>
      <div class="session session13">
        <BorderBox13>
          <div class="broderBox"> BorderBox13</div>
        </BorderBox13>
      </div>

      <div class="session">
        <div class="decoration">
          <Decoration1 :color="['orange', 'skyblue']" />
        </div>
        <Loading>Loading...</Loading>
        <Decoration3 style="width: 250px; height: 30px" />
      </div>
      <div class="session">
        <Decoration2 style="width: 200px; height: 5px" />
        <Decoration2 :reverse="true" style="width: 5px; height: 150px" />
        <Decoration4 :reverse="true" style="width: 250px; height: 5px" />
        <Decoration4 style="width: 5px; height: 150px" />
      </div>
      <div class="session">
        <Decoration5 style="width: 300px; height: 40px" />
        <Decoration6 style="width: 300px; height: 30px" />
        <Decoration7 style="width: 300px; height: 30px"> Hello world ! </Decoration7>
        <Decoration8 style="width: 300px; height: 50px" />
        <Decoration8 reverse style="width: 300px; height: 50px" />
      </div>
      <div class="session"> </div> -->
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  // import {
  //   BorderBox1,
  //   BorderBox2,
  //   BorderBox4,
  //   BorderBox5,
  //   BorderBox6,
  //   BorderBox7,
  //   BorderBox8,
  //   BorderBox9,
  //   BorderBox10,
  //   BorderBox11,
  //   BorderBox12,
  //   BorderBox13,
  //   Decoration1,
  //   Loading,
  //   Decoration2,
  //   Decoration3,
  //   Decoration4,
  //   Decoration5,
  //   Decoration6,
  //   Decoration7,
  //   Decoration8,
  // } from '@dataview/datav-vue3';

  export default defineComponent({
    name: 'LargeScreenDemo1',
    components: {
      PageWrapper,
      // BorderBox1,
      // BorderBox2,
      // BorderBox4,
      // BorderBox5,
      // BorderBox6,
      // BorderBox7,
      // BorderBox8,
      // BorderBox9,
      // BorderBox10,
      // BorderBox11,
      // BorderBox12,
      // BorderBox13,
      // Decoration1,
      // Loading,
      // Decoration2,
      // Decoration3,
      // Decoration4,
      // Decoration5,
      // Decoration6,
      // Decoration7,
      // Decoration8,
    },
  });
</script>

<style lang="scss" scoped>
  .wrapper {
    // width: 320px;
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;

    .session {
      width: 320px;
      height: 200px;
      .broderBox {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .session11,
    .session12,
    .session13 {
      width: 520px;
      height: 320px;
    }

    .decoration {
      width: 320px;
      height: 35px;
    }
  }
</style>
