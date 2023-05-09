import AMapLoader from '@amap/amap-jsapi-loader';

/**
 * @description Amapload
 */
export const AMapload = () => {
  // 明文设置secret
  // https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode
  (window as any)._AMapSecurityConfig = {
    securityJsCode: '472cb71bf261c059c56a73ea71324cb7',
  };

  (AMapLoader as any).reset(); // 重置,解决多种sdk调用方式报错
  return AMapLoader.load({
    key: 'ccc60be0df40131454501ae4f8fca05f', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MouseTool'], // 插件列表, https://lbs.amap.com/api/javascript-api-v2/guide/abc/plugins-list
  });
  // 错误码, https://lbs.amap.com/api/javascript-api-v2/guide/abc/errorcode
};
