<template>
  <div id="pagination" v-show="pageData.total != 0">
    <el-pagination
      :currentPage="pageData.pageNum"
      :page-size="pageData.pageSize"
      :total="pageData.total"
      :small="small"
      :disabled="disabled"
      :background="background"
      :page-sizes="pageSizesAry ? pageSizesAry : [10, 20, 30, 40]"
      :layout="layout ? layout : 'total, sizes, prev, pager, next, jumper'"
      @update:current-page="handleCurrentChange"
      @update:page-size="handleSizeChange"
    />
  </div>

  <!-- 
      1.例子:
  
      <Pagination 
        :pageData="pageData" 
        :pageSizesAry="[10,20,30]" 
        @handlePagesChange="handlePagesChange"
      />
  
  
      // 页码变动调用函数
      handlePagesChange(newPageData){
        Object.assign(pageData,newPageData)
        this.queryApi()
      }
    -->
</template>

<script setup lang="ts">
// 接口:props
interface propsType {
  // 必填
  pageData: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
  // 配置项,非必填
  small?: boolean; // 小型分页
  disabled?: boolean; // 禁用分页
  background?: boolean; // 展示背景颜色

  layout?: string; // 布局
  pageSizesAry?: Array<number>; // 可选每页条数
}
const props = defineProps<propsType>();

// 接收到的分页条数变动回调函数
const emit = defineEmits(["handlePagesChange"]);

// 函数:切换页码
const handleCurrentChange = (val: number) => {
  props.pageData.pageNum = val;
  emit("handlePagesChange");
};
// 函数:切换条数
const handleSizeChange = (val: number) => {
  props.pageData.pageSize = val;
  emit("handlePagesChange");
};
</script>

<style lang="scss" scoped>
#pagination {
  width: 100%;
  margin: 20px auto;
  :deep(.el-pagination) {
    justify-content: flex-end;
  }
}
</style>
