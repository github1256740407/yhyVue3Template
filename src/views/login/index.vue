<script setup lang="ts" name="login">
import type { FormInstance, FormRules } from "element-plus";
import getUserStore from "@/store/modules/userStore";

const router = useRouter();
const userStore = getUserStore();

// 数据:登录表单
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: null as any,
  password: null as any,
});
const loginRules = reactive<FormRules>({
  username: [{ required: true, message: "请输入账号", trigger: ["blur", "change"] }],
  password: [{ required: true, message: "请输入密码", trigger: ["blur", "change"] }],
});

// 函数:登录按钮
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      // 1.请求登录API接口
      userStore.signIn(loginForm);
      // 2.跳转到中转页
      router.push("transfer");
    }
  });
};
</script>

<template>
  <div id="login">
    <div class="login-box">
      <!-- 左侧大图 -->
      <div class="login-left">
        <img src="@/assets/images/loginViewImg/login_left0.png" alt="login" />
      </div>
      <!-- 登录入口 -->
      <div class="login-form">
        <!-- 登录logo+标题 -->
        <div class="login-logo">
          <img class="logo-icon" src="https://element-plus.gitee.io/images/element-plus-logo.svg" alt="logo" />
          <h2 class="logo-text">叶花弈Vue3Template</h2>
        </div>
        <!-- 登录表单 -->
        <el-form
          ref="loginFormRef"
          @keyup.enter.native="handleLogin(loginFormRef)"
          :model="loginForm"
          :rules="loginRules"
          size="large"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名：admin">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <component is="User"></component>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="密码：admin"
              show-password
              autocomplete="new-password"
            >
              <template #prefix>
                <el-icon class="el-input__icon">
                  <component is="Lock"></component>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 操作按钮 -->
          <el-form-item>
            <el-button type="primary" class="loginBtn" @click="handleLogin(loginFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#login {
  position: relative;
  min-width: 550px;
  height: 100vh;
  min-height: 700px;
  background-color: #eeeeee;
  background-image: url("@/assets/images/loginViewImg/login_background.svg");
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  padding: 30px;

  .login-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    min-height: 600px;
    padding: 0 50px;
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;

    .login-left {
      width: 1000px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login-form {
      min-width: 450px;
      padding: 50px 40px 45px 40px;
      border-radius: 10px;
      box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
      background-color: white;
      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
        .logo-icon {
          width: 180px;
        }

        .logo-text {
          padding: 0 0 0 25px;
          margin: 0;
          font-size: 26px;
          font-weight: bold;
          color: #34495e;
          white-space: nowrap;
        }
      }

      .el-form-item {
        margin-bottom: 40px;
      }

      .loginBtn {
        display: flex;
        justify-content: center;
        width: 100%;
        white-space: nowrap;
      }
    }
  }
}
</style>
