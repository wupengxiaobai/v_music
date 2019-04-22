import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [{
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/user',
    component: () => import('components/user/user-center')
  }, {
    path: '/recommend',
    component: () => import('components/recommend/recommend'),
    children: [{
      path: ':id',
      component: () => import('components/recommend/disc')
    }]
  }, {
    path: '/singer',
    component: () => import('components/singer/singer'),
    children: [{
      path: ':id',
      component: () => import('components/singer/singer-detail')
    }]
  }, {
    path: '/ranking',
    component: () => import('components/ranking/Ranking'),
    children: [{
      path: ':id',
      component: () => import('components/ranking/toplist')
    }]
  }, {
    path: '/search',
    component: () => import('components/search/search')
  }
]

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
