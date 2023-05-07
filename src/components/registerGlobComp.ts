import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout, Modal, Form } from 'ant-design-vue';
import VXETable from 'vxe-table';

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Button)
    .use(Input.Search)
    .use(Layout)
    .use(VXETable)
    .use(Modal)
    .use(Form)
    .use(Form.Item);
}
