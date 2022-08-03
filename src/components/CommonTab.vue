<template>
  <div class="tags">
    <el-tag :effect="$route.name === item.name ? 'dark' : 'plain'" :disable-transitions="false"
      @close="closeMenu(item, index)" @click="ChangeMenu(item)" :closable="item.name !== 'home'"
      v-for="(item, index) in tags" :key="item.path">{{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const tags = store.state.tabsList;
    // 点击Menu函数
    const ChangeMenu = (item) => {
      router.push({
        name: item.name
      })
    };
    // 关闭Menu函数
    const closeMenu = (item, index) => {
      // console.log(item, index);
      let length = tags.length - 1;
      // console.log(index);
      store.commit('closeTab', item)
      // 第一个判断
      if (item.name !== route.name) {
        return;
      }
      // 如果删除的最后一个，则跳转到前一个页面
      if (index === length) {
        router.push({
          name: tags[index - 1].name
        })
        return
      } else {
        router.push({
          name: tags[index].name
        })
        return
      }
      // 如果删除的是第二个，则经过vuex对tags重新赋值后，跳转到下一个第二个页面
      if (index === 1) {
        router.push({
          name: tags[1].name
        })
        return
      }
    }
    return {
      tags,
      ChangeMenu,
      closeMenu
    };
  },
};
</script>

<style lang="less" scoped>
.tags {

  // padding: 20px;
  // margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  .el-tag {
    margin-right: 10px;
    margin-top: 10px;

    cursor: pointer;
  }
}
</style>
