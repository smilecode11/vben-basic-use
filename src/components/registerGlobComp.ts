import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, InputSearch, Modal } from 'ant-design-vue';
import VXETable from 'vxe-table';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(InputSearch).use(Layout).use(VXETable).use(Modal);
}
