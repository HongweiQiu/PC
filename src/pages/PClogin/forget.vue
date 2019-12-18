<style scoped>
  .el-button {
    padding: 10px 50px !important;
  }
</style>
<template>
  <article>
    <div class="pc_login_box">
      <div class="pc_login">
        <div class="forget_inp_box">
          <div class="inp">
            <el-input
              placeholder="请输入账号"
              v-model="username">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </div>
          <div class="inp">
            <el-input
              type="password"
              placeholder="请输入六位以上的密码"
              v-model="password1">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </div>
          <div class="inp">
            <el-input
              type="password"
              placeholder="请再次确认登录密码"
              v-model="password2">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </div>
          <div class="inp">
            <div class="forget_inp">
              <span>
                <i slot="prefix" class="el-input__icon el-icon-warning-outline"></i>
              </span>
              <input type="text" placeholder="请输入图形验证码" v-model="imgCodeValue">
              <img :src="pictureCode" alt=""/>
              <div class="forget_inp_txt" @click="imgCode">换一张</div>
            </div>
          </div>
          <div class="inp">
            <div class="forget_inp get_code">

              <!-- <div> -->
              <span>
                  <i slot="prefix" class="el-input__icon el-icon-circle-check"></i>
                </span>
              <input type="text" placeholder="请输入验证码">
              <!-- </div> -->

              <div v-show="show"  class="forget_inp_txt green" @click="getCode">获取验证码</div>
              <span v-show="!show" class="count">{{count}} s</span>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <el-button type="success" @click="submit">修改密码</el-button>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
    import * as types from '../../../config/types'
    import APIUrl from '../../../config/apiurl'

    export default {
        components:{
        },
        data () {
            return {
                pictureCode:'',
                imgCodeValue:'',
                username:'',
                password1:'',
                password2:'',
                show: true,
                count: '',
                timer: null,
            }
        },
        methods: {
            //页面载入时获取图片验证码
            photoCode(){
                let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                this.$get(APIUrl.root + APIUrl.captcha, {
                    appid: APIUrl.appid,
                    timeStamp: APIUrl.timeStamp,
                    sign: sign
                }).then(res=>{
                    this.pictureCode=res.data;
                })
            },
            //刷新图片验证码
            imgCode(){
                this.photoCode()
            },
            //短信验证码
            getCode(){

                let sign=this.$md5('appid='+APIUrl.appid+'&code='+this.imgCodeValue+'&mobile='+this.username+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                this.$post(APIUrl.root + APIUrl.sendCode, {
                    appid: APIUrl.appid,
                    timeStamp: APIUrl.timeStamp,
                    mobile:this.username,
                    code:this.imgCodeValue,
                    sign: sign
                }).then(res=>{
                   if(res.code=!200){

                   }else{
                       this.$message({
                           message:res.msg,
                           duration: 1000,
                           iconClass: "none",
                           customClass: 'modifypwd',
                           center: true,
                       })
                       // const TIME_COUNT = 60;
                       // if (!this.timer) {
                       //     this.count = TIME_COUNT;
                       //     this.show = false;
                       //     this.timer = setInterval(() => {
                       //         if (this.count > 0 && this.count <= TIME_COUNT) {
                       //             this.count--;
                       //         } else {
                       //             this.show = true;
                       //             clearInterval(this.timer);
                       //             this.timer = null;
                       //         }
                       //     }, 1000)
                       //
                       // }
                   }
                })

            },
            //修改密码
            submit(){
                let sign=this.$md5(
                    'appid='+APIUrl.appid+
                    '&confirm_pwd='+this. password2+
                    '&mobile='+this.username+
                    '&password='+this.password1+
                    '&timeStamp='+APIUrl.timeStamp+
                    '&verify_code='+this.imgCodeValue+
                     APIUrl.appsecret);
                this.$post(APIUrl.root + APIUrl.forgetPassword, {
                    appid: APIUrl.appid,
                    mobile:this.username,
                    password:this.password1,
                    confirm_pwd:this. password2,
                    verify_code:this.imgCodeValue,
                    timeStamp: APIUrl.timeStamp,
                    sign: sign
                }).then(res=>{
                   
                      if(res.code==200){
                          this.$message({
                              message:'修改成功',
                              duration: 1000,
                              iconClass: "none",
                              customClass: 'modifypwd',
                              center: true,
                          });
                          this.$router.push({name:'login'})
                      }else{
                          this.$message({
                              message:res.msg,
                              duration: 1000,
                              iconClass: "none",
                              customClass: 'modifypwd',
                              center: true,
                          });


                      }
                })
            }
        },
        created(){
            this.photoCode()
        }
    };
</script>
