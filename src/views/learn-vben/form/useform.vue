<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title><BasicTitle :span="true">useForm 方式</BasicTitle></template>
    <template #headerContent>表单组件</template>
    <div class="main">
      <BasicForm :schemas="schemas" @register="register" @submit="handleSubmit">
        <template #customSlot="{ model, field }">
          <a-input v-model:value="model[field]" />
        </template>
        <template #formHeader> 表单顶部插槽 </template>
        <template #formFooter> 表单底部插槽 </template>
      </BasicForm>
      <SearchAddress ref="searchAddressRef" @confirm="onSearchAddressConfirm" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  /** FormSchema
   *    field 字段名
   *    label 标签名
   *    labelWidth 标签宽度, 覆盖统一设置的 labelWidth
   *    subLabel 二级标签
   *    suffix 组件后面内容
   *    helpMessage 标签右侧温馨提示
   *    helpComponentProps 标签右侧温馨提示 props
   *    changeEvent 表单更新事件名 *
   *    component 组件类型 *
   *         'Input'| 'InputGroup'| 'InputPassword'| 'InputSearch'| 'InputTextArea'| 'InputNumber'| 'InputCountDown'| 'Select'| 'ApiSelect'| 'TreeSelect'| 'RadioButtonGroup'| 'RadioGroup'| 'Checkbox'| 'CheckboxGroup'| 'AutoComplete'| 'Cascader'| 'DatePicker'| 'MonthPicker'| 'RangePicker'| 'WeekPicker'| 'TimePicker'| 'Switch'| 'StrengthMeter'| 'Upload'| 'IconPicker'| 'Render'| 'Slider'| 'Rate'| 'Divider';  // v2.7.2新增
   *          * 需要自行添加组件 https://doc.vvbin.cn/components/form.html#%E8%87%AA%E8%A1%8C%E6%B7%BB%E5%8A%A0%E9%9C%80%E8%A6%81%E7%9A%84%E7%BB%84%E4%BB%B6%E7%B1%BB%E5%9E%8B
   *    componentProps 所渲染组件的 props *
   *    rules 检验规则 *
   *    required 简化检验规则 为 true时 则转化成 [{required:true}]
   *    rulesMessageJoinLabel 检验规则是否加入 label
   *    itemProps
   *    defaultValue 渲染组件初始值
   *    render 自定义渲染组件 * (renderCallbackParams: RenderCallbackParams) => VNode / VNode[] / string
   *        export interface RenderCallbackParams {
   *          schema: FormSchema;
   *          values: any;
   *          model: any;
   *          field: string;
   *        }
   *    renderColContent 自定义渲染组件(包含formItem)
   *    renderComponentContent 自定义渲染组件内部slot
   *    slot 自定义 slot 渲染组件
   *    colSlot 自定义 slot 渲染组件(包含 formItem)
   *    show 判断当前组件是否显示(css 控制，不会删除 dom) *
   *    ifShow 动态判断当前组件是否显示，js 控制，会删除 dom *
   *    dynamicDisabled 动态判断组件是否禁用
   */
  import { defineComponent, h, ref, reactive, toRefs, getCurrentInstance } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { Input as AntdInput } from 'ant-design-vue';
  import { EnvironmentOutlined } from '@ant-design/icons-vue';
  import SearchAddress from '/@/views/map/advanced/components/SearchAddress.vue';

  const schemas: FormSchema[] = [
    {
      field: 'nickname',
      label: '昵称',
      subLabel: '(大侠尊姓大名)',
      labelWidth: '120',
      suffix: '😂😂',
      component: 'Input',
      defaultValue: 'smiling',
      // changeEvent: 'change',
      helpMessage: ['大侠你好'],
      required: true,
      rulesMessageJoinLabel: true,
      componentProps: {
        placeholder: '浙江第一深情',
        onChange: (e) => {
          console.log('field onchange', e);
        },
      },
    },
    {
      field: 'password',
      component: 'InputPassword',
      label: '密码',
      defaultValue: '123456',
      componentProps: {},
    },
    {
      field: 'render',
      label: 'render渲染组件',
      labelWidth: '140',
      component: 'Input',
      render: ({ model, field, values }) => {
        console.log('_render', model, field, values);
        // schema 当前字段
        // model 当前表单数据 { fieldName: fieldValue }
        // field 当前字段名
        // values 表示scheme 所有数据, 包括整个表单配置 mergeDynamicData
        return h(AntdInput, {
          placeholder: '请输入',
          value: model[field] || model['asname'], // 值绑定, 可以实现有值使用当前值, 无值使用其他值代替
          onChange: (e) => {
            model[field] = e.target.value;
          },
        });
      },
    },
    {
      field: 'asname',
      label: '别名',
      suffix: '😄',
      component: 'Input',
      defaultValue: 'develop',
      // required: true,
      // rulesMessageJoinLabel: true,
      componentProps: {
        placeholder: '浙江第一帅',
        onChange: (e) => {
          console.log('field onchange', e);
        },
      },
    },
    {
      field: 'asname233',
      label: '别名233',
      suffix: '😄',
      component: 'Input',
      helpMessage: ['温馨提示', 'tm520'],
      helpComponentProps: {
        // showIndex: true,
        // color: 'red',
        fontSize: '18px',
        icon: '😄',
      },
      defaultValue: 'asname233',
      componentProps: ({ formActionType, formModel }) => {
        return {
          // xxxx props
          onChange: () => {
            console.log('_formActionType', formActionType);
            // 重置
            // const { reload } = tableAction;
            // reload();
            // or
            // 添加其他属性
            formModel['otherVai'] = '123';
          },
        };
      },
    },
    {
      field: 'RangePicker',
      label: 'RangePicker',
      component: 'RangePicker',
      labelWidth: '120px',
    },
    {
      field: 'time',
      label: 'time',
      component: 'RangePicker',
      componentProps: {
        placeholder: ['开始时间', '结束时间'],
        format: 'hh:mm:ss',
        valueFormat: 'hh:mm:ss',
        picker: 'time',
      },
    },
    {
      field: 'year',
      label: 'year',
      component: 'DatePicker',
      required: true,
      componentProps: {
        placeholder: 'Please select year',
        format: 'YYYY',
        valueFormat: 'YYYY',
        picker: 'year', //  picker 属性
        style: {
          width: '100%',
        },
        disabled: false,
      },
      defaultValue: '2022',
    },
    {
      field: 'year2',
      label: 'year2',
      component: 'RangePicker',
      componentProps: {
        placeholder: ['开始年份', '结束年份'],
        picker: 'year',
        valueFormat: 'YYYY',
        defaultValue: ['2009', '2022'],
      },
      dynamicDisabled: ({ values }) => {
        console.log(values.year);
        return !!values.year;
      },
    },
    {
      field: 'InputCountDown',
      label: 'InputCountDown',
      component: 'InputCountDown',
      labelWidth: '120px',
    },
    {
      field: 'InputSearch',
      label: 'InputSearch',
      component: 'InputSearch',
      labelWidth: '120px',
    },
    {
      field: 'TimePicker',
      label: 'TimePicker',
      component: 'TimePicker',
      labelWidth: '120px',
    },
    {
      field: 'StrengthMeter',
      label: 'StrengthMeter',
      component: 'StrengthMeter',
      labelWidth: '120px',
    },
    {
      field: 'Switch',
      label: 'Switch',
      component: 'Switch',
      labelWidth: '120px',
    },
    {
      field: 'customSlot',
      label: 'customSlot',
      component: 'Input',
      slot: 'customSlot',
    },
    {
      field: 'address',
      label: 'address',
      component: 'Input',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(AntdInput, {
          placeholder: '请输入',
          value: model[field],
          onChange: (e) => {
            model[field] = e.target.value;
          },
        });
      },
      // ifShow判断, js 处理节点
      ifShow: ({ values }) => {
        console.log(values);
        return values.renderComponentContent;
      },
    },
    {
      field: 'renderComponentContent',
      label: 'renderComponentContent',
      labelWidth: '200px',
      component: 'Input',
      rules: [{ required: true, message: '请选择地址' }],
      componentProps: {
        placeholder: '请输入内容',
      },
      // 渲染组件内容
      renderComponentContent: ({ values }) => {
        return {
          prefix: () => '位置:',
          suffix: h(EnvironmentOutlined, {
            onClick() {
              console.log('TODO: 位置选择', values);
              const _this = getCurrentInstance() as any;
              _this.handleShowAddress();
            },
          }),
        };
      },
    },
    {
      field: 'field',
      component: 'ApiSelect',
      label: '字段',
    },
    {
      field: 'RadioButtonGroup',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          {
            label: '滴滴',
            value: '11',
          },
          {
            label: '滴滴2',
            value: '22',
            disabled: false,
          },
          {
            label: '滴滴3',
            value: '33',
            disabled: true,
          },
        ],
      },
      label: '字段',
    },
    {
      field: 'RadioGroup233',
      label: '单选',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '滴滴',
            value: '11',
          },
          {
            label: '滴滴2',
            value: '22',
            disabled: false,
          },
          {
            label: '滴滴3',
            value: '33',
            disabled: true,
          },
        ],
      },
    },
    {
      field: 'CheckboxGroup',
      label: '多选',
      component: 'CheckboxGroup',
      componentProps: {
        options: [
          {
            label: '滴滴',
            value: '1',
          },
          {
            label: '滴滴2',
            value: '2',
            disabled: false,
          },
          {
            label: '滴滴3',
            value: '33',
            disabled: true,
          },
        ],
      },
      // CheckboxGroup
    },
  ];

  export default defineComponent({
    components: {
      PageWrapper,
      BasicForm,
      BasicTitle,
      SearchAddress,
    },
    setup() {
      // register 用于注册 useForm，如果需要使用 useForm 提供的 api，必须将 register 传入组件的 onRegister
      // 参数 props 内的值可以是 computed 或者 ref 类型
      const searchAddressRef = ref<any>(null);
      const positionData = reactive({
        lng: '',
        lat: '',
        address: '',
      });

      const [register, { setProps }] = useForm({
        labelWidth: 80,
        schemas,
        actionColOptions: {
          span: 24,
        },
        // 额外传递到子组件的参数 values
        mergeDynamicData: {
          anthorVari: 124,
        },
        compact: true, // 紧凑类型表单, 减少 margin-bottom
        size: 'large', //  表单size
        // showActionButtonGroup: false, // 是否展示操作[重置|提交]按钮, 默认 true
        // showResetButton: true, // 是否展示重置
        // resetButtonOptions: {}, // 重置配置
        // resetFunc: () => Promise.resolve(), // 自定义重置逻辑
        // showSubmitButton: true, // 是否展示提交
        // submitButtonOptions: {}, // 提交配置
        // submitFunc: () => Promise.resolve(), //  自定义提交逻辑
        // fieldMapToTime: [
        //   // 将表单内时间区域的值映射成 2 个字段, 格式参考 moment
        //   ['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD'],
        //   ['datetime1', ['startTime1', 'endTime1'], 'YYYY-MM-DD HH:mm:ss'],
        // ],
      });

      return {
        register,
        setProps,
        schemas,
        handleSubmit: (values: any) => {
          console.log('_handleSubmit', values);
        },
        onSearchAddressConfirm: (data) => {
          console.log('_onSearchAddressConfirm', data);
        },
        searchAddressRef,
        handleShowAddress: () => {
          searchAddressRef.value.init({
            address: positionData.address,
            lng: positionData.lng,
            lat: positionData.lat,
          });
        },
        ...toRefs(positionData),
      };
    },
  });
</script>

<style lang="scss" scoped>
  .main {
    padding: 16px;
  }
</style>
