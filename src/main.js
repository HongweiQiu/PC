// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 入口文件为 src/App.vue 文件
import App from './App'
import axios from 'axios'

// 全局引用mint-ui框架
import {Toast, Swipe, Indicator, Spinner, MessageBox, Switch, Actionsheet} from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
// axios接口
import {post, get, patch, put} from '../config/api'
import api from '../config/interface'

// 引用自定义路由配置文件
import router from '../config/routes'

// 登录拦截
import store from '../config/store'
import md5 from './../static/js/md5';

Vue.prototype.$post = post
Vue.prototype.$axios =axios

Vue.prototype.$api = api
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$md5 = md5
Vue.prototype.$Toast = Toast
// Vue.component(Checklist.name, Checklist)
Vue.component(Spinner.name, Spinner)
// Vue.component(CellSwipe.name, CellSwipe)
Vue.component(Switch.name, Switch)
Vue.prototype.$Indicator = Indicator
Vue.prototype.$MessageBox = MessageBox
Vue.use(ElementUI);
Vue.component(Actionsheet.name, Actionsheet)
// Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  Actionsheet,
  router,
  // render: (h) => h(App)
  components: { App },
  template: '<App/>'
})
