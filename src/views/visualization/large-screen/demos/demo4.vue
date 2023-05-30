<template>
  <PageWrapper
    contentBackground
    contentFullHeight
    dense
    :contentStyle="{ color: '#ffffff', backgroundColor: '#282c34' }"
  >
    <div ref="fullScreenRef" class="full-control">
      <FullScreenContainer>
        <div class="control">
          <!-- 标题 -->
          <div class="title" @click="toggleFull">
            Smiling LargeScreen(大屏 DEMO)
            <Decoration5 :color="themeColors" :dur="8" style="height: 50px; margin-top: -20px" />
          </div>
          <!-- 主体部分 -->
          <div class="main">
            <BorderBox1 :color="themeColors" ref="border1Ref">
              <div class="main-control">
                <div class="main-session1">
                  <BorderBox3 :color="themeColors">
                    <div class="session1-top">
                      <div class="title">收费站</div>
                      <div class="subTitle">
                        设备运行总数 <div class="num">{{ 430 }}</div>
                      </div>
                      <div class="session-top-data">
                        <CapsuleChart :config="session1TopDataconfig" style="height: 180px" />
                      </div>
                      <Decoration2 :dur="4" style="width: 320px; height: 5px" />
                    </div>
                    <div class="session1-top">
                      <div class="title">收费站</div>
                      <div class="subTitle">
                        设备运行总数 <div class="num">{{ 430 }}</div>
                      </div>
                      <div class="session-top-data">
                        <CapsuleChart :config="session1TopDataconfig" style="height: 180px" />
                      </div>
                      <Decoration2 :dur="4" style="width: 320px; height: 5px" />
                    </div>
                    <div class="session1-top">
                      <div class="title">收费站</div>
                      <div class="subTitle">
                        设备运行总数 <div class="num">{{ 430 }}</div>
                      </div>
                      <div class="session-top-data">
                        <CapsuleChart :config="session1TopDataconfig" style="height: 180px" />
                      </div>
                      <Decoration2 :dur="4" style="width: 320px; height: 5px" />
                    </div>
                  </BorderBox3>
                </div>
                <div class="main-session2">
                  <BorderBox3 :color="themeColors">
                    <div class="map-wrap">
                      <div id="mapcontainer"></div>
                      <FlylineChart
                        :config="flylineChartConfig"
                        :dev="true"
                        style="
                          position: absolute;
                          left: 0;
                          top: 0;
                          width: 100%;
                          height: 100%;
                          pointer-events: none;
                        "
                      />
                    </div>
                  </BorderBox3>
                </div>
                <div class="main-session3">
                  <BorderBox3 :color="themeColors">
                    <div class="session1-top">
                      <div class="title">收费站</div>
                      <div class="subTitle">
                        设备运行总数 <div class="num">{{ 430 }}</div>
                      </div>
                      <div class="session-top-data">
                        <CapsuleChart :config="session1TopDataconfig" style="height: 180px" />
                      </div>
                      <!-- <Decoration2 :dur="4" style="width: 320px; height: 5px" /> -->
                      <Decoration3 style="width: 320px; height: 30px" />
                    </div>
                    <div class="session1-top">
                      <div class="title">收费站</div>
                      <div class="subTitle">
                        设备运行总数 <div class="num">{{ 430 }}</div>
                      </div>
                      <div class="session-top-data">
                        <CapsuleChart :config="session1TopDataconfig" style="height: 180px" />
                      </div>

                      <!-- <Decoration2 :dur="4" style="width: 320px; height: 5px" /> -->
                      <Decoration3 style="width: 320px; height: 30px" />
                    </div>
                    <div class="session1-top">
                      <div class="title">收费站</div>
                      <div class="subTitle">
                        设备运行总数 <div class="num">{{ 430 }}</div>
                      </div>
                      <div class="session-top-data">
                        <CapsuleChart :config="session1TopDataconfig" style="height: 180px" />
                      </div>
                      <Decoration3 style="width: 320px; height: 30px" />
                    </div>
                  </BorderBox3>
                </div>
              </div>
            </BorderBox1>
          </div>
        </div>
        <!-- <a-button style="position: absolute; left: 0; top: 0" @click="toggleFull"> 全屏 </a-button> -->
      </FullScreenContainer>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, nextTick } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { message } from 'ant-design-vue';
  import { useFullscreen } from '@vueuse/core';
  import {
    FullScreenContainer,
    BorderBox1,
    Decoration5,
    BorderBox3,
    CapsuleChart,
    Decoration2,
    Decoration3,
    FlylineChart,
  } from '@kjgl77/datav-vue3';

  import { AMapload } from '@/utils/lib/map';
  import { WENZHOU_BOUNDS } from './data';

  const AMap = await AMapload(); //  AMap load

  export default defineComponent({
    name: 'LargeScreenDemo2',
    components: {
      PageWrapper,
      FullScreenContainer,
      BorderBox1,
      Decoration5,
      BorderBox3,
      CapsuleChart,
      Decoration2,
      Decoration3,
      FlylineChart,
    },
    setup() {
      const themeColors = ref([]);
      // const themeColors = ref(['deeppink', 'skyblue']);

      const border1Ref = ref<InstanceType<typeof BorderBox1> | null>(null);

      const fullScreenRef = ref<Nullable<HTMLElement>>(null);
      const { toggle: toggleFull } = useFullscreen(fullScreenRef);

      const session1TopDataconfig = ref({
        data: [
          {
            name: '鹿城',
            value: 167,
          },
          {
            name: '瓯海',
            value: 123,
          },
          {
            name: '龙湾',
            value: 98,
          },
          {
            name: '永嘉',
            value: 75,
          },
          {
            name: '其它',
            value: 999,
          },
        ],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '万元',
      });

      var map;
      // 地图相关
      async function initMap() {
        map = new AMap.Map('mapcontainer', {
          //设置地图容器id
          viewMode: '3D', //是否为3D地图模式
          mapStyle: 'amap://styles/dark',
          zoom: 20, //初始化地图级别
          center: [120.688279, 27.985355], //初始化地图中心点位置
        });

        map.on('complete', function () {
          // 地图图块加载完成后触发
          message.success('地图加载完成!');

          var bounds = WENZHOU_BOUNDS;
          for (var i = 0; i < bounds.length; i += 1) {
            //构造MultiPolygon的path
            bounds[i] = [bounds[i]];
          }
          var polygon = new AMap.Polygon({
            strokeWeight: 1,
            path: bounds,
            fillOpacity: 0.4,
            fillColor: '#80d8ff',
            strokeColor: '#0091ea',
          });
          map.add(polygon);
          map.setFitView(polygon); //视口自适应
        });
      }

      const flylineChartConfig = ref({
        centerPoint: [0.61, 0.41],
        points: [
          {
            position: [0.52, 0.235],
            // text: '新乡',
          },
          {
            position: [0.43, 0.29],
            // text: '焦作',
          },
          {
            position: [0.59, 0.35],
            // text: '开封',
          },
          {
            position: [0.53, 0.47],
            // text: '许昌',
          },
          {
            position: [0.45, 0.54],
            // text: '平顶山',
          },
          {
            position: [0.36, 0.38],
            // text: '洛阳',
          },
          {
            position: [0.62, 0.55],
            // text: '周口',
          },
          {
            position: [0.56, 0.56],
            // text: '漯河',
          },
          {
            position: [0.37, 0.66],
            // text: '南阳',
          },
          {
            position: [0.55, 0.81],
            // text: '信阳',
          },
          {
            position: [0.55, 0.67],
            // text: '驻马店',
          },
          {
            position: [0.37, 0.29],
            // text: '济源',
          },
          {
            position: [0.2, 0.36],
            // text: '三门峡',
          },
          {
            position: [0.76, 0.41],
            // text: '商丘',
          },
          {
            position: [0.59, 0.18],
            // text: '鹤壁',
          },
          {
            position: [0.68, 0.17],
            // text: '濮阳',
          },
          {
            position: [0.59, 0.1],
            // text: '安阳',
          },
        ],
        // bgImgUrl: mapImg,
        // centerPointImg: {
        //   url: mapCenterPoint,
        // },
        // pointsImg: {
        //   url: mapPoint,
        // },
      });

      onMounted(async () => {
        await nextTick();
        // border1Ref.value?.initWH();
        setTimeout(() => {
          initMap();
        }, 300);
      });

      return {
        themeColors,
        border1Ref,
        fullScreenRef,
        toggleFull,
        session1TopDataconfig,
        flylineChartConfig,
      };
    },
  });
</script>

<style lang="scss" scoped>
  #dv-full-screen-container {
    position: relative;
  }

  .control {
    position: relative;
    left: 0;
    top: 0;
    padding: 8px;
    width: 100%;
    height: 100%;
    & > .title {
      position: relative;
      top: 20px;
      left: 50%;
      font-size: 32px;
      text-align: center;
      transform: translate3d(-50%, 0, 0);
      width: calc(100vw - 400px);
      height: 100px;
    }
    .main {
      position: relative;
      width: calc(100% - 40px);
      height: calc(100% - 100px);
      transform: translate3d(20px, 0, 0);
      left: 0;
      bottom: 0;
      .main-control {
        transform: scale(0.95);
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        .main-session1,
        .main-session3 {
          flex: 0 0 400px;
          margin-right: 12px;
          box-sizing: border-box;
          .session1-top {
            padding: 32px 32px 0 32px;
            width: 400px;
            position: relative;
            .title {
              width: 100%;
              font-size: 32px;
            }
            .subTitle {
              display: flex;
              align-items: baseline;
              text-align: left;
              font-size: 16px;
              margin-left: 12px;
              .num {
                margin-left: 28px;
                font-size: 28px;
                font-weight: bold;
                color: #096dd9;
              }
            }

            .session-top-data {
              width: 100%;
            }
          }
        }
        .main-session2 {
          flex: 1;
          .map-wrap {
            position: relative;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 155, 0.1);
            transform: scale(0.95);
            #mapcontainer {
              width: 100%;
              height: 100%;
            }
          }
        }
        .main-session3 {
          flex: 0 0 400px;
          margin-left: 12px;
        }
      }
    }
  }

  .full-control {
    background: url('../images/bg.ab267a94.png') no-repeat center/cover;
  }
</style>
