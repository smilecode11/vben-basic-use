import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const test: AppRouteModule = {
  path: '/test',
  name: 'TestControl',
  component: LAYOUT,
  redirect: '/test/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '测试路由', //t('routes.dashboard.test'),
    // hideChildrenInMenu: true,
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'TestControlPage',
      component: () => import('@/views/sys/test/index.vue'),
      meta: {
        title: '新增路由', //t('routes.dashboard.test'),
        icon: 'simple-icons:about-dot-me',
        // TIP: 如何让一个页面不缓存 设置为 true 则当前路由忽略缓存, 全局开启 keepAlive 时, 默认是缓存页面的
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default test;
