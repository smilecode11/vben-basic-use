<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div id="container"></div>
    <a-button @click="pluginToolBar">工具条</a-button>
    <a-button @click="pluginScale">比例尺</a-button>
    <a-button @click="pluginHawkEye">缩略图</a-button>
    <a-button @click="drawLineGetLng">绘制线段获取经纬数据</a-button>

    <!-- 操作区域 - 根据业务简单封装的组件 -->
    <a-divider orientation="left">操作区域</a-divider>
    <a-button @click="handleSearchAddressModalInit">搜索获取位置</a-button>
    <search-address ref="searchAddressRef" @confirm="confirmBySearchAddress" />
    <a-button @click="handleGetLnglatModalInit">经纬度获取</a-button>
    <get-lnglat ref="getLnglatRef" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import SearchAddress from './components/SearchAddress.vue';
  import GetLnglat from './components/GetLnglat.vue';
  import { message, Divider } from 'ant-design-vue';
  import { AMapload } from '@/utils/lib/map';

  const AMap = await AMapload(); //  AMap load

  export default defineComponent({
    components: {
      PageWrapper,
      ADivider: Divider,
      SearchAddress,
      GetLnglat,
    },
    data() {
      return {
        centerPoint: [120.688279, 27.985355],
      };
    },
    mounted() {
      this.initMap(); // 初始化地图
    },
    beforeUnmount() {
      this.destoryMap(); // 地图销毁
    },
    methods: {
      async initMap() {
        this.map = new AMap.Map('container', {
          //设置地图容器id
          viewMode: '3D', //是否为3D地图模式
          zoom: 17, //初始化地图级别
          center: this.centerPoint, //初始化地图中心点位置
        });

        this.map.on('complete', function () {
          // 地图图块加载完成后触发
          message.success('地图加载完成!');
        });
      },
      destoryMap() {
        this.map.destroy();
      },
      pluginScale() {
        message.warning('使用比例尺条插件');
        this.map.addControl(new AMap.Scale());
      },
      pluginToolBar() {
        message.warning('使用工具条插件');
        this.map.addControl(new AMap.ToolBar());
      },
      pluginHawkEye() {
        message.warning('使用缩略图插件');
        this.map.addControl(new AMap.HawkEye());
      },
      drawLineGetLng() {
        console.log('_drawLineGetLng');
        var mouseTool = new AMap.MouseTool(this.map);
        drawPolyline();
        function drawPolyline() {
          mouseTool.polyline({
            strokeColor: '#3366FF',
            strokeOpacity: 1,
            strokeWeight: 3,
            // 线样式还支持 'dashed'
            strokeStyle: 'solid',
            // strokeStyle是dashed时有效
            // strokeDasharray: [10, 5],
          });
        }
        mouseTool.on('draw', function (event) {
          // event.obj 为绘制出来的覆盖物对象
          console.log('覆盖物对象绘制完成');
          console.log(event.obj.getPath());
        });
      },
      /**************** 操作 ****************/
      /**************** 操作 ****************/
      /**************** 操作 ****************/
      handleSearchAddressModalInit() {
        this.$refs.searchAddressRef.init({
          address: '地区：浙江省温州市鹿城区绣山路321号',
          lng: '120.699279',
          lat: '27.993849',
          // type: 'address,distance',
          type: 'address',
        });
      },
      confirmBySearchAddress(data) {
        console.log('监听获取位置', data);
      },
      handleGetLnglatModalInit() {
        this.$refs.getLnglatRef.init();
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
  .opera-control {
    width: 100%;
    background: #fff;
  }
</style>
