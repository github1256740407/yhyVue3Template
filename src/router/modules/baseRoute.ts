import { RouteRecordRaw } from "vue-router";

/**
 * @description: 静态路由
 */
const baseRoute: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    name: "transfer",
    path: "/transfer",
    component: () => import("@/views/transfer/index.vue"),
    meta: {
      title: "中转平台",
    },
  },
  {
    name: "layout",
    path: "/layout",
    component: () => import("@/components/Layout/BaseView.vue"),
    children: [],
  },
];

export default baseRoute;
