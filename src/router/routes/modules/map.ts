import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const map: AppRouteModule = {
  path: '/map',
  name: 'Map',
  component: LAYOUT,
  redirect: '/map/basic',
  meta: {
    orderNo: 99,
    title: '地图 learn',
    icon: 'ant-design:heat-map-outlined',
  },
  children: [
    {
      path: 'basic',
      name: 'MapBasic',
      component: () => import('/@/views/map/basic/index.vue'),
      meta: {
        title: '基础',
      },
    },
    {
      path: 'advanced',
      name: 'MapAdvanced',
      component: () => import('/@/views/map/advanced/index.vue'),
      meta: {
        title: '基础',
      },
    },
  ],
};

export default map;
