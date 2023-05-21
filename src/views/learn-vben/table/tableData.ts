import { h } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '@/components/Table';

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
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: 220,
  },
];
