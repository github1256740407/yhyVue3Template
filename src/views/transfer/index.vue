<script setup lang="ts" name="transfer">
import MyApplication from "./components/MyApplication.vue";
import ApplicationCenter from "./components/ApplicationCenter.vue";
const activeTab = ref(1);
const rightComponent = shallowRef(MyApplication);

watch(
  () => activeTab.value,
  (newValue) => {
    if (newValue === 1) rightComponent.value = MyApplication;
    if (newValue === 2) rightComponent.value = ApplicationCenter;
  },
  { immediate: true }
);

const tabBeforeLeave = (value: number) => {
  if (value === 3) {
    ElMessage.warning("暂未开发");
    return false;
  }
};
</script>

<template>
  <div id="transfer">
    <!-- 头部 -->
    <TopNavigation />
    <!-- Tabs: 我的应用 应用中心 开放平台 -->
    <el-tabs class="tabs" v-model="activeTab" :before-leave="tabBeforeLeave">
      <el-tab-pane label="我的应用" :name="1" />
      <el-tab-pane label="应用中心" :name="2" />
      <el-tab-pane label="开放平台" :name="3" />
    </el-tabs>
    <!-- 内容 -->
    <div class="view-box">
      <!-- 左侧: 信息栏 -->
      <div class="view-box-left">
        <img src="@/assets/images/baseViewImg/avatar.jpg" alt="avatar" />
        <span>叶花弈Vue3Template</span>
        <span class="open-application">已开通应用(2)</span>
        <div class="view-button">
          <el-button type="primary">查看开通应用记录</el-button>
        </div>
      </div>
      <!-- 右侧: 应用展示 -->
      <div class="view-box-right">
        <Transition name="animation" mode="out-in">
          <component :is="rightComponent" />
        </Transition>
      </div>
    </div>
    <!-- 底部 -->
    <div class="view-footer">
      <span>官网首页</span>
      <span>商务合作</span>
      <span>经典案例</span>
      <span>关于我们</span>
      <span>联系我们</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#transfer {
  height: 100vh;
  min-height: 900px;
  background-color: rgb(250, 250, 250);
  // 标签页切换栏
  .tabs {
    display: flex;
    justify-content: center;
    background-color: white;
    :deep(.el-tabs__header) {
      margin-top: 20px;
      margin-bottom: 0;
    }
    // 去除标签页底部灰线
    :deep(.el-tabs__nav-wrap::after) {
      height: 0;
    }
    :deep(.el-tabs__item) {
      font-size: 16px;
      font-weight: bold;
      padding: 0 40px;
      padding-bottom: 20px;
    }
  }
  .view-box {
    width: 100%;
    height: calc(100vh - 166px);
    min-width: 1900px;
    min-height: 780px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    .view-box-left {
      width: 15%;
      height: 100%;
      margin-right: 20px;
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      position: relative;
      img {
        width: 100px;
        border-radius: 50%;
        margin-top: 60px;
        margin-bottom: 30px;
      }
      span {
        font-size: 20px;
        font-weight: bold;
      }
      .open-application {
        position: absolute;
        bottom: 100px;
      }
      .view-button {
        position: absolute;
        bottom: 50px;
      }
    }
    .view-box-right {
      flex: 1;
      height: 100%;
      border-radius: 5px;
      background-color: white;
      // 动画效果
      overflow: hidden; // 避免动画影响产生的滚动条
      .animation-enter-active,
      .animation-leave-active {
        transition: all 0.3s ease-in-out;
      }
      .animation-enter-from {
        transform: translateX(-500px);
        opacity: 0;
      }
      .animation-leave-to {
        transform: translateY(500px);
        opacity: 0;
      }
    }
  }
  .view-footer {
    width: 100%;
    height: 60px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 16px;
      margin: 0 30px;
      cursor: pointer;
      &:hover {
        color: rgb(64, 158, 255);
      }
    }
  }
}
</style>
