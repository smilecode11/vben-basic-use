<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>Qrcode</template>
    <template #headerContent>二维码生成</template>

    <div class="main">
      <QrCode
        :value="qrCodeUrl"
        :logo="logoType"
        :options="qrOptions"
        @done="ondown"
        @error="onerror"
      />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { QrCode, QrCodeActionType, QrcodeDoneEventParams } from '/@/components/Qrcode/index';
  import LogoImg from '/@/assets/images/logo.png';

  const qrCodeUrl = 'https://www.baidu.com';

  export default defineComponent({
    components: {
      PageWrapper,
      QrCode,
    },
    setup() {
      const qrRef = ref<Nullable<QrCodeActionType>>(null);
      const download = () => {
        const qrEl = unref(qrRef);
        if (!qrEl) return;
        qrEl.download('我的二维码.png');
      };

      return {
        qrRef,
        download,
        ondown: ({ ctx }: QrcodeDoneEventParams) => {
          console.log('_绘制完成');
          if (ctx instanceof CanvasRenderingContext2D) {
            // 额外绘制
            ctx.fillStyle = 'red';
            ctx.font = '16px "微软雅黑"';
            ctx.textBaseline = 'bottom';
            ctx.textAlign = 'center';
            ctx.fillText('你帅你先扫', 100, 195, 200);
          }
        },
        onerror: (error) => {
          console.log('_绘制失败', error);
        },
        qrCodeUrl,
        LogoImg,
        logoType: {
          // logo图片
          src: LogoImg,
          // logo大小
          logoSize: 0.3,
          // 背景颜色
          // bgColor: string,
          // logo圆角
          logoRadius: 0.1,
        },
        qrOptions: {
          margin: 2, //  默认 4
          scale: 4, //  默认 4
          width: 200,
          color: {
            dark: '#000000ff',
            light: '#ffffff',
          },
        },
      };
    },
  });
</script>

<style scoped lang="scss">
  .main {
    padding: 12px;
  }
</style>
