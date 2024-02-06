<script setup lang="ts" name="transfer">
const activeTab = ref(1);
</script>

<template>
  <div id="transfer">
    <!-- 头部 -->
    <TopNavigation />
    <!-- Tabs: 我的应用 应用中心 开放平台 -->
    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane label="我的应用" :name="1" />
      <el-tab-pane label="应用中心" :name="2" />
      <el-tab-pane label="开放平台" :name="3" />
    </el-tabs>
    <!-- 内容 -->
    <div class="view-box">
      <div class="view-box-left">
        <img src="@/assets/images/baseViewImg/avatar.gif" alt="avatar" />
        <span>杭州神兔网络</span>
        <span class="date-title">截止日期</span>
        <span class="date-content">2025-05-21 15:35:01</span>
        <span class="open-application">已开通应用(4)</span>
        <div class="view-button">
          <el-button type="primary">查看开通应用记录</el-button>
        </div>
      </div>
      <div class="view-box-right">
        <div class="view-box-right-item">
          <!-- 图标 -->
          <img
            src="https://kybcrm-files.oss-cn-hangzhou.aliyuncs.com/prod/tesla/merchant/39/scenic/logo/15483376560188xz8exz0.png"
            alt=""
          />
          <!-- 系统名 -->
          <span>复盘系统</span>
          <!-- 立即前往 -->
          <div class="jump-button">立即前往</div>
        </div>
        <div class="view-box-right-item">
          <!-- 图标 -->
          <img
            src="https://kybcrm-files.oss-cn-hangzhou.aliyuncs.com/prod/tesla/merchant/39/scenic/logo/15483376560188xz8exz0.png"
            alt=""
          />
          <!-- 系统名 -->
          <span>绩效系统</span>
          <!-- 立即前往 -->
          <div class="jump-button">立即前往</div>
        </div>
        <div class="view-box-right-item">
          <!-- 图标 -->
          <img
            src="https://kybcrm-files.oss-cn-hangzhou.aliyuncs.com/prod/tesla/merchant/39/scenic/logo/15483376560188xz8exz0.png"
            alt=""
          />
          <!-- 系统名 -->
          <span>沙盘系统</span>
          <!-- 立即前往 -->
          <div class="jump-button">立即前往</div>
        </div>
        <div class="view-box-right-item">
          <!-- 图标 -->
          <img
            src="https://kybcrm-files.oss-cn-hangzhou.aliyuncs.com/prod/tesla/merchant/39/scenic/logo/15483376560188xz8exz0.png"
            alt=""
          />
          <!-- 系统名 -->
          <span>预警系统</span>
          <!-- 立即前往 -->
          <div class="jump-button">立即前往</div>
        </div>
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
  background-color: rgb(250, 250, 250);
  .tabs {
    display: flex;
    justify-content: center;
    background-color: white;
    :deep(.el-tabs__header) {
      margin-top: 20px;
      margin-bottom: 0;
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
      .date-title{
        font-size: 18px;
        margin: 20px 0;
      }
      .date-content{
        font-size: 14px;
      }
      .open-application{
        margin-top: 290px;
        margin-bottom: 20px;
      }
    }
    .view-box-right {
      flex: 1;
      height: 100%;
      background-color: white;
      display: flex;
      .view-box-right-item {
        margin: 15px;
        border: 1px solid #e6e6e6;
        width: 245px;
        height: 180px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        img {
          width: 50px;
          margin-top: 20px;
        }
        span {
          font-size: 15px;
        }
        .jump-button {
          width: 100%;
          height: 45px;
          color: #39f;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(250, 250, 250);
          cursor: pointer;
        }
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
