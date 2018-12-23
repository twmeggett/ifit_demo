import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Payments from '@/components/Payments'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Payments',
      component: Payments
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
