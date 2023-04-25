<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <!-- <div class="lg:flex !mb-4">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ProjectCard :loading="loading" class="enter-y" />
        <DynamicInfo :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="lg:w-3/10 w-full enter-y">
        <QuickNav :loading="loading" class="enter-y" />
        <Card class="!my-4 enter-y" :loading="loading">
          <img class="xl:h-50 h-30 mx-auto" src="../../../assets/svg/illustration.svg" />
        </Card>
      </div>
    </div> -->

    <div class="lg:flex !mb-4">
      <div class="lg:w-3/10 w-full !mr-4 enter-y">
        <Bar :loading="loading" />
      </div>
      <div class="lg:w-4/10 w-full !mr-4 enter-y">
        <PieBorderRadius :loading="loading" />
      </div>
      <div class="lg:w-3/10 w-full enter-y">
        <SaleRadar :loading="loading" />
      </div>
    </div>

    <div class="lg:flex !mb-4">
      <div class="lg:w-10/10 w-full enter-y">
        <StackedLine :loading="loading" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  // import { Card } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  // import ProjectCard from './components/ProjectCard.vue';
  // import QuickNav from './components/QuickNav.vue';
  // import DynamicInfo from './components/DynamicInfo.vue';
  import SaleRadar from './components/SaleRadar.vue';
  import StackedLine from './components/StackedLine.vue';
  import PieBorderRadius from './components/PieBorderRadius.vue';
  import Bar from './components/Bar.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 700);
</script>
