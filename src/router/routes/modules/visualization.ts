import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const visualization: AppRouteModule = {
  path: '/visualization',
  name: 'Visualization',
  component: LAYOUT,
  redirect: '/visualization/large-screen',
  meta: {
    orderNo: 2000,
    icon: 'ant-design:fund-projection-screen-outlined',
    title: '可视化',
  },
  children: [
    {
      path: 'large-screen',
      name: 'VisualizationLargeScreen',
      meta: {
        title: '数据大屏',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/visualization/large-screen/index.vue'),
    },
    {
      path: 'large-screen-demos',
      name: 'VisualizationLargeScreenDemos',
      meta: {
        hideMenu: false,
        title: '数据大屏(demo)',
        ignoreKeepAlive: true,
        showMenu: true,
      },
      component: () => LAYOUT,
      children: [
        {
          path: 'demo1',
          name: 'VisualizationLargeScreenDemo1',
          meta: {
            title: 'demo1',
          },
          component: () => import('/@/views/visualization/large-screen/demos/demo1.vue'),
        },
        {
          path: 'demo2',
          name: 'VisualizationLargeScreenDemo2',
          meta: {
            title: 'demo2',
          },
          component: () => import('/@/views/visualization/large-screen/demos/demo2.vue'),
        },
      ],
    },
  ],
};

export default visualization;
