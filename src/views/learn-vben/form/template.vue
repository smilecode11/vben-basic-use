<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title> <BasicTitle :span="true">template 方式</BasicTitle> </template>
    <template #headerContent>表单组件</template>
    <div class="main">
      <!-- <BasicForm
        :schemas="schemas"
        ref="formElRef"
        :labelWidth="80"
        @submit="handleSubmit"
        :actionColOptions="{ span: 24 }"
      /> -->

      <a-input type="text" placeholder="Basic usage" v-model:value="address">
        <template #prefix>
          <EnvironmentOutlined />
        </template>
        <template #suffix>
          <ExpandOutlined />
        </template>
      </a-input>
      <a-input type="text" placeholder="Basic usage" v-model:value="lng" />
      <a-input type="text" placeholder="Basic usage" v-model:value="lat" />
      <a-button @click="handleShowAddress">选择地址</a-button>
      <SearchAddress ref="searchAddressRef" @confirm="onSearchAddressConfirm" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';
  // import { BasicForm, FormSchema, FormActionType, FormProps } from '/@/components/Form';
  import SearchAddress from '/@/views/map/advanced/components/SearchAddress.vue';
  import { EnvironmentOutlined, ExpandOutlined } from '@ant-design/icons-vue';

  // const schemas: FormSchema[] = [
  //   {
  //     field: 'nickname',
  //     component: 'Input',
  //     label: '昵称',
  //     colProps: {
  //       span: 8,
  //     },
  //     defaultValue: 'smiling',
  //     componentProps: {
  //       placeholder: '浙江第一深情',
  //       onChange: (e) => {
  //         console.log('field onchange', e);
  //       },
  //     },
  //   },
  // ];

  export default defineComponent({
    components: {
      PageWrapper,
      // BasicForm,
      BasicTitle,
      SearchAddress,
      EnvironmentOutlined,
      ExpandOutlined,
    },
    setup() {
      // const formElRef = ref<null | FormActionType>(null);
      const searchAddressRef = ref<any>(null);
      const positionData = reactive({
        lng: '',
        lat: '',
        address: '',
      });

      return {
        ...toRefs(positionData),
        // schemas,
        // formElRef,
        searchAddressRef,
        handleShowAddress: () => {
          searchAddressRef.value.init({
            address: positionData.address,
            lng: positionData.lng,
            lat: positionData.lat,
          });
        },
        onSearchAddressConfirm: ({ address, lng, lat }) => {
          positionData.address = address;
          positionData.lng = lng;
          positionData.lat = lat;
        },
        handleSubmit: (values: any) => {
          console.log('_handleSubmit', values);
        },
        // setProps(props: FormProps) {
        //   console.log('_setProps', props);
        //   const formEl = formElRef.value;
        //   if (!formEl) return;
        //   formEl.setProps(props);
        // },
      };
    },
  });
</script>

<style lang="scss" scoped>
  .main {
    padding: 16px;
  }
</style>
