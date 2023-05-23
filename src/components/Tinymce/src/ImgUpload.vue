<template>
  <div :class="[prefixCls, { fullscreen }]">
    <Upload
      name="file"
      multiple
      @change="handleChange"
      :action="uploadUrl"
      :showUploadList="false"
      accept=".jpg,.jpeg,.gif,.png,.webp"
      :headers="headers"
    >
      <a-button type="primary" v-bind="{ ...getButtonProps }">
        {{ t('component.upload.imgUpload') }}
      </a-button>
    </Upload>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';

  import { Upload } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getToken } from '/@/utils/auth';

  export default defineComponent({
    name: 'TinymceImageUpload',
    components: { Upload },
    props: {
      fullscreen: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['uploading', 'done', 'error'],
    setup(props, { emit }) {
      let uploading = false;
      // 上传设置 headers
      const headers = {
        Authorization: `Bearer ${getToken()}`,
      };

      const { uploadUrl } = useGlobSetting();
      const { t } = useI18n();
      const { prefixCls } = useDesign('tinymce-img-upload');

      const getButtonProps = computed(() => {
        const { disabled } = props;
        return {
          disabled,
        };
      });

      function handleChange(info: Record<string, any>) {
        console.log('_handleChange', info);
        const file = info.file;
        const status = file?.status;
        // TIP: 根据服务端返回修改图片地址
        // const url = file?.response?.url;
        const url = file?.response?.data?.url;
        const name = file?.name;

        if (status === 'uploading') {
          if (!uploading) {
            emit('uploading', name);
            uploading = true;
          }
        } else if (status === 'done') {
          emit('done', name, url);
          uploading = false;
        } else if (status === 'error') {
          emit('error');
          uploading = false;
        }
      }

      return {
        headers,
        prefixCls,
        handleChange,
        uploadUrl,
        t,
        getButtonProps,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-tinymce-img-upload';

  .@{prefix-cls} {
    position: absolute;
    z-index: 20;
    top: 4px;
    right: 10px;

    &.fullscreen {
      position: fixed;
      z-index: 10000;
    }
  }
</style>
