<template>
  <PageWrapper :contentStyle="{ margin: 0 }">
    <div id="container"></div>
    <div id="list"></div>
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
      <a-button @click="hotspotover">显示热点</a-button>
      <a-button @click="removeMarker">移除 Marker</a-button>
      <a-button @click="addCircle">添加 Circle</a-button>
      <a-button @click="removeCircle">移除 Circle</a-button>
      <a-button @click="gpstransfer">坐标转换 GPS 转高德</a-button>
      <a-button @click="moregpstransfer">批量坐标转换 GPS 转高德</a-button>
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
      <a-button @click="indoor">室内地图</a-button>
      <a-button @click="resetMap">重置</a-button>
      <a-divider orientation="left">覆盖物</a-divider>
      <a-button @click="setFitView">自动适配覆盖物</a-button>
      <a-button @click="addSeveralOverlayButton">添加多个覆盖物</a-button>
      <a-button @click="removeSeveralOverlayButton">移除多个覆盖物</a-button>
      <a-button @click="getAllOverlays('marker')">获取某类覆盖物(marker)</a-button>
      <a-button @click="addUpdateMarker('add')">添加点标记</a-button>
      <a-button @click="addUpdateMarker('update')">更新额点标记</a-button>
      <a-button @click="addUpdateMarkerText">纯文本标记</a-button>
      <a-button @click="MarkerCustomIcon">点标记自定义图标</a-button>
      <a-button @click="MarkerCircle">圆点标记</a-button>
      <a-button @click="MarkerCustomContent">自定义标记点内容</a-button>
      <a-button @click="MarkerLabelSetting">设置点标记的 label</a-button>
      <a-button @click="Marker1">自适应多个标记点</a-button>
      <a-button @click="MarkerDelete">删除多个标记点</a-button>
      <a-button @click="MarkerDelete2">清楚指定多个标记点</a-button>
      <a-button @click="MarkerDrag">设置标记点可拖拽</a-button>
      <a-button @click="MarkTrackPlayback">轨迹回放</a-button>
      <a-button @click="MarkTrackPlayback2">轨迹回放2</a-button>
      <a-button @click="MarkCustomMore">灵活点标记</a-button>
      <a-button @click="MarkerMany">海量点标记</a-button>
      <a-button @click="MarkerMany2">海量点标记2</a-button>
      <a-button @click="MarkerMany3">点聚合</a-button>
      <a-button @click="MarkerMany4">点聚合包含权重(weget)</a-button>
      <a-button @click="drawPolyline">矢量图形-绘制折线</a-button>
      <a-button @click="drawPolylineEditor">绘制折线和編輯</a-button>
      <a-button @click="drawBezierCurve">矢量图形-弧线绘制和编辑</a-button>
      <a-button @click="drawPolygon2">多边形绘制</a-button>
      <a-button @click="drawRectangleEditor">矩形绘制和编辑</a-button>
      <a-button @click="drawellipseEditor">圆绘制和编辑</a-button>
      <a-button @click="drawPolygonEditor">多边形编辑器吸附功能</a-button>
      <a-button @click="infoWindowOpera">信息窗体</a-button>
      <a-button @click="rightmenu">右键菜单</a-button>
      <a-divider orientation="left">搜索服务</a-divider>
      <a-input-search
        v-model:value="searchValue"
        placeholder="input search text"
        style="width: 200px"
        @search="searchTips"
      />
      <a-input-search
        v-model:value="searchValue2"
        placeholder="input search text"
        style="width: 200px"
        @search="searchTips2"
        id="tipinput"
        ref="tips2Ref"
      />
      <a-input-search
        v-model:value="searchPOIValue"
        placeholder="POI搜索"
        style="width: 200px"
        @search="searchPOI"
      />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { message, Divider } from 'ant-design-vue';
  import { heatmapData } from './heatmapData';
  import { capitals } from './capitals';
  import { sheshi, touristSpots } from './sheshi';
  import { LabelsData } from './label';
  import { citys } from './citys';
  import { points } from './china';
  import { points as withWegetPoints } from './weget';
  import { shanghai } from './shanghai';

  export default defineComponent({
    components: {
      PageWrapper,
      ADivider: Divider,
    },
    data() {
      return {
        searchPOIValue: '',
        searchValue2: '',
        searchValue: '',
        map: null,
        cityValue: '', //  设置行政区
        centerPoint: [120.688279, 27.985355],
        zoom: 16,
        addUpdateMarkerCurr: null,
        markers: [],
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
      this.initCurrPosition();
      this.initMap();
      this.initAutoComplete();
    },
    beforeUnmount() {
      this.destoryMap();
    },
    methods: {
      initCurrPosition() {
        const geolocation = new AMap.Geolocation({
          GeoLocationFirst: true,
          enableHighAccuracy: true,
          timeout: 10000, //超过10秒后停止定位，默认：5s
          position: 'RB', //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });
        // this.map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result);
          } else {
            onError(result);
          }
        });
        //解析定位结果
        function onComplete(data) {
          console.log('_onComplete', data);
          // document.getElementById('status').innerHTML = '定位成功';
          // var str = [];
          // str.push('定位结果：' + data.position);
          // str.push('定位类别：' + data.location_type);
          // if (data.accuracy) {
          //   str.push('精度：' + data.accuracy + ' 米');
          // } //如为IP精确定位结果则没有精度信息
          // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
          // document.getElementById('result').innerHTML = str.join('<br>');
        }
        //解析定位错误信息
        function onError(data) {
          console.log('_onError', data);
        }
      },
      async searchPOI() {
        // 获取搜索信息
        const autoInput = () => {
          return new Promise((resolve, reject) => {
            var keywords = this.searchPOIValue;
            AMap.plugin('AMap.PlaceSearch', () => {
              var autoOptions = {
                city: '全国',
                children: 1,
                pageSize: 30, //  单页显示结果
                pageIndex: 1,
                extensions: 'base', //  all 返回基本+详细信息
                map: this.map,
                renderStyle: 'default', // default 为简单模式 newpc 带图片
                autoFitView: true, //  自动调整地图视野
                panel: 'list', //  结果列表的HTML容器id或容器元素
              };
              var placeSearch = new AMap.PlaceSearch(autoOptions);
              // 根据关键字查找
              placeSearch.search(keywords, function (status, result) {
                // 搜索成功时，result即是对应的匹配数据
                console.log('_status', status, '_result', result);
                if (status === 'complete' && result.info === 'OK') {
                  resolve(result.poiList);
                } else {
                  reject(result);
                }
              });

              placeSearch.on('selectChanged', (e) => {
                console.log('_使用map、panel属性后，选中的POI改变时触发', e);
              });

              placeSearch.on('listElementClick', (e) => {
                console.log('_使用map、panel属性后，结果面板中POI对应的列表项被点击时触发', e);
              });

              placeSearch.on('markerClick', (e) => {
                console.log('_使用map、panel属性后，POI在地图中对应的Marker被点击时触发', e);
              });

              // 查找周边
              // placeSearch.searchNearBy()
              // 范围查找
              // placeSearch.searchInBounds()
              // 根据 poiid 获取详情
              // placeSearch.getDetails()
              // 设置查找类型, 多个用 | 分割
              // placeSearch.setType()
              // 设置查找数量
              // placeSearch.setPageSize()
              // 清除结果
              // placeSearch.clear()
              // 唤起高德地图客户端 marker
              // placeSearch.poiOnAMAP
              // 唤起高德地图客户端 POI详情页
              // placeSearch.detailOnAMAP()
            });
          });
        };

        const poiList = await autoInput();
        console.log('_SearchPOI', poiList);
      },
      initAutoComplete() {
        new AMap.AutoComplete({
          input: 'tipinput',
        });
      },
      async searchTips2() {
        console.log('_this.searchValue2', this.searchValue2);
        if (!this.searchValue2) return;
        var markers = [];
        const autoInput = () => {
          return new Promise((resolve, reject) => {
            var keywords = this.searchValue2;
            AMap.plugin('AMap.AutoComplete', () => {
              // 实例化Autocomplete
              var autoOptions = {
                city: '全国',
              };
              var autoComplete = new AMap.Autocomplete(autoOptions);
              autoComplete.search(keywords, (status, result) => {
                if (result.info === 'OK') {
                  this.map.clearMap(); //  清除覆盖物
                  result.tips.forEach((item, index) => {
                    if (index <= 4) {
                      const { adcode, address, location, name } = item;
                      const { lat, lng } = location;
                      markers.push({
                        icon: `//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-${
                          index + 1
                        }.png`,
                        position: [lng, lat],
                        adcode,
                        address,
                        name,
                      });
                    }
                  });
                  resolve(markers);
                } else {
                  reject({ status, result });
                }
              });
            });
          });
        };
        const resultMarkers = await autoInput();
        resultMarkers.forEach((marker) => {
          // marker
          const maE = new AMap.Marker({
            map: this.map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-13, -30),
          });
        });

        this.map.setFitView();
      },
      async searchTips() {
        console.log('_searchTips', this.searchValue);

        var markers = []; //  存储搜索结果

        const autoInput = () => {
          return new Promise((resolve, reject) => {
            var keywords = this.searchValue;
            AMap.plugin('AMap.AutoComplete', () => {
              // 实例化Autocomplete
              var autoOptions = {
                city: '全国',
              };
              var autoComplete = new AMap.Autocomplete(autoOptions);
              autoComplete.search(keywords, (status, result) => {
                if (result.info === 'OK') {
                  this.map.clearMap(); //  清除覆盖物
                  result.tips.forEach((item, index) => {
                    if (index <= 4) {
                      const { adcode, address, location, name } = item;
                      const { lat, lng } = location;
                      markers.push({
                        icon: `//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-${
                          index + 1
                        }.png`,
                        position: [lng, lat],
                        adcode,
                        address,
                        name,
                      });
                    }
                  });
                  resolve(markers);
                } else {
                  reject({ status, result });
                }
              });
            });
          });
        };
        const resultMarkers = await autoInput();
        console.log('_resultMarkers', resultMarkers);

        resultMarkers.forEach((marker) => {
          // marker
          const maE = new AMap.Marker({
            map: this.map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-13, -30),
            // content: `${marker.name}`, //- ${marker.address} - ${marker.position}
          });
          // maE.setLabel({
          //   direction: 'right',
          //   offset: new AMap.Pixel(0, 0), //设置文本标注偏移量
          //   content: `<div class='info'>${marker.name}</div>`, //设置文本标注内容
          // });
          maE.on('click', (e) => {
            console.log('_maE click', e);
            console.log('_position', e.target.getPosition());
          });
        });

        this.map.setFitView();
      },
      rightmenu() {
        var lnglat = new AMap.LngLat(116.397, 39.918);
        this.map = new AMap.Map('container', {
          center: lnglat,
          zoom: 14,
          resizeEnable: true,
        });

        //自定义菜单类
        function ContextMenu(map) {
          var me = this;
          //地图中添加鼠标工具MouseTool插件
          this.mouseTool = new AMap.MouseTool(map);
          this.contextMenuPositon = null;
          var content = [];
          content.push("<div class='info context_menu'>");
          content.push("  <p onclick='menu.zoomMenu(0)'>缩小</p>");
          content.push("  <p class='split_line' onclick='menu.zoomMenu(1)'>放大</p>");
          content.push("  <p class='split_line' onclick='menu.distanceMeasureMenu()'>距离量测</p>");
          content.push("  <p onclick='menu.addMarkerMenu()'>添加标记</p>");
          content.push('</div>');
          //通过content自定义右键菜单内容
          this.contextMenu = new AMap.ContextMenu({ isCustom: true, content: content.join('') });

          //地图绑定鼠标右击事件——弹出右键菜单
          map.on('rightclick', (e) => {
            me.contextMenu.open(map, e.lnglat);
            me.contextMenuPositon = e.lnglat; //右键菜单位置
          });
        }

        ContextMenu.prototype.zoomMenu = (tag) => {
          //右键菜单缩放地图
          if (tag === 0) {
            this.map.zoomOut();
          }
          if (tag === 1) {
            this.map.zoomIn();
          }
          this.contextMenu.close();
        };
        ContextMenu.prototype.distanceMeasureMenu = () => {
          //右键菜单距离量测
          this.mouseTool.rule();
          this.contextMenu.close();
        };
        ContextMenu.prototype.addMarkerMenu = () => {
          //右键菜单添加Marker标记
          this.mouseTool.close();
          var marker = new AMap.Marker({
            map: this.map,
            position: this.contextMenuPositon || this.map.getCenter(), //基点位置
          });
          this.contextMenu.close();
        };

        //创建右键菜单
        this.menu = new ContextMenu(this.map);
        this.menu.contextMenu.open(this.map, lnglat);
      },
      infoWindowOpera() {
        var centerlng = [116.473188, 39.993253];
        var infoWindow;
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: centerlng,
          zoom: 13,
        });

        //在指定位置打开信息窗体
        var openInfo = () => {
          //构建信息窗体中显示的内容
          //实例化信息窗体
          var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
            content = [];
          content.push(
            `<div style="display:flex;align-items:center;">
              <img src='http://tpc.googlesyndication.com/simgad/5843493769827749134' />
              <div style="display:flex;flex-direction:column;margin-left:10px">
                <span>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里</span>
                <span>电话：010-64733333</span>
                <a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>
              </div>
            </div>`,
          );
          //构建自定义信息窗体
          var createInfoWindow = (title, content) => {
            var info = document.createElement('div');
            info.className = 'custom-info input-card content-window-card';
            //可以通过下面的方式修改自定义窗体的宽高
            info.style.width = '400px';
            // 定义顶部标题
            var top = document.createElement('div');
            var titleD = document.createElement('div');
            var closeX = document.createElement('img');
            top.style.position = 'relative';
            top.style.display = 'flex';
            top.style.alignItems = 'center';
            top.style.justifyContent = 'space-between';
            titleD.innerHTML = title;
            closeX.src = 'https://webapi.amap.com/images/close2.gif';
            closeX.onclick = closeInfoWindow;
            top.appendChild(titleD);
            top.appendChild(closeX);
            info.appendChild(top);
            // 定义中部内容
            var middle = document.createElement('div');
            middle.className = 'info-middle';
            middle.style.backgroundColor = 'white';
            middle.innerHTML = content;
            info.appendChild(middle);
            return info;
          };
          const closeInfoWindow = () => {
            this.map.clearInfoWindow();
          };

          infoWindow = new AMap.InfoWindow({
            isCustom: true, //使用自定义窗体
            content: createInfoWindow(title, content.join('<br/>')),
            offset: new AMap.Pixel(16, -45),
          });

          infoWindow.open(this.map, this.map.getCenter());
        };

        message.warning('2s 后打开信息窗体');
        setTimeout(() => {
          openInfo();
        }, 2000);
      },
      drawPolygonEditor() {
        this.map = new AMap.Map('container', {
          center: [116.471354, 39.994257],
          zoom: 16.8,
        });

        var path1 = [
          [116.475334, 39.997534],
          [116.476627, 39.998315],
          [116.478603, 39.99879],
          [116.478529, 40.000296],
          [116.475082, 40.000151],
          [116.473421, 39.998717],
        ];
        var path2 = [
          [116.474595, 40.001321],
          [116.473526, 39.999865],
          [116.476284, 40.000917],
        ];
        var polygon1 = new AMap.Polygon({
          path: path1,
        });
        var polygon2 = new AMap.Polygon({
          path: path2,
        });
        this.map.add([polygon1, polygon2]);
        this.map.setFitView();

        var polyEditor = new AMap.PolygonEditor(this.map);
        polyEditor.addAdsorbPolygons([polygon1, polygon2]);
        polyEditor.on('add', function (data) {
          console.log('_add', data);
          var polygon = data.target;
          polyEditor.addAdsorbPolygons(polygon);
          polygon.on('dblclick', () => {
            polyEditor.setTarget(polygon);
            polyEditor.open();
          });
        });
        polygon1.on('dblclick', () => {
          polyEditor.setTarget(polygon1);
          polyEditor.open();
        });
        polygon2.on('dblclick', () => {
          polyEditor.setTarget(polygon2);
          polyEditor.open();
        });
        //  新建多邊形區域
        const createPolygon = () => {
          polyEditor.close();
          polyEditor.setTarget();
          polyEditor.open();
        };
        polyEditor.setTarget(polygon2);
        polyEditor.open();

        message.warning('5s 后新建多邊形編輯區域');
        setTimeout(() => {
          createPolygon();
        }, 5000);
      },
      drawRectangleEditor() {
        this.map = new AMap.Map('container', {
          center: [116.387175, 39.876405],
          zoom: 13,
        });

        var southWest = new AMap.LngLat(116.356449, 39.859008);
        var northEast = new AMap.LngLat(116.417901, 39.893797);

        var bounds = new AMap.Bounds(southWest, northEast);

        var rectangle = new AMap.Rectangle({
          bounds: bounds,
          strokeColor: 'red',
          strokeWeight: 6,
          strokeOpacity: 0.5,
          strokeDasharray: [30, 10],
          // strokeStyle还支持 solid
          strokeStyle: 'dashed',
          fillColor: 'blue',
          fillOpacity: 0.5,
          cursor: 'pointer',
          zIndex: 50,
        });

        this.map.add(rectangle);
        // 缩放地图到合适的视野级别
        this.map.setFitView([rectangle]);

        var rectangleEditor = new AMap.RectangleEditor(this.map, rectangle);

        message.warning('1s 后开始编辑');
        setTimeout(() => {
          rectangleEditor.open();
          message.warning('5s 后完成编辑');
          setTimeout(() => {
            rectangleEditor.close();
          }, 5000);
        }, 1000);

        rectangleEditor.on('adjust', function (event) {
          console.log('触发事件：adjust', event);
        });

        rectangleEditor.on('end', function (event) {
          console.log('触发事件： end', event);
          // event.target 即为编辑后的矩形对象
        });
      },
      drawellipseEditor() {
        this.map = new AMap.Map('container', {
          center: [116.433322, 39.900255],
          zoom: 14,
        });
        var ellipse = new AMap.Ellipse({
          center: [116.433322, 39.900255],
          radius: [2000, 1000], //半径
          borderWeight: 3,
          strokeColor: '#FF33FF',
          strokeOpacity: 1,
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillOpacity: 0.4,
          // 线样式还支持 'dashed'
          strokeStyle: 'dashed',
          strokeDasharray: [10, 10],
          fillColor: '#1791fc',
          zIndex: 50,
        });
        this.map.add(ellipse);
        // 缩放地图到合适的视野级别
        this.map.setFitView([ellipse]);
        var ellipseEditor = new AMap.EllipseEditor(this.map, ellipse);
        message.warning('1s 后开始编辑');
        setTimeout(() => {
          ellipseEditor.open();
          message.warning('5s 后完成编辑');
          setTimeout(() => {
            ellipseEditor.close();
          }, 5000);
        }, 1000);

        ellipseEditor.on('move', function (event) {
          console.log('触发事件：move', event);
        });

        ellipseEditor.on('adjust', function (event) {
          console.log('触发事件：adjust', event);
        });

        ellipseEditor.on('end', function (event) {
          console.log('触发事件： end', event);
        });
      },
      drawPolygon2() {
        this.map = new AMap.Map('container', {
          center: [121.045332, 31.19884],
          zoom: 8.8,
        });

        const addPolygon = (data) => {
          let polygon = new AMap.Polygon({
            path: data,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5],
          });
          polygon.on('mouseover', () => {
            polygon.setOptions({
              fillOpacity: 0.7,
              fillColor: '#7bccc4',
            });
          });
          polygon.on('mouseout', () => {
            polygon.setOptions({
              fillOpacity: 0.5,
              fillColor: '#ccebc5',
            });
          });
          this.map.add(polygon);
        };
        addPolygon(shanghai);
      },
      drawBezierCurve() {
        this.map.clearMap();
        var path = [
          //每个弧线段有两种描述方式
          [116.37, 39.91], //起点
          //第一段弧线
          [116.380298, 39.907771, 116.38, 39.9], //控制点，途经点
          //第二段弧线
          // [116.385298, 39.907771, 116.4, 39.9], //控制点，途经点//弧线段有两种描述方式1
          //第三段弧线
          // [
          //   //弧线段有两种描述方式2
          //   [116.392872, 39.887391], //控制点
          //   [116.40772, 39.909252], //控制点
          //   [116.41, 39.89], //途经点
          // ],
          //第四段弧线
          // [116.423857, 39.889498, 116.422312, 39.899639, 116.425273, 39.902273],
          //控制点，控制点，途经点，每段最多两个控制点
        ];
        var bezierCurve = new AMap.BezierCurve({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: '#3366FF',
          strokeOpacity: 1,
          strokeWeight: 6,
          // 线样式还支持 'dashed'
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 10],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        });

        this.map.add(bezierCurve);
        // 缩放地图到合适的视野级别
        this.map.setFitView([bezierCurve]);
        var bezierCurveEditor = new AMap.BezierCurveEditor(this.map, bezierCurve);
        bezierCurveEditor.on('addnode', function (event) {
          console.log('触发事件：addnode', event);
        });
        bezierCurveEditor.on('end', function (event) {
          console.log('触发事件： end', event);
          // event.target 即编辑后的曲线对象
        });
        message.warning('1s 后开始编辑');
        setTimeout(() => {
          bezierCurveEditor.open();

          message.warning('5s 后完成编辑');
          setTimeout(() => {
            bezierCurveEditor.close();
          }, 5000);
        });
      },
      drawPolyline() {
        this.map.clearMap();

        var path = [
          [120.688642, 27.986414],
          [120.690175, 27.986398],
          [120.688587, 27.985387],
          [120.690157, 27.985362],
        ];

        var path2 = [
          [
            [120.688178, 27.985393],
            [120.688598, 27.985296],
            [120.688165, 27.985253],
          ],
          [
            [120.688144, 27.985649],
            [120.688607, 27.985661],
            [120.68818, 27.985414],
          ],
        ];

        var polyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: '#3366FF',
          strokeOpacity: 1,
          strokeWeight: 6,
          // 折线样式还支持 'dashed'
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        });

        var polyline2 = new AMap.Polyline({
          path: path2,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: '#3366FF',
          strokeOpacity: 1,
          strokeWeight: 6,
          // 折线样式还支持 'dashed'
          strokeStyle: 'dashed',
          // strokeStyle是dashed时有效
          strokeDasharray: [15, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        });
        this.map.add([polyline, polyline2]);
        this.map.setFitView();
      },
      drawPolylineEditor() {
        this.map = new AMap.Map('container', {
          center: [116.400274, 39.905812],
          zoom: 14,
        });
        //  折線路徑
        var path = [
          [116.403322, 39.920255],
          [116.410703, 39.897555],
          [116.402292, 39.892353],
          [116.389846, 39.891365],
        ];
        //  繪製折線
        var polyline1 = new AMap.Polyline({
          path: path,
          strokeColor: '#FF33FF',
          strokeWeight: 6,
          strokeOpacity: 0.9,
          zIndex: 50,
          bubble: true,
        });

        polyline1.on('dblclick', () => {
          polyEditor.setTarget(polyline1);
          polyEditor.open();
        });

        this.map.add([polyline1]);
        this.map.setFitView();

        var polyEditor;
        polyEditor = new AMap.PolylineEditor(this.map, polyline1);

        polyEditor.on('add', function (data) {
          var polyline = data.target;
          console.log('_polyEditor add', polyline);
          polyline.on('dblclick', () => {
            polyEditor.setTarget(polyline);
            polyEditor.open();
          });
        });

        polyEditor.on('add', (event) => {
          console.log('_polyEditor add', event);
        });

        polyEditor.on('end', (event) => {
          console.log('_polyEditor end', event);
        });

        const editPolyline1 = () => {
          polyEditor.setTarget(polyline1);
          polyEditor.open();
        };

        function createPolyline() {
          polyEditor.setTarget();
          polyEditor.open();
        }

        message.warning('1s 后开始编辑');
        setTimeout(() => {
          editPolyline1();

          message.warning('5s 后完成编辑');
          setTimeout(() => {
            polyEditor.close();

            message.warning('3s 后新建一条折线');
            createPolyline();
          }, 5000);
        });
      },
      MarkerMany4() {
        this.map = new AMap.Map('container', {
          center: [104.937478, 35.439575],
          mapStyle: 'amap://styles/grey',
          zoom: 5,
        });
        var count = withWegetPoints.length;
        // 数据中增加权重信息，以权重高的点为中心进行聚合
        // 本示例中北京等城市中心点权重较高
        // var points = [
        // { weight: 8, lnglat:["116.408032","39.909729"], "name": '北京'},
        // { weight: 1, lnglat: ["112.985037", "23.15046"] },
        // ...
        // ]
        var _renderClusterMarker = (context) => {
          // 聚合中点个数
          var clusterCount = context.count;
          var div = document.createElement('div');
          // 聚合点配色
          var defaultColor = [
            '204,235,197',
            '168,221,181',
            '123,204,196',
            '78,179,211',
            '43,140,190',
          ];
          var bgColor;
          if (clusterCount >= 0 && clusterCount < 10) {
            bgColor = defaultColor[0];
          } else if (clusterCount >= 10 && clusterCount < 100) {
            bgColor = defaultColor[1];
          } else if (clusterCount >= 100 && clusterCount < 1000) {
            bgColor = defaultColor[2];
          } else if (clusterCount >= 1000 && clusterCount < 10000) {
            bgColor = defaultColor[3];
          } else if (clusterCount >= 10000) {
            bgColor = defaultColor[4];
          }
          div.style.backgroundColor = 'rgba(' + bgColor + ',.5)';
          var size = Math.round(25 + Math.pow(clusterCount / count, 1 / 5) * 40);
          div.style.width = div.style.height = size + 'px';
          div.style.border = 'solid 1px rgba(' + bgColor + ',1)';
          div.style.borderRadius = size / 2 + 'px';
          div.innerHTML = context.count;
          div.style.lineHeight = size + 'px';
          div.style.color = '#ffffff';
          div.style.fontSize = '12px';
          div.style.textAlign = 'center';
          context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
          context.marker.setContent(div);
        };
        var _renderMarker = (context) => {
          var content =
            '<div style="background-color: rgba(255,255,178,.9); height: 18px; width: 18px; border: 1px solid rgba(255,255,178,1); border-radius: 12px; box-shadow: rgba(0, 0, 0, 1) 0px 0px 3px;"></div>';
          var offset = new AMap.Pixel(-9, -9);
          context.marker.setContent(content);
          context.marker.setOffset(offset);
        };

        new AMap.MarkerCluster(this.map, points, {
          gridSize: 60, // 聚合网格像素大小
          renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
          renderMarker: _renderMarker, // 自定义非聚合点样式
        });
      },
      MarkerMany3() {
        var cluster;

        this.map = new AMap.Map('container', {
          center: [104.937478, 35.439575],
          zoom: 5,
        });

        var gridSize = 60;
        // 数据中需包含经纬度信息字段 lnglat
        // var points = [
        // { lnglat: ["108.939621", "34.343147"] },
        // ...
        // ]
        var count = points.length;

        var _renderClusterMarker = (context) => {
          // console.log("__renderClusterMarker", context)
          var factor = Math.pow(context.count / count, 1 / 18);
          var div = document.createElement('div');
          var Hue = 180 - factor * 180;
          var bgColor = 'hsla(' + Hue + ',100%,40%,0.7)';
          var fontColor = 'hsla(' + Hue + ',100%,90%,1)';
          var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
          var shadowColor = 'hsla(' + Hue + ',100%,90%,1)';
          div.style.backgroundColor = bgColor;
          var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
          div.style.width = div.style.height = size + 'px';
          div.style.border = 'solid 1px ' + borderColor;
          div.style.borderRadius = size / 2 + 'px';
          div.style.boxShadow = '0 0 5px ' + shadowColor;
          div.innerHTML = context.count;
          div.style.lineHeight = size + 'px';
          div.style.color = fontColor;
          div.style.fontSize = '14px';
          div.style.textAlign = 'center';
          context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
          context.marker.setContent(div);
        };
        var _renderMarker = (context) => {
          var content =
            '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
          var offset = new AMap.Pixel(-9, -9);
          context.marker.setContent(content);
          context.marker.setOffset(offset);
        };

        var addCluster = (tag) => {
          if (cluster) {
            cluster.setMap(null);
          }
          if (tag == 2) {
            //完全自定义
            cluster = new AMap.MarkerCluster(this.map, points, {
              gridSize: gridSize, // 设置网格像素大小
              renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
              renderMarker: _renderMarker, // 自定义非聚合点样式
            });
          } else if (tag == 1) {
            //自定义图标
            var sts = [
              {
                url: '//a.amap.com/jsapi_demos/static/images/blue.png',
                size: new AMap.Size(32, 32),
                offset: new AMap.Pixel(-16, -16),
              },
              {
                url: '//a.amap.com/jsapi_demos/static/images/green.png',
                size: new AMap.Size(32, 32),
                offset: new AMap.Pixel(-16, -16),
              },
              {
                url: '//a.amap.com/jsapi_demos/static/images/orange.png',
                size: new AMap.Size(36, 36),
                offset: new AMap.Pixel(-18, -18),
              },
              {
                url: '//a.amap.com/jsapi_demos/static/images/red.png',
                size: new AMap.Size(48, 48),
                offset: new AMap.Pixel(-24, -24),
              },
              {
                url: '//a.amap.com/jsapi_demos/static/images/darkRed.png',
                size: new AMap.Size(48, 48),
                offset: new AMap.Pixel(-24, -24),
              },
            ];
            cluster = new AMap.MarkerCluster(this.map, points, {
              styles: sts,
              gridSize: gridSize,
            });
          } else {
            //默认样式
            cluster = new AMap.MarkerCluster(this.map, points, { gridSize: gridSize });
          }
        };

        addCluster(2);
      },
      MarkerMany2() {
        this.map = new AMap.Map('container', {
          zoom: 4,
          center: [102.342785, 35.312316],
          showIndoorMap: false,
          viewMode: '3D',
        });

        // JSAPI 2.0 支持显示设置 zIndex, zIndex 越大约靠前，默认按顺序排列
        var style = [
          {
            url: 'https://webapi.amap.com/images/mass/mass0.png',
            anchor: new AMap.Pixel(6, 6),
            size: new AMap.Size(11, 11),
            zIndex: 3,
          },
          {
            url: 'https://webapi.amap.com/images/mass/mass1.png',
            anchor: new AMap.Pixel(4, 4),
            size: new AMap.Size(7, 7),
            zIndex: 2,
          },
          {
            url: 'https://webapi.amap.com/images/mass/mass2.png',
            anchor: new AMap.Pixel(3, 3),
            size: new AMap.Size(5, 5),
            zIndex: 1,
          },
        ];

        var mass = new AMap.MassMarks(citys, {
          opacity: 0.8,
          zIndex: 111,
          cursor: 'pointer',
          style: style,
        });
        var marker = new AMap.Marker({ content: ' ', map: this.map });

        mass.on('mouseover', function (e) {
          marker.setPosition(e.data.lnglat);
          marker.setLabel({ content: e.data.name });
        });

        mass.setMap(this.map);
        // mass.setStyle(style[2]);
        mass.setStyle(style);
      },
      MarkerMany() {
        this.map = new AMap.Map('container', {
          zoom: 15.8,
          center: [116.469881, 39.993599],
          showIndoorMap: false,
        });
        var markers = [];
        var allowCollision = false;
        var layer = new AMap.LabelsLayer({
          zooms: [3, 20],
          zIndex: 1000,
          // collision: false,
          // 设置 allowCollision：true，可以让标注避让用户的标注
          allowCollision,
        });
        layer.add(markers);
        // 图层添加到地图
        this.map.add(layer);
        // 初始化 labelMarker
        for (var i = 0; i < LabelsData.length; i++) {
          var curData = LabelsData[i];
          curData.extData = {
            index: i,
          };
          var labelMarker = new AMap.LabelMarker(curData);
          markers.push(labelMarker);
        }
        // 将 marker 添加到图层
        layer.add(markers);
        this.map.setFitView(null, false, [100, 150, 10, 10]);
      },
      MarkCustomMore() {
        this.map.clearMap();
        this.map = new AMap.Map('container', {
          viewMode: '3D',
          turboMode: false,
          showIndoorMap: false,
          defaultCursor: 'pointer',
          showBuildingBlock: false,
          zooms: [14, 20],
          showLabel: false,
          zoom: 16,
          pitch: 55,
          rotation: -45,
          center: [116.408967, 39.880101],
          forceVector: true,
        });
        var facilities = [];
        var zoomStyleMapping1 = {
          14: 0,
          15: 0,
          16: 0,
          17: 0,
          18: 0,
          19: 0,
          20: 0,
        };
        for (let i = 0; i < sheshi.length; i += 1) {
          var marker = new AMap.ElasticMarker({
            position: sheshi[i].position,
            zooms: [14, 20],
            styles: [
              {
                icon: {
                  img: sheshi[i].icon,
                  size: [16, 16], //可见区域的大小
                  anchor: 'bottom-center', //锚点
                  fitZoom: 14, //最合适的级别
                  scaleFactor: 2, //地图放大一级的缩放比例系数
                  maxScale: 1.4, //最大放大比例
                  minScale: 0.8, //最小放大比例
                },
              },
            ],
            zoomStyleMapping: zoomStyleMapping1,
          });
          facilities.push(marker);
        }
        this.map.add(facilities);

        var spots = [];
        var zoomStyleMapping2 = {
          14: 0,
          15: 0,
          16: 1,
          17: 1,
          18: 1,
          19: 1,
          20: 1,
        };
        for (let i = 0; i < touristSpots.length; i += 1) {
          let marker = new AMap.ElasticMarker({
            position: touristSpots[i].position,
            zooms: [14, 20],
            styles: [
              {
                icon: {
                  img: touristSpots[i].smallIcon,
                  size: [16, 16], //可见区域的大小
                  anchor: 'bottom-center', //锚点
                  fitZoom: 14, //最合适的级别
                  scaleFactor: 2, //地图放大一级的缩放比例系数
                  maxScale: 2, //最大放大比例
                  minScale: 1, //最小放大比例
                },
                label: {
                  content: touristSpots[i].name,
                  position: 'BM',
                  minZoom: 15,
                },
              },
              {
                icon: {
                  img: touristSpots[i].bigIcon,
                  size: touristSpots[i].size,
                  anchor: touristSpots[i].anchor,
                  fitZoom: 17.5,
                  scaleFactor: 2,
                  maxScale: 2,
                  minScale: 0.125,
                },
                label: {
                  content: touristSpots[i].name,
                  position: 'BM',
                },
              },
            ],
            zoomStyleMapping: zoomStyleMapping2,
          });
          spots.push(marker);
        }
        this.map.add(spots);
        //  树
        var trees = new AMap.ElasticMarker({
          position: [116.410908, 39.88057],
          zooms: [15.5, 20],
          styles: [
            {
              icon: {
                img: 'https://a.amap.com/jsapi_demos/static/resource/img/trees.png',
                size: [366, 201],
                anchor: 'center',
                imageSize: [865, 1156],
                imageOffset: [-44, -480],
                fitZoom: 17.5,
                scaleFactor: 2,
                maxScale: 2,
                minScale: 0.125,
              },
            },
          ],
          zoomStyleMapping: zoomStyleMapping1,
        });
        this.map.add(trees);

        new AMap.Polygon({
          cursor: 'pointer',
          bubble: true,
          path: [
            [116.419763, 39.882967],
            [116.419791, 39.882397],
            [116.419674, 39.882398],
            [116.419632, 39.882376],
            [116.419086, 39.882371],
            [116.41912, 39.88163],
            [116.41769, 39.881571],
            [116.417726, 39.880507],
            [116.417791, 39.879454],
            [116.417847, 39.878396],
            [116.417896, 39.87733],
            [116.418027, 39.874746],
            [116.418002, 39.874715],
            [116.417888, 39.874716],
            [116.417732, 39.874711],
            [116.417141, 39.874692],
            [116.416588, 39.874675],
            [116.415591, 39.874645],
            [116.413683, 39.874562],
            [116.413676, 39.874127],
            [116.412921, 39.874095],
            [116.41292, 39.874514],
            [116.412799, 39.874549],
            [116.412244, 39.874536],
            [116.411768, 39.874504],
            [116.411358, 39.874478],
            [116.410034, 39.874414],
            [116.408755, 39.874363],
            [116.408182, 39.874332],
            [116.407259, 39.87431],
            [116.406883, 39.8743],
            [116.406732, 39.877576],
            [116.406254, 39.877576],
            [116.405835, 39.877582],
            [116.40576, 39.877621],
            [116.40574, 39.878041],
            [116.405721, 39.878541],
            [116.404778, 39.878539],
            [116.404748, 39.878529],
            [116.404722, 39.87849],
            [116.404622, 39.878493],
            [116.403535, 39.878467],
            [116.402885, 39.878451],
            [116.402863, 39.879073],
            [116.403702, 39.879094],
            [116.404528, 39.879117],
            [116.404525, 39.879152],
            [116.404636, 39.879157],
            [116.405664, 39.879199],
            [116.405639, 39.879913],
            [116.405593, 39.880618],
            [116.404583, 39.880596],
            [116.404308, 39.880602],
            [116.403795, 39.880609],
            [116.403062, 39.880597],
            [116.402629, 39.880599],
            [116.40199, 39.88061],
            [116.401413, 39.880621],
            [116.400929, 39.880633],
            [116.400889, 39.880849],
            [116.400792, 39.880896],
            [116.400505, 39.880913],
            [116.400405, 39.880918],
            [116.400393, 39.88117],
            [116.400955, 39.881193],
            [116.40089, 39.881923],
            [116.400878, 39.882144],
            [116.400849, 39.882624],
            [116.400794, 39.883245],
            [116.400741, 39.883927],
            [116.400742, 39.884154],
            [116.401057, 39.885182],
            [116.400731, 39.885279],
            [116.400931, 39.885696],
            [116.401043, 39.885883],
            [116.40131, 39.886259],
            [116.401549, 39.886532],
            [116.401668, 39.88664],
            [116.403101, 39.886729],
            [116.403125, 39.886766],
            [116.403145, 39.886835],
            [116.403133, 39.886969],
            [116.403102, 39.887379],
            [116.403144, 39.88749],
            [116.403868, 39.88768],
            [116.404604, 39.887846],
            [116.40549, 39.887973],
            [116.406221, 39.888038],
            [116.40773, 39.888094],
            [116.409536, 39.888147],
            [116.411578, 39.888205],
            [116.413718, 39.888269],
            [116.414653, 39.888295],
            [116.415318, 39.888293],
            [116.41583, 39.888257],
            [116.416241, 39.888216],
            [116.416638, 39.88812],
            [116.416952, 39.88804],
            [116.417343, 39.887944],
            [116.417594, 39.887849],
            [116.417843, 39.887737],
            [116.41803, 39.887623],
            [116.418233, 39.887495],
            [116.418504, 39.887327],
            [116.418719, 39.887187],
            [116.418956, 39.887043],
            [116.419171, 39.886916],
            [116.419415, 39.886666],
            [116.419618, 39.886341],
            [116.42003, 39.885517],
            [116.420323, 39.884945],
            [116.420455, 39.88462],
            [116.420547, 39.884246],
            [116.420558, 39.883975],
            [116.420572, 39.883615],
            [116.420455, 39.883601],
            [116.419832, 39.883562],
            [116.419749, 39.883521],
            [116.41974, 39.88346],
            [116.419763, 39.882967],
          ],
          map: this.map,
          fillOpacity: 0.3,
          strokeWeight: 1,
          fillColor: 'green',
        });
      },
      MarkTrackPlayback2() {
        this.map.clearMap();
        var marker,
          lineArr = [
            [120.688644, 27.985382],
            [120.688624, 27.984782],
            [120.686344, 27.984774],
            [120.685204, 27.984777],
            [120.68519, 27.98694],
            [120.685196, 27.991604],
            [120.68443, 27.99498],
            [120.683216, 28.001296],
            [120.682371, 28.005684],
            [120.68266, 28.010347],
          ];
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: this.centerPoint,
          zoom: 19,
        });

        marker = new AMap.Marker({
          map: this.map,
          position: this.centerPoint,
          icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
          offset: new AMap.Pixel(-13, -26),
        });

        // 绘制轨迹
        new AMap.Polyline({
          map: this.map,
          path: lineArr,
          showDir: true,
          strokeColor: '#28F', //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6, //线宽
          // strokeStyle: "solid"  //线样式
        });
        var passedPolyline = new AMap.Polyline({
          map: this.map,
          strokeColor: '#AF5', //线颜色
          strokeWeight: 6, //线宽
        });
        marker.on('moving', (e) => {
          passedPolyline.setPath(e.passedPath);
          this.map.setCenter(e.target.getPosition(), true);
        });
        this.map.setFitView();

        const startAnimation = () => {
          marker.moveAlong(lineArr, {
            // 每一段的时长
            duration: 500, //可根据实际采集时间间隔设置
            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
            autoRotation: true,
          });
        };
        message.warn('2.5s 后开始轨迹回放');
        setTimeout(() => {
          startAnimation();
        }, 2500);
      },
      MarkTrackPlayback() {
        // JSAPI2.0 使用覆盖物动画必须先加载动画插件
        // AMap.plugin('AMap.MoveAnimation', () => {
        this.map.clearMap();
        var marker,
          lineArr = [
            [116.478935, 39.997761],
            [116.478939, 39.997825],
            [116.478912, 39.998549],
            [116.478912, 39.998549],
            [116.478998, 39.998555],
            [116.478998, 39.998555],
            [116.479282, 39.99856],
            [116.479658, 39.998528],
            [116.480151, 39.998453],
            [116.480784, 39.998302],
            [116.480784, 39.998302],
            [116.481149, 39.998184],
            [116.481573, 39.997997],
            [116.481863, 39.997846],
            [116.482072, 39.997718],
            [116.482362, 39.997718],
            [116.483633, 39.998935],
            [116.48367, 39.998968],
            [116.484648, 39.999861],
          ];
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 17,
        });

        marker = new AMap.Marker({
          map: this.map,
          position: [116.478935, 39.997761],
          icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
          offset: new AMap.Pixel(-13, -26),
        });

        // 绘制轨迹
        var polyline = new AMap.Polyline({
          map: this.map,
          path: lineArr,
          showDir: true,
          strokeColor: '#28F', //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6, //线宽
          // strokeStyle: "solid"  //线样式
        });
        var passedPolyline = new AMap.Polyline({
          map: this.map,
          strokeColor: '#AF5', //线颜色
          strokeWeight: 6, //线宽
        });
        marker.on('moving', (e) => {
          // console.log('_marker moving', e);
          passedPolyline.setPath(e.passedPath);
          this.map.setCenter(e.target.getPosition(), true);
        });
        this.map.setFitView();

        const startAnimation = () => {
          marker.moveAlong(lineArr, {
            // 每一段的时长
            duration: 500, //可根据实际采集时间间隔设置
            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
            autoRotation: true,
          });
        };
        message.warn('2.5s 后开始轨迹回放');
        setTimeout(() => {
          startAnimation();
        }, 2500);
        // });
      },
      MarkerDrag() {
        this.map.clearMap();
        var marker = new AMap.Marker({
          position: this.map.getCenter(),
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          offset: new AMap.Pixel(-13, -30),
          // 设置是否可以拖拽
          draggable: true,
          cursor: 'move',
        });
        marker.on('dragstart', (e) =>
          console.log('marker dragstart', e.lnglat.getLat(), e.lnglat.getLng()),
        );
        marker.on('dragend', (e) =>
          console.log('marker dragend', e.lnglat.getLat(), e.lnglat.getLng()),
        );
        this.map.add(marker);
      },
      MarkerDelete2() {
        this.map.clearMap(); //  清除覆盖物
        var positions = [
          [116.405467, 39.907761],
          [116.415467, 39.907761],
          [116.415467, 39.917761],
          [116.425467, 39.907761],
          [116.385467, 39.907761],
        ];

        for (var i = 0, marker; i < positions.length; i++) {
          marker = new AMap.Marker({
            map: this.map,
            icon:
              '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-' + (i + 1) + '.png',
            position: positions[i],
            anchor: 'bottom-center',
          });
          this.markers.push(marker);
        }
        this.map.setFitView();
        message.warn('2.5s 后删除指定多个标记点');
        setTimeout(() => {
          this.markers[0].setMap(null);
          this.markers[2].setMap(null);
        }, 2500);
      },
      MarkerDelete() {
        this.markers = [];
        var positions = [
          [116.405467, 39.907761],
          [116.415467, 39.907761],
          [116.415467, 39.917761],
          [116.425467, 39.907761],
          [116.385467, 39.907761],
        ];

        for (var i = 0, marker; i < positions.length; i++) {
          marker = new AMap.Marker({
            map: this.map,
            position: positions[i],
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            offset: new AMap.Pixel(-13, -30),
          });
          this.markers.push(marker);
        }
        this.map.setFitView();
        message.warn('2.5s 后删除多个标记点');
        setTimeout(() => {
          this.map.remove(this.markers);
        }, 2500);
      },
      Marker1() {
        this.map.clearMap(); //  清除覆盖物
        var markers = [
          {
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
            position: [116.205467, 39.907761],
          },
          {
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
            position: [116.368904, 39.913423],
          },
          {
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
            position: [116.305467, 39.807761],
          },
        ];
        markers.forEach((marker) => {
          new AMap.Marker({
            map: this.map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-13, -30),
          });
        });

        // 第一个参数为空，表明用图上所有覆盖物 setFitview
        // 第二个参数为false, 非立即执行
        // 第三个参数设置上左下右的空白
        this.map.setFitView(null, false, [150, 60, 100, 60]);
      },
      MarkerLabelSetting() {
        var marker = new AMap.Marker({
          position: this.map.getCenter(),
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          anchor: 'bottom-center',
          offset: new AMap.Pixel(0, 0),
        });
        marker.setMap(this.map);
        marker.setTitle('我是marker的title');
        // 设置label标签
        // label默认蓝框白底左上角显示，样式className为：amap-marker-label
        marker.setLabel({
          direction: 'right',
          offset: new AMap.Pixel(10, 0), //设置文本标注偏移量
          content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
        });
      },
      MarkerCustomContent() {
        // 点标记显示内容，HTML要素字符串
        var markerContent = `
          <div class="custom-content-marker" style="
            position: 'relative';
            width: '25px';
            height: '34px';
          ">
             <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
             <div class="close-btn" onclick="clearMarker()" style="
               position: 'absolute';
               top: '-6px';
               right: '-8px';
               width: '15px';
               height: '15px';
               font-size: '12px';
               background: '#ccc';
               border-radius: '50%';
               color: '#fff';
               text-align: 'center';
               line-height: '15px';
               box-shadow: '-1px 1px 1px rgba(10, 10, 10, .2)';
             ">X</div>
          </div>`;

        var marker = new AMap.Marker({
          position: this.centerPoint,
          // 将 html 传给 content
          content: markerContent,
          // 以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-13, -30),
        });

        // 将 markers 添加到地图
        this.map.add(marker);
      },
      MarkerCircle() {
        for (var i = 0; i < capitals.length; i += 1) {
          var center = capitals[i].center;
          var circleMarker = new AMap.CircleMarker({
            center: center,
            radius: 10 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
            strokeColor: 'white',
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: 'rgba(0,0,255,1)',
            fillOpacity: 0.5,
            zIndex: 10,
            bubble: true,
            cursor: 'pointer',
            clickable: true,
          });
          this.map.setZoom(5);
          circleMarker.setMap(this.map);
        }
      },
      MarkerCustomIcon() {
        // 创建一个起点Icon
        var startIcon = new AMap.Icon({
          size: new AMap.Size(25, 34), // 图标尺寸
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png', // 图标的取图地址
          imageSize: new AMap.Size(135, 40), // 图标所用图片大小
          // 设置了 icon 以后，设置 icon 的偏移量，以 icon 的 [center bottom] 为原点
          imageOffset: new AMap.Pixel(-9, -3), // 图标取图偏移量
        });
        // 将 icon 传入 marker
        var startMarker = new AMap.Marker({
          position: this.centerPoint,
          icon: startIcon,
          offset: new AMap.Pixel(-13, -30),
        });
        // 创建一个结束icon
        var endIcon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
          imageSize: new AMap.Size(135, 40),
          imageOffset: new AMap.Pixel(-95, -3),
        });
        // 将 icon 传入 marker
        var endMarker = new AMap.Marker({
          position: new AMap.LngLat(120.688637, 27.984791),
          icon: endIcon,
          offset: new AMap.Pixel(-13, -30),
        });

        // 将 markers 添加到地图
        this.map.add([startMarker, endMarker]);
      },
      addUpdateMarkerText() {
        var text = new AMap.Text({
          text: '我的家!',
          anchor: 'center', // 设置文本标记锚点
          draggable: true,
          cursor: 'pointer',
          angle: 10,
          style: {
            padding: '.75rem 1.25rem',
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'white',
            width: '15rem',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '20px',
            color: 'blue',
          },
          position: this.centerPoint,
        });
        text.setMap(this.map);
      },
      addUpdateMarker(type = 'add') {
        var addMarker = () => {
          this.addUpdateMarkerCurr = new AMap.Marker({
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            position: this.centerPoint,
            offset: new AMap.Pixel(-13, -30),
          });
          this.addUpdateMarkerCurr.setMap(this.map);
        };

        var updateMarker = () => {
          if (!this.addUpdateMarkerCurr) return;
          // 自定义点标记内容
          var markerContent = document.createElement('div');
          // 点标记中的图标
          var markerImg = document.createElement('img');
          markerImg.className = 'markerlnglat';
          markerImg.src = '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png';
          markerImg.setAttribute('width', '25px');
          markerImg.setAttribute('height', '34px');
          markerContent.appendChild(markerImg);
          // 点标记中的文本
          var markerSpan = document.createElement('span');
          markerSpan.className = 'marker';
          markerSpan.innerHTML = 'Hi，我被更新啦！';
          markerContent.appendChild(markerSpan);
          this.addUpdateMarkerCurr.setContent(markerContent);
          this.addUpdateMarkerCurr.setPosition([120.687678, 27.985876]); //更新点标记位置
        };

        if (type === 'add') {
          addMarker();
        } else if (type === 'update') {
          updateMarker();
        }
      },
      getAllOverlays(type = 'marker') {
        var info = {
          marker: '点标记',
          polyline: '线',
          polygon: '面',
        };
        // 获取当 marker 类型的覆盖物
        var overlays = this.map.getAllOverlays(type);
        console.log('_overlays', overlays);
        var position = type == 'marker' ? overlays[0].getPosition() : overlays[0].getPath()[0];
        var infoWindow = new AMap.InfoWindow({
          position: position,
          offset: type == 'marker' ? new AMap.Pixel(0, -35) : new AMap.Pixel(0, -5),
          content: `<div>已获取${info[type]}覆盖物</div> `,
        });
        infoWindow.open(this.map);
      },
      removeSeveralOverlayButton() {
        const severlObj = this.severlObj;
        this.map.remove([severlObj.marker, severlObj.polyline, severlObj.polygon]);
      },
      addSeveralOverlayButton() {
        let severlObj = {};
        var marker;
        var polyline;
        var polygon;
        //  创建点覆盖物
        severlObj.marker = new AMap.Marker({
          position: new AMap.LngLat(120.688279, 27.985355),
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          offset: new AMap.Pixel(-13, -30),
        });

        // 创建线覆盖物
        var polylinePath = [
          new AMap.LngLat(120.688279, 27.985355),
          new AMap.LngLat(120.688606, 27.984811),
        ];
        severlObj.polyline = new AMap.Polyline({
          path: polylinePath,
        });

        //  创建区域覆盖物
        var polygonPath = [
          new AMap.LngLat(120.687731, 27.985886),
          new AMap.LngLat(120.687696, 27.984774),
          new AMap.LngLat(120.688599, 27.984801),
          new AMap.LngLat(120.688576, 27.985933),
        ];
        severlObj.polygon = new AMap.Polygon({
          path: polygonPath,
        });
        this.map.add(severlObj.marker);
        this.map.add(severlObj.polyline);
        this.map.add(severlObj.polygon);
        this.severlObj = severlObj;
      },
      setFitView() {
        // 创建两个点标记
        var m1 = new AMap.Marker({
          position: [116.49, 39.9],
        });
        var m2 = new AMap.Marker({
          position: [116.29, 39.9],
        });
        var m3 = new AMap.Marker({
          position: [116.69, 39.9],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
        });
        this.map.add(m1);
        this.map.add(m2);
        this.map.add(m3);
        // this.map.setFitView([m1, m2]); //  有参数时, 自动适配到指定视野范围
        this.map.setFitView();
      },
      moregpstransfer() {
        // var lnglats = ['116.368904,39.913423', '116.398258,39.904600'];
        // 创建绘线
        var path = [new AMap.LngLat(120.687755, 27.985874), new AMap.LngLat(120.688591, 27.985133)];
        var polyline = new AMap.Polyline({
          path: path,
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: 'red', // 线条颜色
          lineJoin: 'round', // 折线拐点连接处样式
        });
        this.map.add(polyline);
        var text1 = new AMap.Text({
          position: new AMap.LngLat(120.687755, 27.985874),
          text: 'gps坐标',
          offset: new AMap.Pixel(-20, -20),
        });
        this.map.add(text1);
        var polyline2;
        var text2;
        const convertFrom = (path, type = 'gps') => {
          AMap.convertFrom(path, type, (status, result) => {
            if (result.info === 'ok') {
              var path2 = result.locations;
              polyline2 = new AMap.Polyline({
                path: path2,
                borderWeight: 2, // 线条宽度，默认为 1
                strokeColor: 'blue', // 线条颜色
                lineJoin: 'round', // 折线拐点连接处样式
              });
              this.map.add(polyline2);
              text2 = new AMap.Text({
                position: result.locations[0],
                text: '高德坐标',
                offset: new AMap.Pixel(-20, -20),
              });
              this.map.add(text2);
            }
          });
        };
        convertFrom(path, 'gps');
      },
      gpstransfer() {
        // 创建gps坐标位置点标记
        var lnglat = [120.688279, 27.985355];
        var m1 = new AMap.Marker({
          position: lnglat,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
        });
        this.map.add(m1);
        m1.setLabel({
          offset: new AMap.Pixel(20, 20),
          content: 'GPS 坐标系前网路',
        });
        var m2;
        const convertFrom = (lnglat, type) => {
          AMap.convertFrom(lnglat, type, (status, result) => {
            console.log('_result', result);
            if (result.info === 'ok') {
              var resLnglat = result.locations[0];
              m2 = new AMap.Marker({
                position: resLnglat,
              });
              this.map.add(m2);
              // 设置标签
              m2.setLabel({
                offset: new AMap.Pixel(20, 20),
                content: '高德坐标系前网路（正确）',
              });
            }
          });
        };
        convertFrom(lnglat, 'gps'); //  gps转高德
        // convertFrom(lnglat, 'baidu'); //  百度转高德
        // convertFrom(lnglat, 'tuba'); //  图吧转高德
      },
      indoor() {
        var indoorMap = new AMap.IndoorMap();
        this.map.setLayers([indoorMap, AMap.createDefaultLayer()]);
        indoorMap.showIndoorMap('B000A9VHIG');
        // indoorMap.showIndoorMap(true);
      },
      hotspotover() {
        /** 地图热点 star*/
        var placeSearch = new AMap.PlaceSearch(); //构造地点查询类
        var infoWindow = new AMap.InfoWindow({});
        this.map.on('hotspotover', function (result) {
          placeSearch.getDetails(result.id, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              placeSearch_CallBack(result);
            }
          });
        });
        const placeSearch_CallBack = (data) => {
          var poiArr = data.poiList.pois;
          var location = poiArr[0].location;
          infoWindow.setContent(createContent(poiArr[0]));
          infoWindow.open(this.map, location);
        };
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
      },
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
          // showIndoorMap: true, //  隐藏地图自带的室内地图
          zoom: this.zoom, //  级别
          center: this.centerPoint, // 中心点
          isHotspot: true,
          //前往创建自定义地图样式：https://lbs.amap.com/dev/mapstyle/index
          // mapStyle: 'amap://styles/08539321a17cd7c322f76950f2c68b3f',
        });

        //  放大缩小工具
        map.addControl(new AMap.ToolBar());
        // map.addControl(
        //   new AMap.ControlBar({
        //     position: {
        //       top: '10px',
        //       right: '10px',
        //     },
        //   }),
        // );
        // map.addControl(
        //   new AMap.HawkEye({
        //     opened: false,
        //   }),
        // );
        // map.addControl(new AMap.Scale());

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
    min-height: 50vh;
  }

  #list {
    position: fixed;
    top: 100px;
    right: 100px;
    width: 280px;
    height: 45vh;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
