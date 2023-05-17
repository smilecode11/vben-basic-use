import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const learnVben: AppRouteModule = {
  path: '/learn-vben',
  name: 'LearnVben',
  component: LAYOUT,
  redirect: '/learn-vben/basic',
  meta: {
    orderNo: 2000,
    icon: 'ant-design:fund-projection-screen-outlined',
    title: 'LearnVben',
  },
  children: [
    {
      path: 'authority',
      name: 'LearnVbenAuthority',
      meta: {
        title: 'LearnVbenAuthority',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/learn-vben/authority/index.vue'),
    },
    {
      path: 'page',
      name: 'LearnVbenPage',
      meta: {
        title: 'LearnVbenPage',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/learn-vben/page/index.vue'),
    },
  ],
};

export default learnVben;
