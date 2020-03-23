<template>
<article class="main">
  <article class="adminis_ti">
    <section class="adminis_tio">登录</section>
  </article>
  <section class="adminis_tih"></section>
  <section class="adminis_gd"></section>
  

  <article class="adminislo">
    <form @submit.prevent="submit"  action="">
      <ol>
        <li>
          <cite>角色：</cite>
          <section class="adminislo_i"><i class="fa fa-angle-down"></i></section>
          <input type="hidden" name="typew" v-model="inputtext.typew" readonly>
          <input type="text" placeholder="请选择角色"  autocomplete="off" id="trigger1" readonly>
        </li>
        <li>
          <cite>账号：</cite>
          <section class="adminislo_i adminislo_iw" style="display:none;"><i class="fa fa-angle-down"></i></section>
          <input type="text" name="mobile" placeholder="请输入账号" v-model="inputtext.mobile" id="triggws" autocomplete="off">
        </li>
        <li>
          <cite>密码：</cite>
          <input type="password" name="password" placeholder="请输入密码" v-model="inputtext.password" autocomplete="off">
        </li>
      </ol>
      <section class="adminis_button_m">
        <button type="submit" class="adminis_button">登录</button>
      </section>
    </form>
  </article>
  <section class='clear'></section>
  
 <template>
    <DatePicker
    		style="width: 200px"
    		placeholder="请选择日期"
        :open="open"
        :value="value3"
        type="date"
        @on-change="handleChange"
        @on-clear="handleClear"
        @on-ok="handleOk">
        
    </DatePicker>
</template>

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
        inputtext:{
          typew: '',
          mobile: '',
          password: '',
          open: false,
          value3: ''
        },
      }
  },
  methods: {
  	handleClick () {
                this.open = !this.open;
            },
            handleChange (date) {
                this.value3 = date;
                console.log(date)
            },
            handleClear () {
                this.open = false;
            },
            handleOk () {
                this.open = false;
            },
    //表单提交
    submit: function() { 
      if(this.inputtext.typew==''){
          this.$Toast({
            message: '角色不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.mobile==''){
          this.$Toast({
            message: '账号不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.password==''){
          this.$Toast({
            message: '密码不能为空',
            duration: 1200
          });
          return false;
      }
      else{
        let mobile=this.inputtext.mobile;
        let password=this.inputtext.password;
        let typew=this.inputtext.typew;
        let sign=this.$md5('appid='+APIUrl.appid+'&mobile='+mobile+'&password='+password+'&timeStamp='+APIUrl.timeStamp+'&type='+typew+APIUrl.appsecret);
        this.$post(APIUrl.root+APIUrl.login,{appid:APIUrl.appid,mobile:mobile,password:password,type:typew,timeStamp:APIUrl.timeStamp,sign:sign,active:APIUrl.active})
        .then((response) => {
            // console.log(response)
            if(response.code==400)
            {
                this.$Toast({
                  message: response.msg,
                  duration: 1200
                });
                return false
            }
            else if(response.code==402)
            {
                this.$Toast({
                  message: '账号或密码错误',
                  duration: 1200
                });
                return false
            }
			      else if(response.code==403)
            {
                this.$Toast({
                  message: '账号已被禁用',
                  duration: 1200
                });
                return false
            }
            else(response.code==200)
            {
                // 本地存储
                var data = new Object();
                data.token=response.data.token;
                data.type=response.data.type;
                var str = JSON.stringify(data);
                this.$store.commit(types.LOGIN,str)
                this.$Toast({
                  message: '登录成功',
                  duration: 1000
                });
                if(response.data.type==1)
                {
                    setTimeout(() => {
                        this.$router.push("/caigou_index");
                    },1500)
                }
                if(response.data.type==2)
                {
                    setTimeout(() => {
                        this.$router.push("/gongying_index");
                    },1500)
                }
                if(response.data.type==3)
                {
                    setTimeout(() => {
                        this.$router.push("/shiji_index");
                    },1500)
                }
                if(response.data.type==4)
                {
                    setTimeout(() => {
                        this.$router.push("/yewu_index");
                    },1500)
                }
                if(response.data.type==5)
                {
                    setTimeout(() => {
                        this.$router.push("/guanli_index");
                    },1500)
                }
                
            }
        });
      }
    }
  },
  created(){
    var name=this.$route.name;
    var that=this;
    var str1 = localStorage.getItem("token");
    var resultw = JSON.parse(str1);
    // 判断是否跳转
    if(resultw!=null)
    {   
        if(resultw.type==1)
        {
            this.$router.push("/caigou_index");
        }
        if(resultw.type==2)
        {
            this.$router.push("/gongying_index");
        }
        if(resultw.type==3)
        {
            this.$router.push("/shiji_index");
        }
        if(resultw.type==4)
        {
            this.$router.push("/yewu_index");
        }
        if(resultw.type==5)
        {
            this.$router.push("/guanli_index");
        }
    }
    else
    {
        // 获取角色
        let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
        this.$get(APIUrl.root+APIUrl.roleType,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
        .then((response) => {
            if(response.code==403)
            {
                this.$router.push("/contact");
                return false
            }
            if(response.code==200)
            {
                // 下拉菜单
                var weekdayArr=response.data;
                var mobileSelect1 = new MobileSelect({
                    trigger: '#trigger1',
                    title: '',
                    wheels: [
                                {data: weekdayArr}
                            ],
                    position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                    transitionEnd:function(indexArr, data){
                        //console.log(data);
                    },
                    callback:function(indexArr, data){
                        if(data[0].id==3)
                        {
                                that.inputtext.mobile='';
                                that.inputtext.password='';
                                $("#triggws").attr("readonly",true)
                                $(".adminislo_iw").show();
                                that.$get(APIUrl.root+APIUrl.cart,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
                                .then((response) => {
                                        // 下拉菜单
                                        var weekdayArrw=response.data;
                                        var mobileSelect1 = new MobileSelect({
                                            trigger: '#triggws',
                                            title: '',
                                            wheels: [
                                                        {data: weekdayArrw}
                                                    ],
                                            position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                                            transitionEnd:function(indexArr, data){
                                                //console.log(data);
                                            },
                                            callback:function(indexArr, data){
                                                that.inputtext.mobile=data[0].value;
                                            }
                                        });
                                });
                        }
                        else
                        {
                            $(".mobileSelect:eq(1)").remove();
                            $("#triggws").removeAttr("readonly");
                            $(".adminislo_iw").hide();
                            that.inputtext.mobile='';
                            that.inputtext.password='';
                        }
                        $("#trigger1").val(data[0].value)
                        that.inputtext.typew=data[0].id
                    }
                });
            }
        });
    }
  }
};
</script>