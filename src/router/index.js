import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import About from '@/views/About.vue'
import editAbout from '@/views/editAbout.vue'
import Zhuce from '@/views/Zhuce.vue'
import { Toast } from 'vant'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'about',
      path: '/about/:id',
      component: About
    },
    {
      name: 'editAbout',
      path: '/editAbout/:id',
      component: editAbout
    },
    {
      name: 'zhuce',
      path: '/zhuce',
      component: Zhuce
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 只有访问那些需要授权的api的时候，才需要进行守卫
  if (to.path.indexOf('/about/') === 0) {
    if (localStorage.getItem('toutiao')) {
      next()
    } else {
      // 在访问需要令牌的网页时而没有令牌则重定向返回到登录页面并给出提示
      Toast.fail('请先登录！')
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
