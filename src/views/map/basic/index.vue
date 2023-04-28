<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div id="container"></div>
    <div class="opera">
      <a-button @click="setCenter">随机中心点</a-button>
      <a-button @click="getCity">获取当前行政区</a-button>
      <a-input
        v-model:value="cityValue"
        placeholder="city"
        size="small"
        style="width: 100px"
        type="text"
      >
        <template #suffix> city </template>
      </a-input>
      <a-input placeholder="地图zoom" v-model:value="zoom" type="number" style="width: 100px">
        <template #suffix> zoom </template>
      </a-input>
      <a-button @click="panBy">平移 50</a-button>
      <a-button @click="panTo">移动到固定点</a-button>
      <a-button @click="addMarker">添加 Marker</a-button>
      <a-button @click="removeMarker">移除 Marker</a-button>
      <a-button @click="addCircle">添加 Circle</a-button>
      <a-button @click="removeCircle">移除 Circle</a-button>
      <a-button @click="handleDistrictSearch">区域掩模(展示温州)</a-button>
      <a-button @click="drawPolygon">绘制覆盖物</a-button>
      <a-button @click="mapAddListener">map 添加多个 marker</a-button>
      <a-button @click="addImageLayer">添加图片图层</a-button>
      <a-button @click="addCanvasLayer">添加Canvas图层</a-button>
      <a-button @click="showHots">显示热力图</a-button>
      <a-button @click="customSvg">自定义图层 - SVG</a-button>
      <a-button @click="custom3DTiles">3DTiles</a-button>
      <a-button @click="customCanvasLayer">自定义Canvas图层</a-button>
      <a-button @click="customTileLayerFlexible">模拟水印</a-button>
      <a-button @click="resetMap">重置</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { message } from 'ant-design-vue';
  import { heatmapData } from './heatmapData';

  export default defineComponent({
    components: {
      PageWrapper,
    },
    data() {
      return {
        map: null,
        cityValue: '', //  设置行政区
        centerPoint: [120.688279, 27.985355],
        zoom: 16,
      };
    },
    watch: {
      zoom(newV) {
        if (newV) {
          this.initMap();
        }
      },
      cityValue(newV) {
        if (newV) {
          this.gotoCity(newV);
        }
      },
    },
    mounted() {
      this.initMap();
    },
    beforeUnmount() {
      this.destoryMap();
    },
    methods: {
      customTileLayerFlexible() {
        let layer = new AMap.TileLayer.Flexible({
          cacheSize: 30,
          opacity: 0.3,
          createTile: function (x, y, z, success, fail) {
            if ((x + y) % 3) {
              fail();
              return;
            }
            var img = document.createElement('img');
            img.onload = function () {
              success(img);
            };
            img.crossOrigin = 'anonymous'; // 必须添加，同时图片要有跨域头
            img.onerror = function () {
              fail();
            };

            img.src = 'https://a.amap.com/jsapi_demos/static/images/amap.png';
          },
        });

        this.map.addLayer(layer);
      },
      customCanvasLayer() {
        this.map.setZoom(5);
        this.map.setCenter([116.306206, 39.975468]);
        function getData(callback) {
          var search = new AMap.DistrictSearch();
          search.search('中国', function (status, data) {
            if (status === 'complete') {
              var positions = [];
              var provinces = data['districtList'][0]['districtList'];
              for (var i = 0; i < provinces.length; i += 1) {
                positions.push({
                  center: provinces[i].center,
                  radius: Math.max(2, Math.floor(Math.random() * 10)),
                });
              }
              callback(positions);
            }
          });
        }
        const addLayer = (positions) => {
          var canvas = document.createElement('canvas');
          var customLayer = new AMap.CustomLayer(canvas, {
            zooms: [3, 10],
            zIndex: 120,
          });
          var onRender = () => {
            var retina = AMap.Browser.retina;
            var size = this.map.getSize(); //resize
            var width = size.width;
            var height = size.height;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            if (retina) {
              //高清适配
              width *= 2;
              height *= 2;
            }
            canvas.width = width;
            canvas.height = height; //清除画布
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#08f';
            ctx.strokeStyle = '#fff';
            ctx.beginPath();
            for (var i = 0; i < positions.length; i += 1) {
              var center = positions[i].center;
              var pos = this.map.lngLatToContainer(center);
              var r = positions[i].radius;
              if (retina) {
                pos = pos.multiplyBy(2);
                // pos.x *= 2;
                // pos.y *= 2;
                r *= 2;
              }
              ctx.moveTo(pos.x + r, pos.y);
              ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
            }
            ctx.lineWidth = retina ? 6 : 3;
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
          };
          customLayer.render = onRender;
          customLayer.setMap(this.map);
        };
        getData(addLayer);
      },
      custom3DTiles() {
        this.map.setCenter([121.502325, 31.238165]);
        this.map.setPitch(90);
        this.map.setRotation(-50);
        this.map.setFeatures(['bg', 'road']);
        this.map.setMapStyle('amap://styles/darkblue');
        // 创建 3DTilesLayer
        new AMap['3DTilesLayer']({
          map: this.map,
          url: 'https://a.amap.com/jsapi_demos/static/data3d/single.json', // 3d Tiles 入口文件
          style: {
            light: {
              color: 'rgb(44,59,75)', // 设置光照颜色
              intensity: 2, // 设置光照强度
            },
          },
        });
      },
      customSvg() {
        var starCenter = [116.306206, 39.975468];
        this.map.setCenter(starCenter);

        var size = this.map.getSize();
        var canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        canvas.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        canvas.setAttribute('width', size.width);
        canvas.setAttribute('height', size.height);

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.onclick = function () {
          console.log('svg path clicked');
        };
        var styleText = [];
        styleText.push('stroke:red');
        styleText.push('fill:green');
        styleText.push('fill-opacity:0.3');
        path.style.cssText = styleText.join(';');

        canvas.appendChild(path);
        var customLayer = new AMap.CustomLayer(canvas, {
          // zooms: [3, 8],
          // alwaysRender:true,
          zIndex: 300,
        });
        customLayer.render = onRender;
        customLayer.setMap(this.map);

        const buildPath = () => {
          var path = [];
          var center = this.map.lngLatToContainer(starCenter);

          for (let k = 0; k < 6; k += 1) {
            var ag = ((Math.PI * 60) / 180) * k;
            var x = center.x + Math.cos(ag) * 50;
            var y = center.y + Math.sin(ag) * 50;
            path.push((k == 0 ? 'M' : 'L') + x + ' ' + y);
          }
          return path.join(' ') + ' Z';
        };

        function onRender() {
          //更新路径
          var newPath = buildPath();
          path.setAttribute('d', newPath);
        }
      },
      showHots() {
        if (!isSupportCanvas()) {
          alert(
            '热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~',
          );
        }
        //详细的参数,可以查看heatmap.js的文档 http://www.patrick-wied.at/static/heatmapjs/docs.html
        var heatmap;

        //初始化heatmap对象
        heatmap = new AMap.HeatMap(this.map, {
          radius: 25, //给定半径
          opacity: [0, 0.8],
        });
        //设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
          data: heatmapData,
          max: 100,
        });

        setTimeout(() => {
          this.map.setCenter([116.191031, 39.988585]);
          this.map.setZoom(10);

          heatmap.show();
        }, 1500);

        function isSupportCanvas() {
          var elem = document.createElement('canvas');
          return !!(elem.getContext && elem.getContext('2d'));
        }
      },
      addCanvasLayer() {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 200;
        var context = canvas.getContext('2d');
        context.fillStyle = 'rgb(0,100,255)';
        context.strokeStyle = 'white';
        context.globalAlpha = 1;
        context.lineWidth = 2;

        var radious = 0;
        var draw = function () {
          context.clearRect(0, 0, 200, 200);
          context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1;
          radious = (radious + 1) % 100;
          context.beginPath();
          context.arc(100, 100, radious, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
          // 刷新渲染图层
          CanvasLayer.reFresh();
          AMap.Util.requestAnimFrame(draw);
        };

        var CanvasLayer = new AMap.CanvasLayer({
          canvas: canvas,
          bounds: new AMap.Bounds([120.685246, 27.984694], [120.687704, 27.983079]),
          zooms: [10, 20],
        });

        draw();
        this.map.addLayer(CanvasLayer);
      },
      addImageLayer() {
        var imageLayer = new AMap.ImageLayer({
          url: 'https://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg',
          bounds: new AMap.Bounds([120.685246, 27.984694], [120.687704, 27.983079]),
          zooms: [10, 20], //  设置可见图层
        });
        this.map.add(imageLayer);
      },
      resetMap() {
        this.destoryMap();
        this.initMap();
        var info = [];
        info.push(
          '<div><div><img style="float:left;" src=" https://webapi.amap.com/images/autonavi.png "/></div> ',
        );
        info.push('<div style="padding:0px 0px 0px 4px;"><b>高德软件</b>');
        info.push('地址 : 站前东小区');
        info.push(`Tip : 地图已重置 </div></div>`);
        var infoWindow = new AMap.InfoWindow({
          content: info.join('<br/>'), //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.on('open', () => {
          console.log('窗体打开');
        });
        infoWindow.on('close', () => {
          console.log('窗体关闭');
        });
        infoWindow.open(this.map, this.map.getCenter());
      },
      initMap() {
        // 地图生命周期 - 地图创建
        var map = new AMap.Map('container', {
          viewMode: '3D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
          // pitch: 50, //  3d 设置 pitch
          // rotation: -15, //  3d 设置 rotation
          // rotateEnable: false,
          // pitchEnable: false,
          zoom: this.zoom, //  级别
          center: this.centerPoint, // 中心点
          isHotspot: true,
          //前往创建自定义地图样式：https://lbs.amap.com/dev/mapstyle/index
          // mapStyle: 'amap://styles/08539321a17cd7c322f76950f2c68b3f',
        });

        //  放大缩小工具
        map.addControl(new AMap.ToolBar());
        map.addControl(
          new AMap.ControlBar({
            position: {
              top: '10px',
              right: '10px',
            },
          }),
        );
        map.addControl(
          new AMap.HawkEye({
            opened: false,
          }),
        );
        map.addControl(new AMap.Scale());

        /** 地图热点 star*/
        var placeSearch = new AMap.PlaceSearch(); //构造地点查询类
        var infoWindow = new AMap.InfoWindow({});
        map.on('hotspotover', function (result) {
          placeSearch.getDetails(result.id, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              placeSearch_CallBack(result);
            }
          });
        });
        function placeSearch_CallBack(data) {
          var poiArr = data.poiList.pois;
          var location = poiArr[0].location;
          infoWindow.setContent(createContent(poiArr[0]));
          infoWindow.open(map, location);
        }
        function createContent(poi) {
          //信息窗体内容
          var s = [];
          s.push(
            '<div class="info-title">' +
              poi.name +
              '</div><div class="info-content">' +
              '地址：' +
              poi.address,
          );
          if (poi.tel) s.push('电话：' + poi.tel);
          if (poi.type) s.push('类型：' + poi.type);
          s.push('<div>');
          return s.join('<br>');
        }
        /** 地图热点 end*/

        // 地图加载完成事件监听
        map.on('complete', function () {
          message.success('地图加载完成！');
        });

        //  注册点击事件
        map.on('click', this.showInfoClick);

        this.map = map;
      },
      // 给 map 绑定添加多个 marker
      mapAddListener() {
        this.map.on('click', (e) => {
          new AMap.Marker({
            position: e.lnglat,
            map: this.map,
          });
        });
      },
      handleDistrictSearch() {
        var opts = {
          subdistrict: 0,
          extensions: 'all',
          level: 'city',
        };
        //利用行政区查询获取边界构建mask路径
        //也可以直接通过经纬度构建mask路径
        var district = new AMap.DistrictSearch(opts);
        district.search('温州市', (status, result) => {
          console.log('_district.search', status, result);
          var bounds = result.districtList[0].boundaries;
          var mask = [];
          for (var i = 0; i < bounds.length; i += 1) {
            mask.push([bounds[i]]);
          }
          var map = new AMap.Map('container', {
            mask: mask,
            // center: [116.472804, 39.995725],
            viewMode: '2D',
            zoom: 9,
            layers: [
              // new AMap.TileLayer.RoadNet({
              //   //rejectMapMask:true
              // }),
              // new AMap.TileLayer.Satellite(),
            ],
          });
          this.map = map;
        });
      },
      showInfoClick(e) {
        console.log('_地图点击事件监听:', '_lat', e.lnglat.getLat(), '_lng', e.lnglat.getLng());
      },
      // 设置中心点
      setCenter() {
        var lng = this.centerPoint[0] + Math.floor(Math.random() * 589828) / 1e6;
        var lat = this.centerPoint[1] + Math.floor(Math.random() * 514923) / 1e6;
        this.map.setCenter([lng, lat]); //  设置地图中心点
      },
      addMarker() {
        var marker = new AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [120.68819, 27.985407],
          anchor: 'bottom-center',
        });
        this.marker = marker;
        this.map.add(marker);
        this.map.setFitView();
      },
      removeMarker() {
        if (!this.marker) return;
        this.map.remove(this.marker);
        // this.map.setFitView();
      },
      // 构造矢量圆形
      addCircle() {
        var circle = new AMap.Circle({
          center: new AMap.LngLat('120.688925', '27.985675'), // 圆心位置
          radius: 100, //半径
          strokeColor: '#F33', //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 3, //线粗细度
          fillColor: '#ee2200', //填充颜色
          fillOpacity: 0.05, //填充透明度
        });
        this.circle = circle;
        this.map.add(circle);
        // this.map.setFitView();
      },
      removeCircle() {
        if (!this.circle) return;
        this.map.remove(this.circle);
        // this.map.setFitView();
      },
      //  绘制覆盖物
      drawPolygon() {
        var polygonArr = [
          [120.687731, 27.985886],
          [120.687696, 27.984774],
          [120.688599, 27.984801],
          [120.688576, 27.985933],
        ];
        let polygon = new AMap.Polygon({
          map: this.map,
          path: polygonArr, //设置多边形边界路径
          strokeColor: '#FF33FF', //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 3, //线宽
          fillColor: '#1791fc', //填充色
          fillOpacity: 0.1, //填充透明度
          draggable: true,
        });
        polygon.on('click', (e) => {
          console.log('绘制覆盖物 click:', '_lat', e.lnglat.getLat(), '_lng', e.lnglat.getLng());
        });
        polygon.on('dragging', (e) => {
          console.log('绘制覆盖物 dragging:', e);
        });
        this.map.setFitView();
      },
      panBy() {
        this.map.panBy(50, 100);
      },
      panTo() {
        this.map.panTo(this.centerPoint);
      },
      setDefaultCursor() {
        this.map.setDefaultCursor('pointer');
      },
      // 去往城市
      gotoCity() {
        const map = this.map;
        const targetCity = this.cityValue;
        map.setCity(targetCity);
      },
      // 获取当前城市信息
      getCity() {
        this.map.getCity(function (info) {
          console.log(info);
        });
      },
      destoryMap() {
        const map = this.map;
        //  地图销毁
        map && map.destroy();
      },
    },
  });
</script>

<style scoped>
  #container {
    width: 100%;
    min-height: 80vh;
  }
</style>
