import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [{
  path: '/',
  redirect: '/singer'
}, {
  path: '/singer',
  component: () => import('components/singer/singer')
}]

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'avtive'
})
