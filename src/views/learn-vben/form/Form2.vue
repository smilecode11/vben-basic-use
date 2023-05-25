<template>
  <BasicForm @register="registerForm" @submit="handleSubmitByForm2" style="max-width: 450px">
    <template #addressSelect="{ model, field }">
      <a-input v-model:value="model[field]" disabled>
        <!-- <template #prefix>😄</template> -->
        <template #suffix>
          <a-button
            size="small"
            type="primary"
            style="display: flex; align-items: center"
            @click="handleShowAddress"
          >
            <EnvironmentOutlined />
            选择地址
          </a-button>
        </template>
      </a-input>
    </template>
  </BasicForm>
  <SearchAddress ref="searchAddressRef" @confirm="onSearchAddressConfirm" />
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, reactive } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { EnvironmentOutlined } from '@ant-design/icons-vue';
  import SearchAddress from '/@/views/map/advanced/components/SearchAddress.vue';
  import { form2Schema } from './index.data';

  export default defineComponent({
    components: { BasicForm, EnvironmentOutlined, SearchAddress },
    setup() {
      const [registerForm, { setFieldsValue }] = useForm({
        labelWidth: '100px',
        labelAlign: 'left',
        schemas: form2Schema,
        baseColProps: { span: 24 },
        submitButtonOptions: {
          text: '保存',
        },
        actionColOptions: {
          span: 24,
          style: 'justify-content: flex-start',
        },
      });

      // 表单初始化赋值
      const initFormData = () => {
        setFieldsValue({
          activityName: '',
          activityType: '1',
        });
      };

      onMounted(async () => {
        initFormData();
      });

      const handleSubmitByForm2 = async (values: any) => {
        console.log('_handleSubmitByForm2', values);
      };

      const searchAddressRef = ref<any>(null);
      const positionData = reactive({
        lng: '',
        lat: '',
        address: '',
      });
      return {
        registerForm,
        handleSubmitByForm2,
        // 位置
        onSearchAddressConfirm: (data) => {
          const { address, lng, lat } = data;
          // 属性赋值
          positionData.address = address;
          positionData.lng = lng;
          positionData.lat = lat;
          //  表单赋值
          setFieldsValue({
            address: address,
            lng: lng,
            lat: lat,
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
