<style scoped="scoped">
 .order .details{width:100%;}
 .order .details th{height:40px;width:12%;}
 .order .details tr{text-align: center;}
 .order .details tr td{border-top:1px solid #efefef;border-bottom:1px solid #efefef;height:50px;margin-top:2px;}
 .order .details tr td:first-child{border-left: 2px solid #efefef;}
 .order .details tr td:last-child{border-right: 2px solid #efefef;}
</style>
<template>
	<article class="order">
		<div class="content_box orderDetails" >
			<div class="back" @click="back">
				返回
			</div>
      <table class="details" cellspacing="0" cellpadding="0">
      <th v-for="item in tableth">{{item.label}}</th>
       <tr v-for="(item,index) in tableData.order_list">

          <td>{{index+1}}</td>
          <td>{{item.item_title}}</td>
          <!-- <td><img class="imgwidth" :src="'http://test.caidj.cn'+item.img"></td> -->
          <td>
          	<span v-if="item.attr_title==''">/</span>
          	<span v-else>{{item.attr_title}}</span>
          </td>
       
          <td>{{item.unit}}</td>
             <td>{{item.price}}</td>
          <td>{{item.num}}</td>
          <td style="color:red;">{{(item.price*item.num).toFixed(2)}}</td>
          <td>
	<span v-if="item.remark==''">/</span>
          	<span v-else>{{item.remark}}</span>
      </td>

        </tr>
      </table>
			<div class="order">
				<h1>订单详情</h1>
				<div>
					<p>订 单  &nbsp;号 :{{tableData.order_sn}}</p>
					<p>下单时间 : {{tableData.create_time}}</p>
					<p>送货时间 : {{tableData.send_time}}</p>
					<p>
            <span v-if="tableData.order_status==0">订单状态 :待审核</span>
            <span v-if="tableData.order_status==1">订单状态 :备货中</span>
            <span v-if="tableData.order_status==2">订单状态 :配送中</span>
            <span v-if="tableData.order_status==3" style="color:green;">订单状态 :已收货</span>
            <span v-if="tableData.order_status==4">订单状态 :已取消</span>
          </p>
					<p>备　　注 : {{tableData.remark}}</p>
					<p>下单金额 : ￥{{tableData.xd_price}}</p>
					<p>退货金额 : ￥{{tableData.th_price}}</p>
					<p>配送金额 : ￥{{tableData.delivery_fee}}</p>
					<p>收 货  &nbsp;人 : {{tableData.contact}}</p>
					<p>手 机 &nbsp;号 : {{tableData.mobile}}</p>
					<p>地　　址 : {{tableData.address}}</p>
					<p>支付方式 : 货到付款</p>
				</div>
			</div>
		</div>
	</article>
</template>
<script>
	import * as types from '../../../config/types'
	import APIUrl from '../../../config/apiurl'

	export default {
		components: {
		},
		data() {
			return {
			    id:this.$route.query.id,
          loading:true,
				tableth:[
					{label:'序号'},
					{label:'商品名称'},
					// {label:'商品图片'},
					{label:'规格'},
					{label:'单位'},
					{label:'售价（￥)'},
					
					{label:'购买数量'},
					{label:'小计'},
					{label:'备注'},
				],
				tableData: []
			}
		},
		methods: {
        orderDetails(){
            this.$Indicator.open('正在加载中......')
            var obj = {
                appid: APIUrl.appid,
                timeStamp: APIUrl.timeStamp,
                id:this.id
            };

            let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
            let params=Object.assign({sign:sign},obj)
            this.$get(APIUrl.root+APIUrl.orderInfo ,params).then(res => {
              if(res.code!=200){
                  this.$Toast({
                      message:res.msg,
                      duration:1000,
                  })
              }else{

                  this.$Indicator.close()
                  this.tableData=res.data.orderInfo;
              }
            })
        },
        back(){
           this.$router.back()
        }
		},
		mounted() {

		},
		created() {
		    this.orderDetails()
		}
	};
</script>
<style>
	.orderDetails h1{font-weight: bold;font-size: 14px;margin:25px 0 15px;}
	.orderDetails .order div{border:2px solid #E0E0E0;padding:10px;    margin-bottom: 10px;}
	.orderDetails .order div p{height: 25px;}
	.orderDetails .order div p:nth-child(4){color:red;}
	.orderDetails .back {font-size: 15px;color: #009A44;padding:0 10px 30px 10px;cursor: pointer;}
  .orderDetails .imgwidth{width:50px;}
  @color:green;

  .orderDetails {h1{color:@color;}}
</style>
