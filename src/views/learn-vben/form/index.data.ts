import { FormSchema } from '/@/components/Form/index';

export const form1Schema: FormSchema[] = [
  {
    field: 'activityName',
    label: '活动名称',
    component: 'Input',
    componentProps: {
      placeholder: '输入活动名称',
    },
  },
  {
    field: 'activityType',
    label: '活动类型',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '赛事',
          value: '1',
        },
        {
          label: '党建',
          value: '2',
        },
        {
          label: '协会',
          value: '3',
        },
      ],
    },
  },
];

export const form2Schema: FormSchema[] = [
  {
    field: 'activityName',
    label: '活动名称',
    component: 'Input',
    componentProps: {
      placeholder: '输入活动名称',
    },
  },
  {
    field: 'activityType',
    label: '活动类型',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '赛事',
          value: '1',
        },
        {
          label: '党建',
          value: '2',
        },
      ],
      default: '1',
    },
  },
  {
    field: 'activityTime',
    label: '活动时间',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      'show-time': { format: 'HH:mm' },
    },
    ifShow: ({ values }) => {
      return values.activityType === '1';
    },
  },
  {
    field: 'address',
    label: '活动地址',
    component: 'Input',
    slot: 'addressSelect',
  },
  {
    field: 'lat',
    label: '纬度',
    component: 'Input',
    show: false,
  },
  {
    field: 'lng',
    label: '经度',
    component: 'Input',
    show: false,
  },
];
