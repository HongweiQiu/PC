<style scoped>
  .el-button {
    padding: 10px 50px !important;
  }
  .pc_login_box .logo p{color:#9F0505;font-size:35px;top:13.5%;left:19.8%;}
  .pc_login_box .logo img{
    /* top: 13.5%; */
    /* left: 18.3%; */
    width: 59%;}
</style>
<template>
  <article>
    <div class="pc_login_box">
      <div class="logo">
        <img class='' :src="root+img" alt="" />
      </div>
      <div class="pc_login">
        <div class="inp_box">
          <div class="inp_title">
            用户登录
          </div>
          <div class="inp">
            <el-input placeholder="请输入账号" v-model="username">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </div>
          <div class="inp">
            <el-input type="password" placeholder="请输入密码" v-model="password" @keyup.enter.native="login">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </div>
        </div>
        <div class="btn_box">
          <el-button type="success" @click='login'>登录</el-button>
          <div class="btn">
            <!-- <router-link :to="{name:'forget'}">忘记密码？</router-link> -->
            <router-link :to="{name:'index'}">
              <el-button type="warning">首页</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import * as types from '../../../config/types'
import APIUrl from '../../../config/apiurl'
let obj = { appid: APIUrl.appid, timeStamp: APIUrl.timeStamp }
export default {
  components: {},
  data() {
    return {
      username: '',
      password: '',
      root: APIUrl.root,
      img: '',
      green: 'white'

    }
  },
  methods: {

    login() {

      //        var phoneReg = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
      var mobile = this.username
      var password = this.password
      if (mobile == '') {
        this.$Toast({
          message: '登录账号不能为空',
          duration: 1200
        });
        return false;
      } else if (password == '') {
        this.$Toast({
          message: '登录密码不能为空',
          duration: 1200
        });
        return false;
      } else {
        // 登录
        var obj = {
          appid: APIUrl.appid,
          mobile: mobile,
          password: password,
          timeStamp: APIUrl.timeStamp
        };
        let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
        this.$post(APIUrl.root + APIUrl.login, {
            appid: APIUrl.appid,
            timeStamp: APIUrl.timeStamp,
            mobile: mobile,
            password: password,
            sign: sign,
            active: APIUrl.active
          })
          .then((response) => {
            if (response.code == 402) {
              this.$Toast({
                message: '账号或密码错误',
                duration: 1000
              });
              return false
            } else if (response.code == 403) {
              this.$Toast({
                message: '账号已禁用或审核中',
                duration: 1000
              });
              return false
            } else if (response.code == 400) {
              this.$Toast({
                message: response.msg,
                duration: 1000
              });
              return false
            } else if (response.code == 200) {
              // 本地存储
              var data = new Object();
              data.token = response.data.token;

              localStorage.setItem('is_bind', response.data.is_bind);
              var str = JSON.stringify(data);
              localStorage.setItem('token', response.data.token);
              this.$store.commit(types.LOGIN, str)
              this.$Toast({
                message: '登录成功',
                duration: 1000
              });
              this.$router.push("/");
            }
          });
      }

    }

  },
  created() {
    let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret)
    let params = Object.assign({ sign: sign, active: APIUrl.active }, obj)
    this.$get(APIUrl.root + APIUrl.indexAd, params).then(res => {
      this.img = res.data.logo;
    })
    if (localStorage.getItem('token')) { // 判断是否登录
      this.$router.push("/");
    }
  }
};

</script>
