<template>
  <article><div class="content_box">
    <div class="modify">
      <h1>修改密码</h1>
      <div>
        请输入原始密码 :
        <el-input type="text" placeholder="请输入原始密码" v-model="old_pwd"></el-input>
      </div>
      <div>
        请输入新的密码 :
        <el-input type="password" placeholder="请输入六位数以上的密码" v-model="password"></el-input>
      </div>
      <div>请再次确认密码 :
        <el-input type="password" placeholder="请再次输入新的密码" v-model="password_confirmation"></el-input>
      </div>
      <div><input type="submit" value="保存密码" class="pointer" @click="modifypwd"></div>
    </div>
  </div></article>



</template>
<script>
    import * as types from '../../../config/types'
    import APIUrl from '../../../config/apiurl'
    export default{
        data(){
            return{
                old_pwd:'',
                password:'',
                password_confirmation:''
            }
        },
        methods:{
            modifypwd(){
            	this.$Indicator.open('保存修改中...');
                var obj = {
                    appid:APIUrl.appid,
                    timeStamp:APIUrl.timeStamp,
                    password:this.password,
                    old_pwd:this.old_pwd,
                    password_confirmation:this.password_confirmation,
                };
                let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
                 let params=Object.assign({sign:sign,active:APIUrl.active},obj)
                this.$post(APIUrl.root+APIUrl.modifyPassword,params).then(res=>{
                	this.$Indicator.close();
                    if(res.code!=200){
                        this.$message({
                        message:res.msg,
                        duration:1000,
                        iconClass:"none",
                        customClass:'modifypwd',
                        center:true,
                    })
                    }  else{
                        this.$message({
                            message:'修改成功',
                            duration:1000,
                            iconClass:"none",
                            customClass:'modifypwd',
                            center:true,
                        })
                        this.$store.commit(types.LOGOUT)
                        this.$router.push({name:'login'})
                    }

                })


            }
        }
    }
</script>
<style>
.modify{margin-top:-3px;}
</style>
