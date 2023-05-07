<template>
  <a-modal v-model:visible="modalShow" title="地址选择" width="1000px">
    <div id="mapcontrol" v-loading="maploading"></div>
    <div class="info">
      <div class="input-item">
        <a-input
          size="small"
          id="tipinput"
          type="text"
          v-model="tipinputValue"
          placeholder="搜索地点"
          style="width: 120px"
        />
      </div>
    </div>
    <template #footer>
      <a-input
        disabled
        placeholder="请搜索选择位置"
        :value="formData.address"
        style="margin-bottom: 12px"
      />
      <a-button @click="modalShow = false">取消</a-button>
      <a-button type="primary" @click="handleConfirm"> 确定 </a-button>
    </template>
  </a-modal>
</template>

<script>
  import AMapLoader from '@amap/amap-jsapi-loader';

  var AMap;
  export default {
    data() {
      return {
        modalShow: false,
        maploading: true,
        type: '',
        tipinputValue: '',
        formData: {},
      };
    },
    mounted() {
      // 明文设置 secret
      // https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode
      window._AMapSecurityConfig = {
        securityJsCode: '472cb71bf261c059c56a73ea71324cb7',
      };
    },
    methods: {
      handleConfirm() {
        const formData = this.formData;
        this.$emit('confirm', formData);
        this.modalShow = false;
      },
      init({ type, distance, address, lng, lat }) {
        console.log('_init type: ', type, '_distance', distance, ' _lng', lng, ' _lat', lat);
        this.formData = {
          address,
          lng,
          lat,
        };
        this.modalShow = true;
        AMapLoader.reset(); // 重置,解决多种sdk方式调用的报错
        AMapLoader.load({
          key: 'ccc60be0df40131454501ae4f8fca05f', // 申请好的Web端开发者Key，首次调用 load 时必填
          version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: [
            'AMap.AutoComplete',
            'AMap.PlaceSearch',
            'AMap.Geocoder',
            // "AMap.Geolocation", // 定位
          ],
        })
          .then((Map) => {
            AMap = Map;
            this.initMap();
            this.maploading = false;
          })
          .catch((error) => {
            console.log('_Load error', error);
          });
      },
      initMap() {
        var _this = this;
        this.map = new AMap.Map('mapcontrol', {
          zoom: 17, //初始化地图级别
          center: [120.699279, 27.993849], //初始化地图中心点位置
        });

        var marker; // 初始化 marker
        var infoWindow = new AMap.InfoWindow({
          autoMove: true,
          offset: { x: 0, y: -30 },
        });

        // 地图点击 * 1
        this.map.on('click', async (e) => {
          clearMarker();
          const position = new AMap.LngLat(e.lnglat.getLng(), e.lnglat.getLat());
          marker = new AMap.Marker({
            map: _this.map,
            position,
            draggable: true,
          });
          _this.map.setCenter(marker.getPosition());
          await regeoCode([e.lnglat.getLng(), e.lnglat.getLat()]);
          markerDragendRegister();
          openWindow();
        });

        //  已设置, 初始化位置 * 2
        if (this.formData.address) {
          const position = new AMap.LngLat(_this.formData.lng, _this.formData.lat);
          clearMarker();
          marker = new AMap.Marker({
            map: this.map,
            position: position,
            draggable: true,
          });
          this.map.setCenter(marker.getPosition());
          markerDragendRegister();
          openWindow();
        }

        var autoComplete = new AMap.Autocomplete({
          input: 'tipinput',
          datatype: 'poi', //  检索 poi
          city: '全国',
        });
        // 监听autoComplete选择 * 3
        autoComplete.on('select', async ({ poi, type }) => {
          // console.log('_autoComplete select', poi);
          const position = new AMap.LngLat(poi.location.getLng(), poi.location.getLat());
          clearMarker();
          marker = new AMap.Marker({
            map: _this.map,
            position,
            draggable: true,
          });
          _this.map.setCenter(marker.getPosition());
          markerDragendRegister();
          await regeoCode([poi.location.getLng(), poi.location.getLat()]);
          openWindow();

          // _this.formData = {
          //   address: `${poi.district}${poi.address}`,
          //   lng: poi.location.getLng(),
          //   lat: poi.location.getLat(),
          //   adcode: poi.adcode,
          // };
          // autoCompleteSelectMarker(poi);
        });
        autoComplete.on('complete', (res) => {
          console.log('_autoComplete.on complete', res);
        });
        autoComplete.on('error', (res) => {
          console.error('_autoComplete.on error', res);
        });
        /** autoComplete 选择后创建marker & 窗口信息*/
        // function autoCompleteSelectMarker(poi) {
        //   clearMarker();
        //   // 设置marker
        //   marker = new AMap.Marker({
        //     map: _this.map,
        //     position: poi.location,
        //     draggable: true,
        //   });
        //   _this.map.setCenter(marker.getPosition());
        //   infoWindow.setContent(createContent(poi));
        //   infoWindow.open(_this.map, marker.getPosition());
        //   // 点位拖动结束监听
        //   markerDragendRegister();
        // }
        // function createContent(poi) {
        //   //信息窗体内容
        //   var s = [];
        //   poi.name && s.push('<b>名称：' + poi.name + '</b>');
        //   poi.district && s.push('地区：' + poi.district);
        //   s.push('地址：' + poi.address);
        //   poi.id && s.push('ID: ' + poi.id);
        //   s.push(`位置 [${poi.location.getLng()}, ${poi.location.getLat()}]`);
        //   return s.join('<br>');
        // }

        /** marker拖动事件*/
        async function markerDragend(data) {
          _this.map.setCenter(marker.getPosition());
          const lnglat = data.lnglat;
          await regeoCode([lnglat.getLng(), lnglat.getLat()]);
          openWindow();
        }
        /** 根据经纬度逆推地理信息并赋值设置*/
        function regeoCode(lnglat) {
          return new Promise((resolve, reject) => {
            var geocoder = new AMap.Geocoder();
            geocoder.getAddress(lnglat, function (status, result) {
              // console.log('_geocoder.getAddress', status, result);
              if (status === 'complete' && result.regeocode) {
                _this.formData = {
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
        /** 清除标记点*/
        function clearMarker() {
          if (marker) {
            //  清除 marker
            marker.setMap(null);
            marker = null;
          }
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
        /** marker 拖动监听*/
        function markerDragendRegister() {
          marker.off('dragend', markerDragend); //  取消监听
          marker.on('dragend', markerDragend); // 监听
        }
      },
      resetData() {
        this.formData = {
          lng: '',
          lat: '',
          address: '',
          adCode: '',
        };
      },
    },
  };
</script>
<style lang="scss" scoped>
  #mapcontrol {
    position: relative;
    width: 100%;
    height: 450px;
  }
  .info {
    position: absolute;
    left: 20px;
    top: 80px;
    width: 250px;
  }
</style>
