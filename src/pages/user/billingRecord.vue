<template>
  <article><div class="content_box">
    <div class="record">
    <div class="inp_box">

      <el-date-picker
        v-model="input"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="success" @click="selectRecord">
        <img src="../../../static/img/pc_search.png" alt="">
      </el-button>
    </div>
<div v-show="tableData != ''">
    <table >
      <th v-for='item in tableth'>{{item.label}}</th>
      <th>   <i class="fa fa-share-square-o pointer green"  @click="output"> 导出</i></th>
         
      <tr v-for='(item,index) in tableData'>
      <!--   <td style="width:20%;">{{index+1}}</td> -->
        <td><span class="orderfont">订单号:{{item.order_sn}}</span><br>
          <p style="text-align: left;">{{item.date}}</p>
        </td>
        <td><br>
          <p class="money">{{item.receivable}}</p>
        </td>
        <td><br>
           <p class="money">{{item. net_receipts}}</p>
        </td>

        <td><br>
         <p>{{item.difference}}</p>
        </td>
         <td class="cash"><br>
           <span v-if="item.pay_type==1" style="color:#009A44;">余额</span>
          <span v-else-if="item.pay_type==2" style="color:#F00;">现金</span>
          <span v-else="item.pay_type==3">转账</span>
        </td>
        <td class="cash">
        <br>
          <div class='black green'>
            <router-link :to="{name:'billingDetails',query: { id: item.id }}">查看</router-link>
          </div>
        </td>
      </tr>

    </table>
  <div class="paging_box" >
    <div class="block pages flex">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="nums"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
        前往 <el-input v-model='page'  size="small" class="turnpage" @blur="blur" ></el-input>页 　
               <el-button  size="small" type="success"　@click="turnpage">
              跳转
            </el-button>
    </div>
  </div>
</div>
    <div class="placeholder_figure" v-show="tableData == ''" style="text-align: center;">
      <img src="../../../static/img/pc_bill.png" />
    </div>

  </div></div>
    <div v-if="show">
      <output></output>
    </div>
  </article>


</template>

<script>
	import * as types from '../../../config/types'
	import APIUrl from '../../../config/apiurl'
  import output from './../public/deletebuy';
  import {mapState} from 'vuex'

  let obj = {  appid: APIUrl.appid, timeStamp: APIUrl.timeStamp,};

	export default {
		data() {
			return {
			    input:'',
        nums:10,
        page:1,
        total:'',
				tableth: [
				  // {label: '#'},
          {label: '订单创建时间'},
					{label: '应收'},
					{label: '实收'},
					{label: '差额'},
          {label: '支付方式'},

				],
				tableData: []
			}
		},
		created() {
			this.billingRecord();
		},
    computed:{
      ...mapState(['show'])
    },
    components: {
      output
    },
		methods: {
        blur(){
      let int=Math.ceil((this.total/this.nums))
      console.log(int)
      if(this.page<=0){
        this.page=1
      }
      if (this.page>int) {
        this.page=int
      }
    },
    turnpage(){
      let val=this.page;
      this.handleCurrentChange(val)
    },
		  //导出账单记录
    output(){
      if(!this.input){
        this.$Toast({
          message:'请选择开始日期和结束日期'
        })
        return;
      }
      this.$store.commit('changedisplay','output')
      this.$store.commit('selectDate',this.input)

    },

			//账单记录
        load(params){
            this.$Indicator.open('加载中...');
            this.$get(APIUrl.root + APIUrl.moneyListPaginate, params).then(res => {

            if(res.code == 200) {
              let data=res.data;
                this.tableData = data.list;
                this.total=data.total;
            }
              this.$Indicator.close();
        })},
			billingRecord() {
				let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
				let params = Object.assign({
					sign: sign,
          page:1,
          num:this.nums,
          active:APIUrl.active
				}, obj)
			this.load(params)
			},
        selectRecord() {
            let arrDate=[];
            this.$Indicator.open('加载中...');

            let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
            let params = Object.assign({
                sign: sign,
                dateArr:this.input,
                active:APIUrl.active
            }, obj)
            this.load(params)
        },
      handleCurrentChange(val){
        let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
        let params = Object.assign({
          sign: sign,
          page:val,
          num:this.nums,
          active:APIUrl.active
        }, obj)
        this.load(params)
      },
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				console.log(row)
			},
		}
	}
</script>
<style>
	.orderfont,
	.cash {
		font-size: 12px;
	}
  .record .inp_box{display:flex;}
  .record .paging_box{display: flex;
    justify-content: flex-end;}
   
</style>
