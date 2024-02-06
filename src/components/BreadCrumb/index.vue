<script setup lang="ts" name="BreadCrumb">
import getUserStore from "@/store/modules/userStore";

const userStore = getUserStore();

const router = useRouter();
const route = useRoute();
// 数据:面包屑导航
const breadCrumbList = computed(() => userStore.breadData[route.path]);

const goToPage = (item: any, index: number) => {
  if (index != 0) {
    router.push({
      name: item.name,
    });
  }
};
</script>
<template>
  <!-- 面包屑封装 -->
  <div id="BreadCrumb" v-if="breadCrumbList.length > 0">
    <!-- 控制左侧菜单 -->
    <!-- <el-icon class="controlMenuIcon" color="black" @click="changeMenuCollapse">
      <component :is="iconName"></component>
    </el-icon> -->
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in breadCrumbList" :key="item.name">
        <el-breadcrumb-item
          v-if="item.meta.name"
          @click="goToPage(item, index)"
        >
          {{ item.meta.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<style lang="scss" scoped>
#BreadCrumb {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e5e5;
  user-select: none;
  display: flex;
  align-items: center;
  background-color: var(--breadCrumb-background-color);
  .controlMenuIcon {
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  :deep(.el-breadcrumb__item:nth-child(n + 2)) {
    .el-breadcrumb__inner {
      cursor: pointer;
      transition: 0.1s;
      &:hover {
        color: black;
        transform: scale(1.12);
      }
    }
  }
}
</style>
@/store/modules/themStore