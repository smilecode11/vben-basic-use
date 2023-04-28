import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, InputSearch } from 'ant-design-vue';
import VXETable from 'vxe-table';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(InputSearch).use(Layout).use(VXETable);
}
