import { createStore } from "vuex";
export default createStore({
  state: {
    isCollapse: true,
    currentMunu: null,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  },
  mutations: {
    updateIsCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      // 判断
      // val.name === 'home' ? state.currentMunu = null : state.currentMunu = val;
      if (val.name === 'home') {
        state.currentMunu = null
      } else {
        state.currentMunu = val
        const result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''
      }
    },
    closeTab(state,val){
     const result = state.tabsList.findIndex(item => item.name === val.name)
     state.tabsList.splice(result,1)
    }
  }
})