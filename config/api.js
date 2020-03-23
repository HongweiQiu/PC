// 引入api.url.js
import APIUrl from '../config/apiurl';
import store from '../config/store'
import * as types from '../config/types'
import router from '../config/routes'
import {Toast, Swipe, Indicator, Spinner, MessageBox, Switch, Actionsheet} from 'mint-ui'


// 配置API接口地址
// axios 默认配置  更多配置查看Axios中文文档
axios.defaults.timeout       = 5000;             // 超时默认值
axios.defaults.baseURL       = APIUrl.baseURL;   // 默认baseURL
// axios.defaults.responseType  = 'json'         // 默认数据响应类型
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;           // 表示跨域请求时是否需要使用凭证



// http request 拦截器  请求
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
        config.headers.Authorization = JSON.parse(localStorage.getItem('token')).token
		// config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// 接口错误拦截

// http response 拦截器  返回
axios.interceptors.response.use(
  response => {
   if(response.data.code==401){
    // Toast({message:'尊敬的用户,你尚未登录,请登录'});
     store.commit('jumppage',true)
    // router.push({path:'login'})
   
   }

    if(typeof(response.headers.authorization) != "undefined")
    {
      var data = new Object();
      data.token=response.headers.authorization;
      var str = JSON.stringify(data);
      store.commit(types.LOGIN,str)
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:

          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== '/login' &&
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.path },
            })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios




/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: data})
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            });
    });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            });
    });
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
