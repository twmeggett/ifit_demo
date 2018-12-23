import Vue from 'vue'
import Router from 'vue-router'
import Payments from '@/components/Payments'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Payments',
      component: Payments
    }
  ]
})
