import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Shelf from '@/components/Shelf'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/shelf',
      name: 'Shelf',
      component: Shelf
    }
  ]
})
