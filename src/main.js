import { createApp } from 'vue'
import './assets/less/index.less'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './api/mock'

// element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// element-plus图标，能使用component来做图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(store)
app.mount('#app')
