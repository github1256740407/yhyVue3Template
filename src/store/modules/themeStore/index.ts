import { defineStore } from "pinia";
import piniaPersistConfig from "@/store/piniaPresist";

// 日间/夜间主题样式
const themeStyleConfig = {
  // 面包屑
  "--breadCrumb-background-color": {
    light: "#ffffff",
    dark: "#1e1e20",
  },
  // 页面盒子
  "--viewBox-background-color": {
    light: "#eff0f2",
    dark: "#000000",
  },
  // 页面内容
  "--view-background-color": {
    light: "#ffffff",
    dark: "#1e1e20",
  },
};

/**
 * @description: pinia: 项目主题样式配置信息
 */
const getThemeStore = defineStore("themeStore", {
  state: () => ({
    themeName: "light", // 主题名称
    menuCollapse: false, // 侧边栏是否收缩
  }),
  actions: {
    // 设置主题相关具体参数样式
    // setThemeStyle() {
    //   Object.keys(themeStyleConfig).forEach((key) => {
    //     document.body.style.setProperty(
    //       key,
    //       themeStyleConfig[key][this.themeName]
    //     );
    //   });
    // },
  },
  persist: piniaPersistConfig("themeStore"),
});

export default getThemeStore;
