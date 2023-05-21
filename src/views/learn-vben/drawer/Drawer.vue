<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    @ok="handleSubmit"
    title="Drawer Title"
    width="50%"
    showFooter
  >
    <BasicForm @register="registerForm">
      <!-- 位置选择 -->
      <template #address="{ model, field }">
        <a-input v-model:value="model[field]">
          <template #prefix>😄</template>
          <template #suffix>
            <EnvironmentOutlined @click="handleShowAddress" />
          </template>
        </a-input>
      </template>
    </BasicForm>
    <SearchAddress ref="searchAddressRef" @confirm="onSearchAddressConfirm" />

    <!-- <a-button @click="closeDrawer">内部关闭drawer</a-button> -->
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form';
  import { EnvironmentOutlined } from '@ant-design/icons-vue';
  import SearchAddress from '/@/views/map/advanced/components/SearchAddress.vue';
  import { formSchema } from './drawer.data';

  export default defineComponent({
    components: {
      BasicDrawer,
      BasicForm,
      SearchAddress,
      EnvironmentOutlined,
    },
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const searchAddressRef = ref<any>(null);
      const positionData = reactive({
        lng: '',
        lat: '',
        address: '',
      });

      const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
        showActionButtonGroup: false, //  不显示 form操作按钮组
        labelWidth: '80px',
        schemas: formSchema,
        baseColProps: { lg: 12, md: 24 },
      });

      // callback param data -> 父组件传递的属性
      const [registerDrawer, { closeDrawer, setDrawerProps }] = useDrawerInner((data) => {
        console.log('_data', data);
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          //  编辑时赋值
          setFieldsValue({
            ...data.record,
          });
        } else {
          //  新增
        }
      });

      // changeOkLoading 修改确定按钮的 loading 状态
      // changeLoading 修改 modal 的 loading 状态
      // setDrawerProps({ confirmLoading: false }); 设置 drawerProps

      async function handleSubmit() {
        console.log('_handleSubmit');
        try {
          setDrawerProps({ confirmLoading: true });
          const values = await validate();
          console.log('_values', values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        closeDrawer,
        handleSubmit,
        registerForm,
        // 地址相关
        onSearchAddressConfirm: (data) => {
          setFieldsValue({
            address: data.address,
            lng: data.lng,
            lat: data.lat,
          });
        },
        searchAddressRef,
        handleShowAddress: () => {
          searchAddressRef.value.init({
            address: positionData.address,
            lng: positionData.lng,
            lat: positionData.lat,
          });
        },
      };
    },
  });
</script>

<style lang="scss" scoped></style>
