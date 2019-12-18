<template>
  <article>

    <div class="content_box">
      <div class="order_box" id="width">

        <div class="fixed order_top " :style="{width:screenWidth+'px'}">
          <div class="top_left">
            <div class="top_left_item" v-for="item in title" :class="{'on':titleId==item.id}" @click="titleClick(item)">

              <span v-if="item.id == 1">10</span>
              <span v-if="item.id == 2">99</span>
              <div>{{item.name}}</div>
            </div>
          </div>
          <div class=" top_right">
            <div>选择子账号：</div>
            <div>
              <el-select v-model="value" placeholder="选择子账号" @change="selectClick">
                <el-option  label="当前账号" value="">
                </el-option>
                <el-option v-for="item in options" :key="item.nickname" :label="item.nickname" :value="item.zid">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="order_content" v-if='bitmap'>
          <div v-if="hidden">
            <div  class="export"></div>
            <div class="exportinfo">
              <div class="h1 ">
                <h1  class="el-icon-toilet-paper pointer" @click="determine">导出订单 </h1><i class="el-icon-close pointer" @click="hidden=false"></i></div>
              <div class="choose">
                <div> <el-radio-group v-model="radio">
                  <el-radio :label="0">仅订单</el-radio>
                  <el-radio :label="1">附带商品</el-radio>

                </el-radio-group></div>
                <div> 配送时间 : <el-date-picker
                  v-model="value2"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker></div></div>
            </div>
          </div>

          <table>
            <tr>
              <th align="left">商品 </th>
              <th align="left">数量</th>
              <th align="left">金额</th>
              <th align="left">订单状态</th>
              <th align="left">操作</th>
              <th align="left" class="right">
                <i class="fa fa-share-square-o"  @click="hidden=true"> 导出</i>
              </th>

            </tr>
            <tr class="list_box" v-for="item in orderlist">
              <td class="divcss5-td-1">
                <div class="list_top">下单时间{{item.created_time}}</div>
                <div class="list_txt" style="display: flex;">
                  <img :src="'http://test.caidj.cn'+item.item_img" />
                  <div style="margin-left: 10px;">{{item.item_title}}</div>
                </div>
              </td>
              <td class="divcss5-td-1">
                <div class="list_top">订单号：{{item.order_sn}}</div>
                <div class="list_txt">
                  {{item.item_count}}
                </div>
              </td>
              <td class="divcss5-td-2">
                <div class="list_txt">
                  {{item.xd_price}}
                </div>
              </td>
              <td class="divcss5-td-2">
                <div class="list_txt">
                  <span v-if="item.order_status==0">待审核</span>
                  <span v-if="item.order_status==1">备货中</span>
                  <span v-if="item.order_status==2">配送中</span>
                  <span v-if="item.order_status==3">已收货</span>
                  <span v-if="item.order_status==4">已取消</span>
                </div>
              </td>
              <td class="divcss5-td-3">
                <div class="list_txt list_btn" v-if="item.order_status==4||item.order_status==1">
									<span class="without">
										/
									</span>
                </div>
                <div class="list_txt list_btn" v-if="item.order_status==0">
									<span class="cancel" @click="cancel(item.id)">
										取消订单
									</span>
                </div>
                <!--<div class="list_txt list_btn pay" v-if="item.order_status==3">
                  <span class="pay">
                    马上支付
                  </span>
                </div>-->
                <div class="list_txt list_btn" v-if="item.order_status==3">
									<span class="again" @click="anotherOrder(item.id)">
										再来一单
									</span>
                </div>
                <div class="list_txt list_btn" v-if="item.order_status==2">
									<span class="affirm" @click="confirm(item.id)">
										确认收货
									</span>
                </div>
                <div class="list_txt list_btn" v-if="item.order_status==3">
									<span class="logistics">
										<router-link :to="{name:'map',query: { id: item.id }}">查看物流</router-link>
									</span>
                </div>
              </td>
              <td>
                <div class="list_time">
                  配送时间：{{item.send_time}}
                </div>
                <div class="list_examine">
                  <router-link :to="{name:'orderDetails',query: { id: item.id }}"> 查看</router-link>

                </div>
              </td>
            </tr>
          </table>
          <div class="paging_box">  <div class="block pages">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="nums"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div></div>

        </div>


        <div class="order_placeholder_figure" v-else>
          <img src="../../../static/img/pc_order_form.png"/>
        </div>

      </div>

    </div>

  </article>
</template>
<script>
  import * as types from '../../../config/types'
  import APIUrl from '../../../config/apiurl'
  import {mapState} from 'vuex'
  let obj = {
    appid: APIUrl.appid,
    timeStamp: APIUrl.timeStamp
  };
  export default {
    components: {},
    data() {
      return {
        hidden: false,
        radio:0,
        value2:'',
        orderlist: [],
        total:0,
        nums:10,
        title: [
          {
            name: '全部订单',
            id: '0'
          },
          {
            name: '待审核',
            id: '1'
          },
          {
            name: '备货中',
            id: '2'
          },
          {
            name: '配送中',
            id: '3'
          },
          {
            name: '已收货',
            id: '4'
          },
          {
            name: '已取消',
            id: '5'
          },
        ],
        titleId: '0',
        options: [],
        value: '',
        select_zid:'',

        screenWidth:'',

      }
    },

    computed:{

      ...mapState(['bitmap'])
    },
    methods: {
      determine(){

        let sign=this.$md5(objKeySort(obj) + APIUrl.appsecret);
        let params=Object.assign({sign:sign,dateArr:this.value2,type:this.radio},obj);
        this.$axios
        ({
          url:APIUrl.root + APIUrl.orderExport,
          method: 'get',
          params:params,
          headers:{
            'Content-Type': 'application/json; application/octet-stream'
          },
          responseType: 'blob',
        })
          .then(res => {

            if(!res) return
            let blob = new Blob([res.data])
            let url = window.URL.createObjectURL(blob);
            let aLink = document.createElement("a");
            aLink.style.display = "none";
            aLink.href = url;
            aLink.setAttribute("download", "订单记录.xls");
            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
            window.URL.revokeObjectURL(url);
            this.hidden=false
          })
          .catch(err => {
            console.log(err);
          })
      },

      selectClick(event){

        this.select_zid = event;
        this.allOrder();
      },
      //子账户列表
      childInfo() {
        let sign = this.$md5('appid=' + APIUrl.appid + '&timeStamp='  + APIUrl.timeStamp + APIUrl.appsecret);
        this.$get(APIUrl.root + APIUrl.childInfo, {
          appid: APIUrl.appid,
          timeStamp: APIUrl.timeStamp,
          sign: sign
        }).then(res => {
          if(res.code == 200) {
            this.options = res.data;
          }
        })
      },
      order(params){
        this.$get(APIUrl.root + APIUrl.orderList, params).then(res => {
          let data = res.data;
          this.orderlist = data.list;
          this.total = data.total;

          if(data.list.length){
            this.$store.commit('bitMap',true)
          }else{
            this.$store.commit('bitMap',false)
          }
          this.$Indicator.close();
        })
      },
      //所有订单
      allOrder() {
        let newobj = Object.assign({

          page: 1,
          type: 1
        }, obj);

        let sign = this.$md5(objKeySort(newobj) + APIUrl.appsecret);
        let params = Object.assign({
          sign: sign,
          num:this.nums,
          select_zid:this.select_zid,
          status:this.titleId
        }, newobj);
        this.$Indicator.open('加载中...');
        this.order(params)

      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      //操作
      operate(id, url, msg) {
        let newobj = Object.assign({
          id: id
        }, obj);
        let sign = this.$md5(objKeySort(newobj) + APIUrl.appsecret);
        let params = Object.assign({
          sign: sign
        }, newobj);
        this.$get(APIUrl.root + url, params).then(res => {
          if(res.code != 200) {
            this.$Toast({
              message: res.msg,
              duration: 1000
            })
          } else {
            this.$Toast({
              message: msg,
              duration: 1000
            })
            this.allOrder()
          }
        })
      },
      //取消订单
      cancel(id) {
        this.operate(id, APIUrl.cancelOrder, "取消订单成功")
      },
      //确认收货
      confirm(id) {
        this.operate(id, APIUrl.receiveOrder, "确认收货成功")
      },
      //再来一单
      anotherOrder(id) {
        this.operate(id, APIUrl.oneMoreTime, "再来一单成功")
      },
      titleClick(data) {
        this.titleId = data.id
        this.allOrder();
      },

//翻页
      handleCurrentChange(val){
        let newobj = Object.assign({
          page: val,

          type: 1
        }, obj);

        let sign = this.$md5(objKeySort(newobj) + APIUrl.appsecret);
        let params = Object.assign({
          sign: sign,
          num:this.nums,
          select_zid:this.select_zid,
          status:this.titleId
        }, newobj);
        this.$Indicator.open('加载中...');
        this.order(params)
      }
    },
    mounted() {
      this.screenWidth =document.getElementById('width').offsetWidth;
      const that = this
      window.onresize=()=>{
        that.screenWidth =document.getElementById('width').offsetWidth;
      }
    },
    created() {
      this.childInfo()
      this.allOrder()
      //获取宽度

    }
  };
</script>
<style>.order_content .paging_box{display: flex;justify-content: flex-end;}</style>

