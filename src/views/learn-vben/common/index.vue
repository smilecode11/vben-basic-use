<template>
  <PageWrapper contentBackground contentFullHeight>
    <template #title>常用组件</template>
    <template #headerContent>common components</template>
    <div class="main">
      <BasicTitle :span="true">操作按钮</BasicTitle>
      <PopConfirmButton
        okText="确定"
        cencelText="取消"
        icon="none"
        title="Are you sure delete this task?"
        @confirm="confirmByPopConfirmButton"
        @cancel="cancelByPopConfirmButton"
      >
        提示按钮
      </PopConfirmButton>
      <BasicTitle :span="true">区域折叠卡片容器</BasicTitle>
      <CollapseContainer
        title="区域折叠卡片容器"
        :helpMessage="['区域折叠', '隐藏非必要显示内容']"
        :loading="false"
        :triggerWindowResize="true"
      >
        <template #title>区域折叠卡片</template>
        content
      </CollapseContainer>
      <BasicTitle :span="true">滚动容器</BasicTitle>
      <div class="my-4">
        <a-button @click="scrollTo(100)">滚动到100px位置</a-button>
        <a-button @click="scrollTo(800)">滚动到800px位置</a-button>
        <a-button @click="scrollTo(0)">滚动到顶部</a-button>
        <a-button @click="scrollBottom()">滚动到底部</a-button>
      </div>
      <div class="scroll-wrap">
        <ScrollContainer ref="scrollContainerRef">
          <ul>
            <li v-for="(item, index) in 100" :key="index">{{ item }}</li>
          </ul>
        </ScrollContainer>
      </div>
      <BasicTitle span>代码编辑器 - Coder Edit</BasicTitle>
      <CodeEditor v-model:value="codeEditorValue" :mode="codeEditorMode" />
      <BasicTitle span>json 预览 - JsonPreview</BasicTitle>
      <JsonPreview :data="codeEditorValue" />
      <BasicTitle span>倒计时</BasicTitle>
      <CountButton />
      <!-- sendCodeApi -->
      <!-- <CountdownInput /> -->
      <BasicTitle span>数字动画 - CountTo</BasicTitle>
      <CountTo prefix="💰" :color="'#409EFF'" :startVal="1" :endVal="200000" :duration="8000" />
      <BasicTitle span>图片裁切 - Cropper</BasicTitle>
      <CropperImage
        ref="refCropper"
        :src="cropperImgUrl"
        @cropend="handleCropend"
        style="width: 40vw"
        :options="cropperOptions"
      />
      <CropperAvatar :value="avatar" :uploadApi="uploadImage" @change="onAvatarChange" />
      <BasicTitle span>Description</BasicTitle>
      <Description
        title="description 基础"
        :collapseOptions="{ canExpand: true, helpMessage: ['help me'] }"
        :column="3"
        :data="mockData"
        :schema="schema"
      />
      <Description @register="register" class="mt-4" />
      <BasicTitle span>Upload</BasicTitle>
      <!-- 
        :api="({ file, name }) => uploadImage({ file, name, type: 'uploadComponent' })"
       -->
      <BasicUpload
        @change="onUploadChange"
        @delete="onUploadDelete"
        :maxSize="20"
        :maxNumber="10"
        :value="uploadData"
        :api="uploadImage"
      />
      <BasicTitle span>Tree</BasicTitle>
      <BasicTree ref="basicTreeRef" :treeData="treeData" :rightMenuList="rightMenuListByTree" />
      <BasicTitle span>Loading</BasicTitle>
      <a-button class="my-4 mr-4" type="primary" @click="openCompFullLoading">
        全屏 Loading
      </a-button>
      <a-button class="my-4" type="primary" @click="openCompAbsolute">容器内 Loading</a-button>
      <Loading :loading="loading" :absolute="absolute" :tip="tip" />
      <BasicTitle span>相对时间组件</BasicTitle>
      <div>
        <Time :value="time" /><br />
        <Time mode="date" :value="time" /><br />
        <Time mode="datetime" :value="time" />
      </div>
      <BasicTitle span>拖动校验组件</BasicTitle>
      <BasicDragVerify @success="onVerifySuccess" circle ref="basicDragVerifyRef" />
      <RotateDragVerify
        :src="rotateDragImage"
        ref="rotateDragVerifyRef"
        @success="onRotateVerifySuccess"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, reactive, toRefs } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTitle } from '/@/components/Basic';
  import { PopConfirmButton } from '/@/components/Button';
  import {
    CollapseContainer,
    ScrollActionType,
    ScrollContainer,
  } from '/@/components/Container/index';
  import { CodeEditor, JsonPreview } from '/@/components/CodeEditor';
  import { CountButton /* , CountdownInput */ } from '/@/components/CountDown';
  import { CountTo } from '/@/components/CountTo';
  import { CropperImage, CropperAvatar } from '/@/components/Cropper';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { BasicUpload } from '/@/components/Upload';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';
  import { Loading } from '/@/components/Loading';
  import { Time } from '/@/components/Time';
  import {
    BasicDragVerify,
    DragVerifyActionType,
    PassingData,
    RotateDragVerify,
  } from '/@/components/Verify/index';
  import { message as antdMessage } from 'ant-design-vue';

  import { uploadImage } from '/@/api/utils';

  import rotateDragImage from '/@/assets/images/header.jpg';

  const cropperImgUrl = '/@/assets/images/demo.png';
  const mockData: any = {
    username: 'test',
    nickName: 'VB',
    age: 123,
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema: DescItem[] = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];

  export const treeData: TreeItem[] = [
    {
      title: 'parent1',
      key: '0-0',
      icon: 'home|svg',
      children: [
        {
          title: 'leaf',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '1-1',
      icon: 'home|svg',
      children: [
        { title: 'leaf', key: '1-1-0' },
        { title: 'leaf', key: '1-1-1' },
      ],
    },
  ];

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTitle,
      PopConfirmButton,
      CollapseContainer,
      ScrollContainer,
      CodeEditor,
      JsonPreview,
      CountButton,
      // CountdownInput,
      CountTo,
      CropperImage,
      CropperAvatar,
      Description,
      BasicUpload,
      BasicTree,
      Loading,
      Time,
      BasicDragVerify,
      RotateDragVerify,
    },
    setup() {
      //  ScrollContainer
      const scrollContainerRef = ref<Nullable<ScrollActionType>>(null);
      const getScroll = () => {
        const scroll = unref(scrollContainerRef);
        if (!scroll) throw new Error('scroll is Null');
        return scroll;
      };
      function scrollTo(top: number) {
        getScroll()?.scrollTo(top);
      }
      function scrollBottom() {
        getScroll()?.scrollBottom();
      }

      //  代码编辑器
      let codeEditorValue = ref('');
      const codeEditorMode: 'htmlmixed' | 'javascript' | 'application/json' = 'application/json';

      //  倒计时
      const countdownValue = ref('');

      // 图片裁切
      const info = ref('');
      const cropperImg = ref('');
      const cropperOptions = {
        aspectRatio: 16 / 9,
        zoomable: true,
        zoomOnTouch: true,
        zoomOnWheel: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: true,
        autoCrop: true,
        background: true,
        highlight: true,
        center: true,
        responsive: true,
        restore: true,
        checkCrossOrigin: true,
        checkOrientation: true,
        scalable: true,
        modal: true,
        guides: true,
        movable: true,
        rotatable: true,
      };
      function handleCropend({ imgBase64, imgInfo }) {
        info.value = imgInfo;
        cropperImg.value = imgBase64;
      }
      const avatar = ref('');
      const onAvatarChange = (value) => {
        console.log('_onAvatarChange', value);
        avatar.value = value.data;
      };

      // Description
      const [register] = useDescription({
        title: 'useDescription',
        data: mockData,
        schema: schema,
        useCollapse: true,
      });

      // Upload
      const uploadData = ref([]);
      const onUploadChange = (list: string[]) => {
        console.log('_onUploadChange', list);
      };
      const onUploadDelete = (record) => {
        console.log('_onUploadDelete', record);
      };

      // Tree
      const basicTreeRef = ref<Nullable<TreeActionType>>(null);

      // loading
      const compState = reactive({
        absolute: false,
        loading: false,
        tip: '加载中',
      });
      const openLoading = (absolute: boolean) => {
        compState.absolute = absolute;
        compState.loading = true;
        setTimeout(() => {
          compState.loading = false;
        }, 2000);
      };
      function openCompFullLoading() {
        openLoading(false);
      }
      function openCompAbsolute() {
        openLoading(true);
      }

      // 相对时间
      const now = new Date().getTime();
      const timeState = reactive({
        time: now - 60 * 3 * 1000,
      });

      // 拖动验证
      const basicDragVerifyRef = ref<null | DragVerifyActionType>(null);
      function onVerifySuccess(data: PassingData) {
        console.log('_onVerifySuccess', data);
        const { time } = data;
        antdMessage.success(`验证成功, 耗时${time}s, 2s 后还原!`);
        setTimeout(() => {
          basicDragVerifyRef.value?.resume();
        }, 2000);
      }
      const rotateDragVerifyRef = ref<null | DragVerifyActionType>(null);
      function onRotateVerifySuccess(data: PassingData) {
        console.log('_onRotateVerifySuccess', data);
        const { time } = data;
        antdMessage.success(`验证成功, 耗时${time}s, 2s 后还原!`);
        setTimeout(() => {
          rotateDragVerifyRef.value?.resume();
        }, 2000);
      }

      return {
        //  PopConfirmButton
        confirmByPopConfirmButton() {
          console.log('confirmByPopConfirmButton handler');
        },
        cancelByPopConfirmButton() {
          console.log('cancelByPopConfirmButton handler');
        },
        //  ScrollContainer
        scrollContainerRef,
        getScroll,
        scrollTo,
        scrollBottom,
        //  代码编辑
        codeEditorValue,
        codeEditorMode,
        // 倒计时
        countdownValue,
        // 图片裁切
        handleCropend,
        cropperImgUrl,
        cropperOptions,
        avatar,
        onAvatarChange,
        uploadImage,
        // Description
        mockData,
        schema,
        register,
        // Upload
        uploadData,
        onUploadChange,
        onUploadDelete,
        // Tree
        treeData,
        rightMenuListByTree: [
          {
            label: '展开所有',
            handler: (...arg) => {
              console.log('_handler', arg);
              basicTreeRef.value?.expandAll(true);
            },
          },
          {
            label: '右键菜单 2',
            handler: () => {
              console.log('_handler');
            },
          },
        ],
        basicTreeRef,
        // loading
        openCompFullLoading,
        openCompAbsolute,
        ...toRefs(compState),
        now,
        ...toRefs(timeState),
        // 拖动验证
        basicDragVerifyRef,
        onVerifySuccess,
        rotateDragImage,
        rotateDragVerifyRef,
        onRotateVerifySuccess,
      };
    },
  });
</script>

<style scoped lang="scss">
  .main {
    padding: 16px;
  }
  .scroll-wrap {
    width: 50%;
    height: 300px;
    background: #fff;
    border: 1px solid #f2f2f2;
  }

  .lazy-base-demo {
    &-wrap {
      display: flex;
      width: 50%;
      height: 2000px;
      margin: 20px auto;
      text-align: center;
      background: #fff;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      height: 1300px;
      margin: 20px 0;
    }
  }
</style>
