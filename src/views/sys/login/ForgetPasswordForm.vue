<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
          :sendCodeApi="handleSendCode"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, message } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { useUserStore } from '/@/store/modules/user';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState, setLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const userStore = useUserStore();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    mobile: '',
    sms: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

  //  发送验证码
  const handleSendCode = async () => {
    if (!formData.mobile || !formData.account) {
      message.warning('请检查账号和手机号');
      return false;
    } else {
      const result = await userStore.sendSmsCodeAction({
        account: formData.account,
        mobile: formData.mobile,
      });
      if (result?.smsCode) {
        message.success('验证码已发送, 请注意查收');
        return true;
      }
    }
  };

  const { validForm } = useFormValid(formRef);

  //  重置密码
  async function handleReset() {
    const data = await validForm();
    if (!data) return;
    const form = unref(formRef);
    if (!form) return;
    const result = await userStore.resetPassword({
      account: data.account,
      mobile: data.mobile,
      sms: data.sms,
    });
    if (result?.account) {
      message.success('重置密码成功');
      await form.resetFields();
      setLoginState(LoginStateEnum.LOGIN);
    }
  }
</script>
