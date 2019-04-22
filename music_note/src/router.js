import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/back',
            name: 'back',
            component: () => import('./views/Back.vue')
        },
        {
            path: '/tabs',
            name: 'tabs',
            component: () => import('./views/Tabs.vue')
        },
        {
            path: '/toptip',
            name: 'toptip',
            component: () => import('./views/TopTip.vue')
        },
        {
            path: '/confirm',
            name: 'confirm',
            component: () => import('./views/Confirm.vue')
        },
        {
            path: '/loading',
            name: 'loading',
            component: () => import('./views/Loading.vue')
        },
        {
            path: '/searchbox',
            name: 'searchbox',
            component: () => import('./views/SearchBox.vue')
        },
        {
            path: '/scroll',
            name: 'scroll',
            component: () => import('./views/Scroll.vue')
        },
        {
            path: '/slide',
            name: 'slide',
            component: () => import('./views/Slide.vue')
        },
        {
            path: '/listview',
            name: 'listview',
            component: () => import('./views/ListView.vue')
        },
        {
            path: '/attention',
            name: 'attention',
            component: () => import('./views/Attention.vue')
        },
        {
            path: '/api',
            name: 'api',
            component: () => import('./views/Request.vue')
        }, {
            path: '/commonstyle',
            name: 'commonstyle',
            component: () => import('./views/CommonStyle.vue')
        }, {
            path: '/commonjs',
            name: 'commonjs',
            component: () => import('./views/CommonJs.vue')
        }, {
            path: '/fastclick',
            name: 'fastclick',
            component: () => import('./views/FastClick.vue')
        }, {
            path: '/lazyload',
            name: 'lazyload',
            component: () => import('./views/LazyLoad.vue')
        }, {
            path: '/jsbase64',
            name: 'jsbase64',
            component: () => import('./views/JsBase64.vue')
        }, {
            path: '/createanimationkeyframe',
            name: 'createanimationkeyframe',
            component: () => import('./views/CreateAnimationKeyFrame.vue')
        }
        
    ]
})