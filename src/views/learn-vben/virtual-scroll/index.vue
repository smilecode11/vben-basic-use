<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>VScroll</template>
    <template #headerContent>虚拟滚动组件</template>

    <div class="main">
      <div class="virtual-scroll-demo-wrap">
        <VScroll :item-height="41" :items="data" :height="300">
          <template #default="{ item }">
            <div class="virtual-scroll-demo__item">{{ item.title }}</div>
          </template>
        </VScroll>
      </div>
      <Divider>即使不可见，也预先加载50条数据，防止空白(列表项右键菜单生效中)</Divider>
      <div class="virtual-scroll-demo-wrap">
        <VScroll :itemHeight="41" :items="data" :height="300" :bench="50">
          <template #default="{ item }">
            <div
              class="virtual-scroll-demo__item"
              @contextmenu="(ev) => onItemContextmenuClick(ev, item)"
            >
              {{ item.title }}
            </div>
          </template>
        </VScroll>
      </div>
      <div class="p-4">
        <Alert message="有预览图" type="info" />
        <div class="flex justify-center mt-4">
          <img
            :src="img"
            v-for="img in imgList"
            :key="img"
            class="mr-2"
            @click="handleClick(img)"
          />
        </div>
        <Alert message="无预览图" type="info" />
        <a-button @click="handlePreview" type="primary" class="mt-4">预览图片(函数式组件)</a-button>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { VScroll } from '/@/components/VirtualScroll';
  import { Divider, Alert } from 'ant-design-vue';
  import { useContextMenu } from '/@/hooks/web/useContextMenu';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { createImgPreview } from '/@/components/Preview/index';

  const data: any[] = (() => {
    const arr: any[] = [];
    for (let i = 0; i < 2000; i++) {
      arr.push({
        title: `列表项目${i}`,
      });
    }
    return arr;
  })();

  const imgList: string[] = [
    'https://picsum.photos/id/66/346/216',
    'https://picsum.photos/id/67/346/216',
    'https://picsum.photos/id/68/346/216',
  ];

  export default defineComponent({
    components: {
      PageWrapper,
      VScroll,
      Divider,
      Alert,
    },
    setup() {
      // 右键菜单
      const [createContextMenu] = useContextMenu();
      const { createMessage } = useMessage();
      function onItemContextmenuClick(ev: MouseEvent, data?: any) {
        console.log('_onItemContextmenuClick', ev, data);
        createContextMenu({
          event: ev,
          items: [
            {
              label: 'New',
              icon: 'ant-design:plus-outlined',
              handler: () => {
                createMessage.success('click new');
              },
            },
            {
              label: 'Open',
              icon: 'ant-design:folder-open-filled',
              handler: () => {
                createMessage.success('click open');
              },
            },
          ],
        });
      }

      // 图片预览

      function handleClick(img: string) {
        createImgPreview({ imageList: [img] });
      }

      function handlePreview() {
        createImgPreview({ imageList: imgList });
      }

      return {
        data,
        onItemContextmenuClick,
        handleClick,
        imgList,
        handlePreview,
      };
    },
  });
</script>

<style scoped lang="scss">
  .main {
    padding: 16px;
  }
  .virtual-scroll-demo {
    &-wrap {
      display: flex;
      // margin: 0 30%;
      background: #fff;
      justify-content: center;
    }

    ::v-deep &__item {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
    }
  }
</style>
