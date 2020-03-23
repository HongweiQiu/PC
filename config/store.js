/**
 * Created by superman on 17/2/16.
 */
import * as types from './types'

export default new Vuex.Store({
    state: {
        user: {},
        token: null,
        title: '',
        show:false,
        statu:'',
        discar:false,
        cate:[],//分类
        hiddencart:true,
        myCart:[],//购物车信息
        bitmap:true, //无数据显示的占位图
        carnums:0,//购物车数量
        // carprice:'',//购物车价钱
        selectcar:[],//选中的购物车
        countInfo:'',
        path:'',
        carts:[],
        repeatcart:[],
      date:[],
     indexAd:[],
     is_look:'',
     jumpstate:false,
    
    },
    mutations: {
      repeatCart(state,data){
        state.repeatcart=data;
      },
      jumppage(state,date){
        state.jumpstate=date;
      },
       islook(state,data){
        state.is_look=data
      },
      index(state,data){
        state.indexAd=data
      },
      getCarts(state,data){
        state.myCart=data
      },

      firstNav(state,data){
        state.path=data
           },
      selectDate(state,data){
        state.date=data
           },
      consignee(state,data){
        state.countInfo=data;
      },
      bitMap(state,data){
        state.bitmap=data;
      },
       shoppingCart(state,data){
         state.myCart=data;
       },
      hiddenCar(state,data){
        state.hiddencart=data;
      },
      //控制登录.清空购物车弹框的出现
        changedisplay(state,statu){
            state.show=!state.show;
            state.statu=statu
        },
      //是否显示侧边购物车
      displaycar(state){
            state.discar= !state.discar;
        },
      //分类列表
      classify(state,data){
          state.cate=data;
      },
      //购物车数量
      changeNum(state,data){
          state.carnums=data;
      },

     selectCar(state,data){
          state.selectcar=data;
      },
        [types.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');

            state.token = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        },

    }
})
