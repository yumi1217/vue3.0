<template>
  <!-- <h1>我是header组件</h1>-->
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页是一定存在的，所以直接写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="current.path">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc('user')" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'
export default {
  setup() {
    let store = useStore();
    // const imgSrc = require('../assets/images/user.png')
    let getImgSrc = (user) => {
      return new URL(`../assets/images/${user}.png`, import.meta.url).href;
    };
    let handleCollapse = () => {
      store.commit('updateIsCollapse');
    }
    const current = computed(() => {
      return store.state.currentMunu;
    })
    return {
      // imgSrc,
      getImgSrc,
      handleCollapse,
      current
    };
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }

  h3 {
    color: #fff;
  }
}

.bread /deep/ span {
  color: #fff !important;
  cursor: pointer !important;
}
</style>