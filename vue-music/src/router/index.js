import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [{
  path: '/',
  redirect: '/recommend'
}, {
  path: '/recommend',
  component: () => import('components/recommend/recommend')
}, {
  path: '/singer',
  component: () => import('components/singer/singer')
}, {
  path: '/ranking',
  component: () => import('components/ranking/Ranking')
}, {
  path: '/search',
  component: () => import('components/search/search')
}]

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
