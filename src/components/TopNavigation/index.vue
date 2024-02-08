<!-- 顶部导航栏 -->
<script setup lang="ts" name="TopNavigation">
import getSettingStore from "@/store/modules/settingStore"
import getUserStore from "@/store/modules/userStore";
import fullScreen from "@/utils/fullScreen";

const settingStore = getSettingStore()
const userStore = getUserStore();

const router = useRouter();
const { VITE_PROJECT_TITLE } = import.meta.env;

// 主题切换
const themeIsLight = ref(true);
watch(()=>themeIsLight.value, newValue => {
  if(newValue === true){
    settingStore.setTheme('light')
  }else{
    settingStore.setTheme('dark')
  }
})


// 函数:退出登录
const signOut = async () => {
  userStore.signOut();
  router.replace("login");
  ElMessage.success("退出登录成功！");
};
</script>
<template>
  <div id="TopNavigation">
    <!-- Logo -->
    <div class="logo">
      <img src="https://element-plus.gitee.io/images/element-plus-logo.svg" alt="logo" />
      <span class="line" />
      <span>{{ VITE_PROJECT_TITLE }}</span>
    </div>
    <!-- 右侧区域 -->
    <div class="rightBox">
      <!-- 快捷功能区 -->
      <div class="otherFunctions">
        <!-- 全屏 -->
        <el-icon @click="fullScreen">
          <component is="FullScreen" />
        </el-icon>
        <!-- 日夜间切换 -->
        <el-switch
          v-model="themeIsLight"
          active-action-icon="Sunny"
          inactive-action-icon="Moon"
          style="margin-left: 10px"
        />
      </div>
      <!-- 头像账号区域 -->
      <div class="userInfo">
        <el-dropdown>
          <div style="display: flex">
            <img src="@/assets/images/baseViewImg/avatar.jpg" alt="avatar" />
            <p class="el-dropdown-link">
              <span>{{ userStore.userName }}</span>
              <el-icon>
                <component is="ArrowDown" />
              </el-icon>
            </p>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#TopNavigation {
  color: #2c3e50;
  width: 100%;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
  background-color: white;
  .logo {
    display: flex;
    align-items: center;
    img {
      width: 130px;
      margin-right: 20px;
    }
    span {
      font-size: 18px;
      font-weight: 700;
    }
    .line {
      width: 1px;
      height: 14px;
      margin-right: 10px;
      background-color: #2c3e50;
    }
  }

  .rightBox {
    display: flex;
    align-items: center;
    // 快捷功能区
    .otherFunctions {
      margin-right: 20px;
      display: flex;
      align-items: center;
      .el-icon {
        font-size: 20px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
    // 用户头像,账号
    .userInfo {
      display: flex;
      align-items: center;
      margin-right: 20px;
      img {
        width: 30px;
        margin-right: 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          transform: scale(1.2);
        }
      }
      .el-dropdown-link {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
@/store/modules/settingStore