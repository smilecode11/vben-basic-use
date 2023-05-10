<template>
  <a-modal v-model:visible="modalShow" title="经纬度获取" width="1400px">
    <div id="mapgetlnglat" v-loading="maploading"></div>
    <div class="info">
      <div class="input-item">
        <a-input
          size="small"
          id="tipinput"
          type="text"
          v-model="tipinputValue"
          placeholder="搜索地点"
          allowClear
        />
      </div>
    </div>
    <div class="opera">
      <a-button @click="resetMap">重置地图</a-button>
      <a-divider orientation="center" />
      <a-button @click="drawLineGetLng">线段绘制获取经纬度</a-button>
    </div>
    <template #footer>
      <a-button @click="modalShow = false">关闭</a-button>
      <a-button type="primary" @click="handleConfirm"> 确定 </a-button>
    </template>
  </a-modal>
</template>

<script>
  import AMapLoader from '@amap/amap-jsapi-loader';
  import { message, Divider, Modal } from 'ant-design-vue';

  var AMap;
  export default {
    components: {
      ADivider: Divider,
    },
    data() {
      return {
        type: 'line', //  操作类型
        tipinputValue: '',
        modalShow: false,
        maploading: true,
      };
    },
    mounted() {
      // 明文设置code https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode
      window._AMapSecurityConfig = {
        securityJsCode: '472cb71bf261c059c56a73ea71324cb7',
      };
    },
    methods: {
      init() {
        this.openModal();
        this.maploading = true;

        AMapLoader.reset(); // 重置,解决多种sdk方式调用的报错
        AMapLoader.load({
          key: 'ccc60be0df40131454501ae4f8fca05f',
          version: '2.0',
          plugins: ['AMap.AutoComplete', 'AMap.Geocoder', 'AMap.MouseTool'],
        })
          .then((Map) => {
            console.log('_map');
            AMap = Map;
            this.initMap();

            this.maploading = false; //  地图加载完成
          })
          .catch((error) => {
            console.error('_Load error', error);
          });
      },
      initMap() {
        var _this = this;
        this.map = new AMap.Map('mapgetlnglat', {
          zoom: 17, //初始化地图级别
          center: [120.699279, 27.993849], //初始化地图中心点位置
        });

        var marker; // 初始化 marker
        var infoWindow = new AMap.InfoWindow({
          autoMove: true,
          offset: { x: 0, y: -30 },
        });
        var autoComplete = new AMap.Autocomplete({
          input: 'tipinput',
          datatype: 'poi',
          city: '全国',
        });
        // 监听autoComplete选择 * 3
        autoComplete.on('select', async ({ poi, type }) => {
          const lnglat = new AMap.LngLat(poi.location.getLng(), poi.location.getLat());
          createMarker(lnglat);
          markerDragendRegister();
          await regeoCode([lnglat.getLng(), lnglat.getLat()]);
          openWindow();
        });
        autoComplete.on('complete', (res) => {
          // console.log('_autoComplete.on complete', res);
        });
        autoComplete.on('error', (res) => {
          message.error(res.info);
        });
        /** marker 拖动监听*/
        function markerDragendRegister() {
          marker.off('dragend', markerDragend); //  取消监听
          marker.on('dragend', markerDragend); // 监听
        }
        function regeoCode(lnglat) {
          return new Promise((resolve, reject) => {
            var geocoder = new AMap.Geocoder();
            geocoder.getAddress(lnglat, function (status, result) {
              if (status === 'complete' && result.regeocode) {
                _this.formData = {
                  ..._this.formData,
                  lng: lnglat[0],
                  lat: lnglat[1],
                  address: result.regeocode.formattedAddress,
                  adcode: result.regeocode.addressComponent.adcode,
                };
                resolve(result.regeocode);
              } else {
                reject('根据经纬度查询地址失败');
                // console.error('根据经纬度查询地址失败');
              }
            });
          });
        }
        /** marker拖动事件*/
        async function markerDragend(data) {
          _this.map.setCenter(marker.getPosition());
          const lnglat = data.lnglat;
          await regeoCode([lnglat.getLng(), lnglat.getLat()]);
          openWindow();
        }
        /** 打开窗口信息*/
        function openWindow() {
          infoWindow.close();
          infoWindow.setContent(
            [
              '地址: ' + _this.formData.address,
              '经纬度: [' + _this.formData.lng + ', ' + _this.formData.lat + ']',
            ].join('<br>'),
          );
          infoWindow.open(_this.map, marker.getPosition());
        }
        /** 创建标记点*/
        function createMarker(lnglat) {
          clearMarker();
          marker = new AMap.Marker({
            map: _this.map,
            position: lnglat,
            draggable: true,
          });
          _this.map.setCenter(marker.getPosition());
        }
        /** 清除标记点*/
        function clearMarker() {
          if (marker) {
            marker.setMap(null);
            marker = null;
          }
        }
        return {};
      },
      resetMap() {
        this.map.destroy();
        this.initMap();
        message.warning('地图重置');
      },
      drawLineGetLng() {
        console.log('_drawLineGetLng');
        const _this = this;
        var mouseTool = new AMap.MouseTool(_this.map);
        drawPolyline();
        function drawPolyline() {
          mouseTool.polyline({
            strokeColor: '#3366FF',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            // 线样式还支持 'dashed'
            strokeStyle: 'solid',
            // strokeStyle是dashed时有效
            // strokeDasharray: [10, 5],
          });
        }
        //  GCJ-02坐标 为 [默认]腾讯、google、高德坐标，且国内只能用02坐标
        //  将高德腾讯(GCJ－02) 转为百度(bd-09) 坐标系
        function mapPointTxTurnBaiDu(dataLon, dataLat) {
          // console.log('_mapPointTxTurnBaiDu', dataLon, dataLat);
          let lat;
          let lng;
          // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
          let x_pi = 3.14159265358979324;
          let x = dataLon,
            y = dataLat;
          let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
          let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
          lng = z * Math.cos(theta) + 0.0065;
          lat = z * Math.sin(theta) + 0.006;
          return { lng, lat };
        }
        mouseTool.on('draw', function (ev) {
          const paths = ev.obj.getPath();
          const lnglatArr = paths.map((path) => ({
            lng: path.getLng(),
            lat: path.getLat(),
          }));

          _this.formData = {
            ..._this.formData,
            lnglatArr,
          };
          Modal.confirm({
            title: () => '高德/腾讯(GCJ－02)经纬度数据',
            content: () => `${JSON.stringify(lnglatArr)}`,
            okText: () => 'OK',
            okType: 'warning',
            width: '650px',
            cancelText: () => '转为百度',
            onOk() {
              console.log('GCJ-02');
              console.log(lnglatArr);
            },
            onCancel(done) {
              const baidu_lnglatArr = lnglatArr.map((lnglat) => {
                return mapPointTxTurnBaiDu(lnglat.lng, lnglat.lat);
              });
              Modal.confirm({
                title: () => '百度(bd-09)经纬度',
                content: () => `${JSON.stringify(baidu_lnglatArr)}`,
                okText: () => 'OK',
                okType: 'primary',
                width: '600px',
                cancelText: () => 'close',
                onOk() {
                  console.log('bd-09');
                  console.log(baidu_lnglatArr);
                },
              });
              // 如此声明不会关闭 modal
              done;
            },
            closable: false,
          });
        });
      },
      setType(type) {
        this.type = type;
      },
      handleConfirm() {
        const formData = this.formData;
        this.$emit('confirm', formData);
        this.closeModal();
      },
      openModal() {
        this.modalShow = true;
      },
      closeModal() {
        this.modalShow = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  #mapgetlnglat {
    position: relative;
    width: 100%;
    height: 650px;
  }
  .info {
    position: absolute;
    left: 20px;
    top: 80px;
    width: 150px;
    min-width: 150px;
  }
  .opera {
    position: absolute;
    right: 20px;
    top: 80px;
    padding: 12px 0;
    width: 180px;
    height: 70%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .settings {
    padding: 16px 22px;
    .ant-form-item {
      margin-bottom: 0;
    }
  }
</style>
