import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Map from '@/components/Map'
import RPTExceed from '@/components/RPTExceed'
import RPTAlert from '@/components/RPTAlert'
import ObjectList from '@/components/ObjectList'
import ObjectA from '@/components/ObjectA'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map
    },
    {
      path: '/ObjectList',
      name: 'ObjectList',
      component: ObjectList
    },
    {
      path: '/ObjectA',
      name: 'ObjectA',
      component: ObjectA
    },
    {
      path: '/RPTExceed',
      name: 'RPTExceed',
      component: RPTExceed
    },
    {
      path: '/RPTAlert',
      name: 'RPTAlert',
      component: RPTAlert
    }
  ]
})
