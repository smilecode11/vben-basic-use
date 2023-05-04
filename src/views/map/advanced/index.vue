<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div id="container"></div>
    <div class="opera">
      <!-- 操作区域 -->
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  import AMapLoader from '@amap/amap-jsapi-loader';

  export default defineComponent({
    components: {
      PageWrapper,
    },
    data() {
      return {
        centerPoint: [120.688279, 27.985355],
      };
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        AMapLoader.load({
          key: 'ccc60be0df40131454501ae4f8fca05f', // 申请好的Web端开发者Key，首次调用 load 时必填
          version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          // plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
          .then((AMap) => {
            this.map = new AMap.Map('container', {
              //设置地图容器id
              viewMode: '3D', //是否为3D地图模式
              zoom: 17, //初始化地图级别
              center: this.centerPoint, //初始化地图中心点位置
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
  });
</script>

<style scoped>
  #container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 70vh;
  }
</style>
