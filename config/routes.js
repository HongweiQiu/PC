import '../src/pages/PClogin/login.vue' // 登录
import '../src/pages/PClogin/forget.vue' // 忘记秘密
import '../src/pages/index/index.vue' // 主页
import '../src/pages/classify/classify.vue' // 分类
import '../src/pages/shoppingCar/shoppingCar.vue' // 购物车
import store from './store'
import * as types from './types'
import Vue from 'vue'
import VueRouter from 'vue-router'



// 引用模板
// import  '../src/pages/login/login'                       // 所有登录
// import  '../src/404'                                     // 所有404
import AppView from '../src/pages/public/comman'

const page = (folder, name) => () => import('../src/pages/' + folder + '/' + name)


Vue.use(VueRouter)

// 配置路由
const routes = [
    //子路由

    {
        path: '/',
        component: AppView,
        children: [
            {path: '/', name: 'index', component: page('index', 'index')},   /*首页*/
            {path: '/classify', name: 'classify', component: page('classify', 'classify')}, //分类
            {path: '/shoppingCar', name: 'shoppingCar', component: page('shoppingCar', 'shoppingCar')}, //购物车
            {path: '/allOrders', name: 'allOrders', component: page('order', 'allOrders'),
 meta: { keepAlive: true, }
            }, //全部订单
            {path: '/nonPayment', name: 'nonPayment', component: page('order', 'nonPayment')}, //未支付订单
            {path: '/orderDetails', name: 'orderDetails', component: page('order', 'orderDetails'),
             // meta: { keepAlive: false }
      }, //订单详情
            {path: '/infomation', name: 'infomation', component: page('user', 'infomation')},//信息资料
            {path: '/billingRecord', name: 'billingRecord', component: page('user', 'billingRecord'),
            meta: { keepAlive: true, }},//账单记录
            {path: '/billingDetails', name: 'billingDetails', component: page('user', 'billingDetails')},//账单详情
            {path: '/modify', name: 'modify', component: page('user', 'modify')},//修改密码
            {path: '/loginAccount', name: 'loginAccount', component: page('user', 'loginAccount')},//登录账号
            {path: '/accountMange', name: 'accountMange', component: page('user', 'accountMange')},//账号管理
          {path: '/map', name: 'map', component: page('order', 'map')},//查看物流

        ]
    },
    // 所有登录
    {
        path: '/login',
        name: 'login',
        meta: {
            keepAlive: false
        },
        component: (resolve) => require(['../src/pages/PClogin/login.vue'], resolve),
    },
    // 忘记密码
    {
        path: '/forget',
        name: 'forget',
        meta: {
            keepAlive: false
        },
        component: (resolve) => require(['../src/pages/PClogin/forget.vue'], resolve),
    },
    
    // 所有404
    {
        path: '*',
        name: 'P404',
        meta: {
            requireAuth: true,
            keepAlive: false
        },
        component: (resolve) => require(['../src/404.vue'], resolve)
    }
];

// 使用配置文件规则
const router = new VueRouter({
    // 去掉#号 history hash
    mode: 'hash',
    routes
});

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
    //前进刷新.返回上一页不刷新
    const toDepth = to.path.split('/').length
   const fromDepth = from.path.split('/').length
   if (toDepth < fromDepth) {
 
    from.meta.keepAlive = false
    to.meta.keepAlive = true
  }
  next()


    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        } else {
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next();
    }
});

export default router;
