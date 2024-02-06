<script setup lang="ts" name="MyApplication">
const data = ref([
  {
    logo: "https://element-plus.gitee.io/images/element-plus-logo.svg",
    title: "叶花弈的组件库",
    description: "基于Element-plus二次封装的UI组件库",
    clickEvent: () => {},
  },
  {
    logo: "https://www.lodashjs.com/img/logo.png",
    title: "叶花弈的函数库",
    description: "基于原生JavaScript封装的工具",
    clickEvent: () => {},
    logoStyle: {
      width: "38px",
    },
  },
]);
</script>
<template>
  <div id="MyApplication">
    <div class="application-item" v-for="(item, index) in data" :key="index">
      <!-- 图标 -->
      <img :src="item.logo" alt="logo" :style="item.logoStyle" />
      <!-- 系统名 -->
      <span class="system-title">{{ item.title }}</span>
      <span class="system-content">{{ item.description }}</span>
      <!-- 立即前往 -->
      <div class="jump-button" @click="item.clickEvent">立即前往</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#MyApplication {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(5, calc((100% - 40px) / 5));
  grid-template-rows: repeat(4, calc((100% - 30px) / 4));
  grid-gap: 10px 10px;
  .application-item {
    border: 1px solid #e6e6e6;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background-image: url('@/assets/images/iconImg/pullUp.png');
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 22px;
    img {
      width: 150px;
      margin-top: 25px;
    }
    .system-title {
      font-size: 14px;
      font-weight: bold;
      position: absolute;
      top: 80px;
    }
    .system-content {
      top: 105px;
      position: absolute;
    }
    .jump-button {
      width: 100%;
      height: 45px;
      color: #39f;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(250, 250, 250);
      opacity: 0;
      transform: translateY(45px);
      transition: 0.2s;
    }
    transition: 0.2s;
    &:hover {
      box-shadow: 3px 3px 3px #f0efef;
      .jump-button {
        color: white;
        background-color: #39f;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
