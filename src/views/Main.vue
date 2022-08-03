<template>
  <div class="common-layout">
    <el-container class="lay-container">
        <CommonAsideVue></CommonAsideVue>
      <el-container class="r-container">
        <CommonHeaderVue></CommonHeaderVue>
        <el-main>
          <common-tab-vue></common-tab-vue>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeaderVue from "../components/CommonHeader.vue";
import CommonAsideVue from "../components/CommonAside.vue"
import CommonTabVue from "../components/CommonTab.vue";
export default {
  name: "Main",
  components: {
    CommonHeaderVue,
    CommonAsideVue,
    CommonTabVue
  },
};
</script>

<style lang="less" scoped>
.r-container{
  flex-wrap: wrap;
}
.common-layout{
  height: 100%;
  .lay-container{
    flex-wrap: nowrap;
  }
  & > .el-container{
    height: 100%;
    align-items: flex-start;
    & > .el-aside{
      height: 100%;
      background-color: #545c64;
    }
  }
}
</style>