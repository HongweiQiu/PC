<template>
  <article>
    <div class="content_box">
      <div class='accountMange' v-for="(item,index) in options">
        <div>
          <div>
            <i class="el-icon-s-custom"></i>
            <span>账号名称 : {{item.nickname}}</span>
          </div>
          <div>
            <i class="el-icon-position"></i>
            <span>收货地址 : {{item.address}}</span> 
          </div>
        </div>
         <div><router-link :to="{path:'loginAccount',query:{id:item.zid}}">修改</router-link></div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      options: [],
    }
  },
  created() {
    this.$api.selectCount(this);
  }
}

</script>
<style>
.accountMange div:nth-child(n+2) {
  margin-top: 10px;
  // cursor: pointer;
}

.accountMange div:last-child {
  
}

.accountMange input[type='text'] {
  border: none;
}

.accountMange .el-icon-s-custom {
  color: green;
}

.accountMange .el-icon-position {
  color: #009CFF;
}

.accountMange span {
  margin-left: 2px;
}

.accountMange a {
  color: red;
}

.accountMange{border-bottom: 1px solid #efefef;
  
    display: flex;
    justify-content: space-between;
    padding-bottom: 14px;}
    .accountMange:nth-child(n+2){padding-top:10px;}
</style>
