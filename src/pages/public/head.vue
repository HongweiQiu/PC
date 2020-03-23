<template>
  <article>
    <div class="main_head_box" :class="[{ headactive:webname=='allOrders'||webname=='nonPayment' }]">
      <div class="main_head">
        <div class="main_head_logo pointer" @click='index'>
         <img :src="root+logo" alt="" />
        </div>
        <div class="main_head_txt ">
          <div class="main_head_item" v-if="token">
            <span class="black  green" @click='account'>
            {{nickname}}
            </span>
            <span @click="exit" class="red"> 退出</span>
          </div>
          <div class="main_head_item" v-else>
            你好，请<router-link :to='{name:"login"}'> <span class="red  green">登录</span></router-link>
          </div>
          <div class="mycar  green" @click="cars">
            　我的购物车
            <span v-if="carnums>99">99<i>+</i></span><span v-else> {{carnums||0}}</span>
          </div>
        </div>
      </div>
      <div v-if="show">
        <logout></logout>
      </div>
    </div>
  </article>
</template>
<script>
import * as types from '../../../config/types'
import APIUrl from '../../../config/apiurl'
import logout from './deletebuy';
import { mapState,mapMutations} from 'vuex'
let obj = { appid: APIUrl.appid, timeStamp: APIUrl.timeStamp }
export default {
  data() {
    return {
      root:APIUrl.root,
      error: true,
      logo: '',
      nickname: ''
    }
  },
  computed: {
    webname() {
      return this.$route.name;
    },
    ...mapState(['token', 'show', 'carnums'])

  },
  components: {
    logout
  },
  methods: {
    ...mapMutations(['changedisplay','displaycar','jumppage','firstNav','hiddenCar']),

    index(){
      this.firstNav('/')
      this.$router.push({name:'index'})
    },
    exit() {
      this.changedisplay('logout')
    },
    account(){
     this.firstNav('user');
      this.$router.push({name:"infomation"})
    },
    cars() {

      if (this.token) {
        this.$router.push({name:'shoppingCar'})
        this.hiddenCar(false)
          this.firstNav('shoppingCar');
        // this.displaycar();
        // this.$api.cartList()
      } else {
       this.jumppage(true)
      }


    }
  },
  mounted() {},
  created() {
    
     
    let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret)
    let params = Object.assign({ sign: sign,active:APIUrl.active }, obj)
     this.$get(APIUrl.root + APIUrl.indexAd, params).then(res => {
        this.logo =res.data.logo;
      })
    if(this.token){  this.$get(APIUrl.root + APIUrl.addInfo, params).then(res => {
      let data = res.data;
      this.nickname = data.userInfo.nickname;


    })}
  
  }
};

</script>
<style>
.headactive {
  height: 100px !important;
}

.errorClass {
  height: 120px;
}

</style>
