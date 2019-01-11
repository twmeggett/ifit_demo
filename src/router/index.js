import Vue from 'vue'
import Router from 'vue-router'
import ProgramsBody from '@/components/ProgramsBody'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProgramsBody',
      component: ProgramsBody
    }
  ]
})
