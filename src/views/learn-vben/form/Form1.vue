<template>
  <BasicForm @register="register" @submit="handleSubmitByForm1" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { form1Schema } from './index.data';

  export default defineComponent({
    components: { BasicForm },
    setup() {
      const [register, { validate }] = useForm({
        labelWidth: '100px',
        schemas: form1Schema,
        baseColProps: { span: 24 },
      });

      const handleSubmitByForm1 = async (values: any) => {
        console.log('_handleSubmitByForm1', values);
        // 校验表单
        const _values = await validate();
        console.log('_values', _values);
      };
      return {
        register,
        handleSubmitByForm1,
      };
    },
  });
</script>
