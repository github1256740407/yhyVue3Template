<!-- 侧边栏菜单组件 -->
<script setup lang="ts" name="AsideMenu">
import getUserStore from "@/store/modules/userStore";

const userStore = getUserStore();
const route = useRoute();

</script>

<template>
  <div id="AsideMenu">
    <!-- 菜单内容 -->
    <el-menu
      router
      :collapse-transition="true"
      :unique-opened="false"
      :default-active="route.path"
      text-color="#010504"
      active-text-color="rgb(97,168,210)"
      background-color="white"
      class="el-menu-vertical-demo"
    >
      <template v-for="item in userStore.menuRouteData" :key="item.name">
        <!-- 多级菜单 -->
        <el-sub-menu v-if="item.children?.length" :index="item.path">
          <!-- 一级菜单名字 -->
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            v-for="childrenItem in item.children"
            :index="childrenItem.path"
          >
            {{ childrenItem.meta.name }}
          </el-menu-item>
        </el-sub-menu>
        <!-- 单级菜单 -->
        <el-menu-item v-else :index="item.path">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
#AsideMenu {
  height: 100%;
  .el-menu {
    height: 100%;
    border-right: none;
  }
}
</style>
@/store/modules/themStore