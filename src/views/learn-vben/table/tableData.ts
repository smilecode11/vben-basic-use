import { h } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '@/components/Table';

export type GetBasicDataProps = () => {
  items: any[];
  total: number;
};

export const getBasicData: GetBasicDataProps = () => ({
  items: [],
  total: 0,
});

type GetBasicColumns = () => BasicColumn[];
export const getBasicColumns: GetBasicColumns = () => [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
    helpMessage: ['菜单名'],
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 60,
    customRender: ({ record }) => {
      const enable = record.status === '0';
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 220,
  },
  {
    title: '更新时间',
    dataIndex: 'updateAt',
    width: 220,
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '是否缓存',
    dataIndex: 'keepalive',
    width: 220,
    edit: true,
    editComponent: 'Input',
    editComponentProps: {
      placeholder: '是否缓存?',
    },
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: 220,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];
