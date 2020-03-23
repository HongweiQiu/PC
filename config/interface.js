import md5 from './../static/js/md5'
import {post, get, patch, put} from './api'
import APIUrl from './apiurl'
import {Toast, Swipe, Indicator, Spinner, MessageBox, Switch, Actionsheet} from 'mint-ui'
import store from './store'

import router from './routes'
import Vue from 'vue';
//2.新创建一个vue实例
let v = new Vue();
let obj = {appid: APIUrl.appid, timeStamp: APIUrl.timeStamp};
let sign = md5(objKeySort(obj) + APIUrl.appsecret);
let cartlist=[];

export default{
  // 未登录时跳转
  turn(){
  
    
        // router.push({name:'login'})
    
         let seconds=30;
       function test(){
        return  setInterval(()=>{seconds--},1000)
       }
       
          v.$confirm(test(), '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
              clearInterval(clear)

        })
    
  },
//首页
  index(){
    let params = Object.assign({sign: sign}, obj,{active:APIUrl.active})
    get(APIUrl.root + APIUrl.indexAd, params).then(res=>{

      store.commit('index',res.data)
    })
  },
  //购物车列表
  cartList(){
    Indicator.open('加载中...');

    let params = Object.assign({sign: sign,active:APIUrl.active}, obj)
    get(APIUrl.root + APIUrl.openCart, params).then(res => {
        let data = res.data;
           // that.is_look=data.is_look;
      store.commit('islook',data.is_look) 
           localStorage.setItem('defaultImg',res.data.item_default)
        if (!data.shop.length) {
          store.commit('bitMap',false)
        } else {
          store.commit('bitMap',true)
           cartlist= [];
            for (let i of data.shop) {
                for (let j of i.list) {
               cartlist.push(j);
                }
                store.commit('getCarts',cartlist) 
              
            }
        }
      Indicator.close();
    })
  },

  //更新购物车数量和总价
  cartNum(params){
    post(APIUrl.root + APIUrl.changeNum,params).then(res => {
      store.commit('changeNum', res.data.countNum)
    })
  },

  //自增加入购物车
  addCart(item,value){

      if (item.is_float == 1) {
        if (!Number.isInteger(value)) {
         Toast({
          message: '购买数量不能为小数',
          duration: 2000
        })
          return;
        }
      }
    let newobj;
    if (item.attr.length != 0) {
      newobj = Object.assign({item_id: item.attr.item_id, attr_id: item.attr.id, item_num: value}, obj);
    } else {
      newobj = Object.assign({item_id: item.id, attr_id: 0, item_num: value}, obj);
    }
    let newsign = md5(objKeySort(newobj) + APIUrl.appsecret);

    let params = Object.assign({sign: newsign,active:APIUrl.active}, newobj);


            if(value==0){
             post(APIUrl.root + APIUrl.deleteCart, params).then(res => {
              if(res.code==200){
               Toast({
          message:'删除该商品成功',
          duration: 1000
        });
              }
         store.commit('changeNum', res.data.countNum)
             })
      
         this.cartList();
             
             return
            }

    post(APIUrl.root + APIUrl.changeNum, params).then(res => {

      if (res.code != 200) {
        Toast({
          message: res.msg,
          duration: 1000
        });
      } else {
       Toast({
          message: '加入购物车成功',
          duration: 1000
        });
         store.commit('changeNum', res.data.countNum)
      }
    })
  },

  // 选择子账户
  selectCount(that){
    let params = Object.assign({sign: sign,active:APIUrl.active}, obj)
    get(APIUrl.root + APIUrl.childInfo,params ).then(res => {
      if(res.code == 200) {
        that.options = res.data;
      }
    })
  },

  //收货人信息
  consignee(that){

    let params = Object.assign({sign: sign,active:APIUrl.active}, obj)
    get(APIUrl.root + APIUrl.memberInfo, params).then(res => {
      let data = res.data;
      store.commit('consignee',data);
    })
  },

  //购物车总价和数量
  getCartNum(){
              if(store.state.token){ 
                let params=Object.assign({sign:sign,active:APIUrl.active},obj);
    get(APIUrl.root+APIUrl.getCountNum,params).then(res=>{
      store.commit('changeNum',res.data.countNum);
    })}
   
  }
}
