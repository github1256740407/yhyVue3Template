/**
 * @description: 项目路由
 * Vue中,刷新页面会重新实例化Vue,pinia存储数据会初始化,所以非持久化存储数据需要重新请求赋值
 *
 * -持久化存储
 * --[好处:只请求一次权限->登录时], [坏处:权限更新时需要重新登录]
 *
 * -非持久化存储
 * -- [好处:刷新页面即可更新权限,无需重新登录], [坏处:刷新页面时,会发送权限请求]
 *
 * 本项目采取: 非持久化存储
 */

import { createRouter, createWebHistory } from "vue-router";
import NProgress from "@/utils/nprogress";
import getUserStore from "@/store/modules/userStore";

// 路由文件
import baseRoute from "@/router/modules/baseRoute";
import errorRoute from "@/router/modules/errorRoute";

const router = createRouter({
  routes: [...baseRoute, ...errorRoute],
  history: createWebHistory(),
});

const { VITE_PROJECT_TITLE } = import.meta.env;

// 路由前置拦截守卫(开始)
router.beforeEach(async (to, from, next) => {
  const userStore = getUserStore();
  NProgress.start();
  document.title = to.meta.title ?? VITE_PROJECT_TITLE;
  if (to.name === "login") {
    if (userStore.token) {
      next("transfer");
    } else {
      next();
    }
  } else {
    if (userStore.token) {
      if (!userStore.menuRouteData.length) {
        try {
          await userStore.getAuthRoutes();
          await userStore.getAuthButtons();
          // 判断当前用户有没有路由表,若无则代表无任何页面权限,提示并直接返回登录页
          if (!userStore.authRoutes.length) {
            ElMessage.warning("该用户无任何页面权限");
            userStore.signOut();
            router.replace("login");
            return Promise.reject("无权限");
          }
          // 动态添加路由
          console.log(`%c>>> 路由前置守卫: 刷新动态路由 <<<`, 'background: tomato; color: #fff; padding: 4px');
          userStore.dynamicRouteData.forEach((item: any) => {
            if (item.meta.isFull) {
              router.addRoute(item);
            } else {
              router.addRoute("layout", item);
            }
          });
        } catch (error) {
          ElMessage.warning("获取路由表发生错误");
          userStore.signOut();
          router.replace("login");
          return Promise.reject("无权限");
        }
      }
      next();
    } else {
      next("login");
    }
  }
});

// 路由后置拦截守卫(结束)
router.afterEach(() => {
  NProgress.done();
});

// 路由跳转错误
router.onError((error) => {
  NProgress.done();
  console.warn("路由跳转发生错误", error.message);
});

export default router;
