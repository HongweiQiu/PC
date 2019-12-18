<template>
    <div>
        <div class="quit" v-if="visible">
        </div>
        <div class="select" v-if="visible">
            <p>提示</p>
            <p class="tips" v-if="this.$store.state.statu=='logout'">确定要退出登录吗</p>
            <p class="tips" v-else-if="this.$store.state.statu=='clear'">确定要删除所选的商品吗</p>
            <p class="tips" v-else="this.$store.state.statu=='output'">确定要导出账单记录吗</p>
            <div @click="determine" class="determine pointer">确定</div>
            <div @click="cancel" class="pointer">取消</div>

        </div>
    </div>
</template>
<script>
    import APIUrl from '../../../config/apiurl'
    import * as types from '../../../config/types'
      import {mapState} from 'vuex'
    export default{
        data(){
            return{
                visible:true,
            }
        },
       computed:{
            ...mapState([  'selectcar','date','statu']
            )
       },
        mounted(){

        },
        methods:{
            cancel() {

                this.$store.commit('changedisplay');
            },
            determine() {

              let obj={appid: APIUrl.appid, timeStamp: APIUrl.timeStamp}
              let sign=this.$md5(objKeySort(obj) + APIUrl.appsecret);
              switch(this.statu){
                case 'logout':
                  this.$store.commit(types.LOGOUT);
                  this.$store.commit('firstNav',this.$route.name);
                     this.$store.commit('changeNum', 0)
                  this.$router.push({name: "login"});
                  break;

                case 'clear':
                  let data=this.selectcar;
                 
                  let id=[];
                  for(let i of data){
                    if(typeof i=='number'){
                      id.push(i)
                    }else{
                      id.push(i.cart_id)
                    }
                  }
                  
                  let params=Object.assign({sign:sign,keys:id},obj);
                  this.$post(APIUrl.root + APIUrl.deleteByUserIds, params).then(res=>{

                    if (res.code==200){
                      this.$Toast({
                        message:"删除成功",
                        duration: 1000
                      }),

                        this.$api.cartList(this);
                      this.$api.getCartNum();
                    }else{
                      this.$Toast({
                        message:res.msg,
                        duration: 1000
                      })
                    }
                  })
                  break;

                case 'output':
                  let params2=Object.assign({sign:sign,dateArr:this.date},obj);
                  this.$axios
                  ({
                    url:APIUrl.root + APIUrl.moneyListExport,
                    method: 'get',
                    params:params2,
                    responseType: 'blob',
                  })
                    .then(res => {
                      if(!res) return
                      let blob = new Blob([res.data])
                      let url = window.URL.createObjectURL(blob);
                      let aLink = document.createElement("a");
                      aLink.style.display = "none";
                      aLink.href = url;
                      aLink.setAttribute("download", "账单记录.xls");
                      document.body.appendChild(aLink);
                      aLink.click();
                      document.body.removeChild(aLink);
                      window.URL.revokeObjectURL(url);
                    })
                    break;
              }

                this.$store.commit('changedisplay');


            },
        }
    }
</script>
