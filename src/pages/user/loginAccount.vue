<template>
    <div class="loginAccount">
        <div>
            <i class="fa  fa-user  "></i>
            <el-input v-model="nickname" placeholder="请输入子账号名称"></el-input>
        </div>
        <div>
            <i class="fa fa-address-book "></i>
            <el-input v-model="contact" placeholder="请输入联系人"></el-input>
        </div>
        <div>
            <i class="fa fa-volume-control-phone "></i>
            <el-input v-model="mobile" placeholder="请输入电话号码"></el-input>
        </div>
        <div>
            <i class="fa fa-lock  "></i>
            <el-input v-model="password" placeholder="不修改密码不用填"></el-input>
        </div>
        <div>
            <i class="fa fa-info-circle "></i>账号启用和禁用
            <el-switch v-model="state" active-color="#009A44" ></el-switch>
        </div>
       <!--  <div>
            <i class="fa fa-street-view "></i>
            <span>江西省南昌市</span>
        </div> -->
        <div>
            <i class="fa fa-paper-plane "></i>
            <el-input v-model="address" placeholder='请输入地址,如江西省南昌市西湖区某某小区'></el-input>
        </div>

        <button  @click="onSubmit" class="pointer">保存</button>
    </div>

</template>
<script>
    import APIUrl from '../../../config/apiurl'
      let obj = {
                    appid:APIUrl.appid,
                    timeStamp:APIUrl.timeStamp,
                };
           
    export default {
        data() {
            return {
                nickname:'',
                contact:'',
                mobile:'',
                password:'',
                address:'',
                state:'',
                zid:this.$route.query.id,
            }
        },
        created(){
            this.childInfo()
        },
        methods: {
            //获取子账号信息
            childInfo(){
              
                let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
                let params=Object.assign({sign:sign, select_zid:this.zid},obj)
                this.$get(APIUrl.root+APIUrl.memberAddressInfo,params).then(res=>{
                    let data=res.data;
                    if(res.code==200){
                        this.nickname=data.nickname;
                        this.contact=data. contact;
                        this.mobile=data.phone;
                        this.state=!!data.status;
                        this.address=data.address;
                    }
                })
            },
            onSubmit() {
                let  newobj=Object.assign({  
                    nickname:this.nickname,
                    contact:this.contact,
                    mobile:this.mobile,
                    address:this.address,
                    status:Number(this.state),
                    zid:this.$route.query.id},obj);
                let newobj1;
                if(this.password){
                 newobj1=Object.assign({password:this.password},newobj)
                }else{
                    newobj1=newobj;
                }
                let sign = this.$md5(objKeySort(newobj1) + APIUrl.appsecret);
                let params=Object.assign({sign:sign},newobj1)
                this.$post(APIUrl.root+APIUrl.editChild,params).then(res=>{
                    if(res.code==200){
                        this.$message({
                            message: '保存成功',
                            duration: 1000,
                            iconClass: "none",
                            customClass: 'modifypwd',
                            center: true,
                        })
                       this.$router.push({name:'accountMange'})
                    }
                })

            }
        }
    }
</script>
