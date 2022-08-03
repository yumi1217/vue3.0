import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect:'/home',
      // vite必须要补全路径
      component: () => import('../views/Main.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home/Home.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User/User.vue')
        },
        {
          path: '/page1',
          name: 'page1',
          component: () => import('../views/Page1.vue')
        },
        {
          path: '/page2',
          name: 'page2',
          component: () => import('../views/Page2.vue')
        }
      ]
    }
  ]
})

export default router