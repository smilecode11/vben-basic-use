import { FormSchema } from '/@/components/Table';

export const formSchema: FormSchema[] = [
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
  },
  {
    field: 'pass',
    label: '密码',
    component: 'InputPassword',
  },
  {
    field: 'address',
    label: '地址',
    component: 'Input',
    slot: 'address',
  },
  {
    field: 'lng',
    label: '经度',
    component: 'Input',
    show: false,
  },
  {
    field: 'lat',
    label: '纬度',
    component: 'Input',
    show: false,
  },
];
