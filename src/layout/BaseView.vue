<script setup lang="ts" name="BaseView"></script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <TopNavigation />
      </el-header>
      <el-container class="main-container">
        <!-- 侧边栏 -->
        <el-aside>
          <el-scrollbar height="100%">
            <AsideMenu />
          </el-scrollbar>
        </el-aside>
        <!-- 页面 -->
        <el-main>
          <BreadCrumb />
          <div class="viewBox">
            <div class="view">
              <el-scrollbar height="100%">
                <router-view></router-view>
              </el-scrollbar>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  // 顶部导航栏
  .el-header {
    padding: 0;
    height: 60px;
  }
  // 下部区域
  .main-container {
    height: calc(100vh - 60px);
    // 侧边栏
    .el-aside {
      height: 100%;
      width: auto !important;
    }
    // 右侧(面包屑+页面盒子)
    .el-main {
      height: 100%;
      padding: 0;
      overflow-y: hidden;
      // view页面
      .viewBox {
        height: calc(100vh - 112px);
        padding: 10px;
        box-sizing: border-box;
        background-color: var(--viewBox-background-color);
        .view {
          border-radius: 6px;
          background-color: var(--view-background-color);
          padding: 20px;
          box-sizing: border-box;
          height: calc(100vh - 132px);
        }
      }
    }
  }
}
</style>
