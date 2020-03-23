<style scoped="scoped">

</style>
<template>

		<div class="content_box orderDetails" >
			<div class="back">
        <a href="javascript:history.back(-1)">返回</a>
			</div>

      <table class="orderInfo" cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <th>订单数量 ( {{tableData[0].count}} )</th>
          <th>订单</th>
          <th>金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tableData[0].list">
           <td>{{index+1}}</td>
           <td>{{item.order_sn}}</td>
           <td class="red">￥{{item.totalPrice}}</td>
        </tr>
        </tbody>
      </table>
      <div class="total">总额:<span class="red">￥{{tableData[0].total}}</span></div>
		</div>

</template>
<script>
	import * as types from '../../../config/types'
	import APIUrl from '../../../config/apiurl'

	export default {
		components: {},
		data() {
			return {
				id: this.$route.query.id,
				loading: false,
          tableData:[]
			}
		},
		methods: {
			billingDetails() {
				var obj = {
					appid: APIUrl.appid,
					timeStamp: APIUrl.timeStamp,
					id: this.id
				};

				let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
				let params = Object.assign({sign: sign,active:APIUrl.active}, obj)
				this.$get(APIUrl.root + APIUrl.moneyListInfo, params).then(res => {
					if(res.code!=200){
					    this.$Toast({
					        message:res.msg,
					        duration:1000,
					    })
					}else{
             this.tableData.push(res.data)
          }
				})
			}
		},
		mounted() {

		},
		created() {
			this.billingDetails()
		}
	};
</script>
<style>
  .orderDetails .back a{color:green;}
	.orderInfo {width:100%;text-align:center;}
	.orderDetails .total{   margin-top: 10px;
    text-align: right;}

	.orderInfo th{height:45px;}
	.orderInfo th:first-child{width:20%;}
  .orderInfo tr td{border-top: 1px solid #efefef;}
  .orderInfo tr td{border-bottom: 1px solid #efefef;padding: 10px 0;}
  .orderInfo tr td:first-child{border-left: 1px solid #efefef;}
  .orderInfo tr td:last-child{border-right: 1px solid #efefef;}
</style>
