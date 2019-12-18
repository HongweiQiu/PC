<template>
  <article>
    <div class="content_box">
      <div class="order_box" id="width">
        <div class="fixed order_top " :style="{width:screenWidth+'px'}">
          <div class="top_left">
            <div class="top_left_item" v-for="item in title" :class="{'on':titleId==item.id}" @click="titleClick(item)">
              <span v-if="item.id == 1">
                <p v-if='statusInfo.audited>99'>99<i class='movetop'>+</i></p>
                <p v-else>{{statusInfo.audited}}</p>
              </span>
              <span v-if="item.id == 2">
                <p v-if='statusInfo.stock>99'>99<i class='movetop'>+</i></p>
                <p v-else>{{statusInfo.stock}}</p>
              </span>
              <div class='green'>{{item.name}}</div>
            </div>
          </div>
          <div class=" top_right">
            <div>选择子账号：</div>
            <div>
              <el-select v-model="value" placeholder="选择子账号" @change="selectClick">
                <el-option label="当前账号" value="">
                </el-option>
                <el-option v-for="item in options" :key="item.nickname" :label="item.nickname" :value="item.zid">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="order_content" v-if='bitmap'>
          <div v-if="hidden">
            <div class="export"></div>
            <div class="exportinfo">
              <div class="h1 ">
                <h1 class="el-icon-toilet-paper">导出订单 </h1><i class="el-icon-close pointer" @click="hidden=false"></i>
              </div>
              <div class="choose">
                <div>
                  <el-radio-group v-model="radio" text-color="#000">
                    <el-radio :label="0">仅订单</el-radio>
                    <el-radio :label="1">附带商品</el-radio>
                  </el-radio-group>
                </div>
                <div> 配送时间 : <el-date-picker v-model="value2" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
                <div>
                  <el-button @click="hidden=false">取消</el-button>
                  <el-button @click="determine" type='success'>确定</el-button>
                </div>
              </div>
            </div>
          </div>
          <table>
            <tr :style="{width:screenWidth-4+'px'}" class="fixed regular">
              <th align="left">商品 </th>
              <th align="left">数量</th>
              <th align="left">金额(￥)</th>
              <th align="left">订单状态</th>
              <th align="left">操作</th>
              <th align="left" class="right">
                <i class="fa fa-share-square-o pointer" @click="hidden=true"> 导出</i>
              </th>
            </tr>
            <tr class='movetr'></tr>
            <tr class="list_box" v-for="item in orderlist">
              <td class="divcss5-td-1" >
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
                  <span class="cancel pointer" @click="cancel(item.id)">
                    取消订单
                  </span>
                </div>
                <!--<div class="list_txt list_btn pay" v-if="item.order_status==3">
									<span class="pay">
										马上支付
									</span>
								</div>-->
                <div class="list_txt list_btn" v-if="item.order_status==3">
                  <span class="again pointer" @click="anotherOrder(item.id)">
                    再来一单
                  </span>
                </div>
                <div class="list_txt list_btn" v-if="item.order_status==2">
                  <span class="affirm pointer" @click="confirm(item.id)">
                    确认收货
                  </span>
                </div>
                <div class="list_txt list_btn" v-if="item.order_status==3">
                  <span class="logistics pointer">
                    <router-link :to="{name:'map',query: { id: item.id }}">查看物流</router-link>
                  </span>
                </div>
              </td>
              <td>
                <div class="list_time">
                  配送时间：{{item.send_time}}
                </div>
                <div class="list_examine pointer">
                  <router-link :to="{name:'orderDetails',query: { id: item.id }}"> 查看</router-link>
                </div>
              </td>
            </tr>
          </table>
          <div class="paging_box">
            <div class="block pages flex">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="nums" layout="prev, pager, next" :total="total">
              </el-pagination>
              前往 <el-input v-model='page' size="small" class="turnpage" @blur="blur"></el-input>页 　
              <el-button size="small" type="success" 　@click="turnpage">
                跳转
              </el-button>
            </div>
          </div>
        </div>
        <div class="order_placeholder_figure" v-else>
          <img src="../../../static/img/pc_order_form.png" />
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import * as types from '../../../config/types'
import APIUrl from '../../../config/apiurl'
import { mapState } from 'vuex'
let obj = {
  appid: APIUrl.appid,
  timeStamp: APIUrl.timeStamp
};
export default {
  components: {},

  data() {
    return {
      isFirstEnter: false,
      hidden: false,
      radio: 0,
      value2: '',
      orderlist: [],
      total: 0,
      page: 1,
      nums: 10,
      title: [{
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
      select_zid: '',
      statusInfo: [],
      screenWidth: '',
         bitmap:true,
    }
  },

  computed: {

    // ...mapState(['bitmap'])
  },
  methods: {
    blur() {
      let int = Math.ceil((this.total / this.nums))
      console.log(int)
      if (this.page <= 0) {
        this.page = 1
      }
      if (this.page > int) {
        this.page = int
      }
    },
    turnpage() {
      let val = this.page;
      this.handleCurrentChange(val)
    },
    determine() {
      if (!this.value2) {
        this.$Toast({
          message: '请选择开始日期和结束日期'
        })
        return;
      }
      let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
      let params = Object.assign({ sign: sign, dateArr: this.value2, type: this.radio }, obj);
      this.$axios({
          url: APIUrl.root + APIUrl.orderExport,
          method: 'get',
          params: params,
          headers: {
            'Content-Type': 'application/json; application/octet-stream'
          },
          responseType: 'blob',
        })
        .then(res => {

          if (!res) return
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
          this.hidden = false
        })
        .catch(err => {
          console.log(err);
        })
    },

    selectClick(event) {

      this.select_zid = event;

      this.allOrder();
      this.status();
    },
    //子账户列表
    childInfo() {
      let sign = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret);
      this.$get(APIUrl.root + APIUrl.childInfo, {
        appid: APIUrl.appid,
        timeStamp: APIUrl.timeStamp,
        sign: sign
      }).then(res => {
        if (res.code == 200) {
          this.options = res.data;
        }
      })
    },
    order(params) {
      this.$get(APIUrl.root + APIUrl.orderList, params).then(res => {
        let data = res.data;
        this.orderlist = data.list;
        this.total = data.total;

        if (data.list.length) {
          this.bitmap=true
        } else {
          this.bitmap=false;
        }
        this.status();
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
        num: this.nums,
        select_zid: this.select_zid,
        status: this.titleId
      }, newobj);
      this.$Indicator.open('加载中...');
       this.order(params)
     
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    //操作
    operate(id, url, msg, tip) {
      let newobj = Object.assign({
        id: id
      }, obj);
      let sign = this.$md5(objKeySort(newobj) + APIUrl.appsecret);
      let params = Object.assign({
        sign: sign
      }, newobj);
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$get(APIUrl.root + url, params).then(res => {
          if (res.code != 200) {
            this.$Toast({
              message: res.msg,
              duration: 1000
            })
          } else {

            this.$Toast({
              message: msg,
              duration: 1000
            })
            setTimeout(() => { this.allOrder();  this.$api.getCartNum();}, 1000)
          }
        })
      })

    },
    //取消订单
    cancel(id) {
      this.operate(id, APIUrl.cancelOrder, "取消订单成功", '是否取消订单?')
    },
    //确认收货
    confirm(id) {
      this.operate(id, APIUrl.receiveOrder, "确认收货成功", "是否确认收货?")
    },
    //再来一单
    anotherOrder(id) {
      this.operate(id, APIUrl.oneMoreTime, "再来一单成功,已成功加入到购物车", "是否再来一单?");

    },
    titleClick(data) {
      this.titleId = data.id
      this.allOrder();
    },

    //翻页
    handleCurrentChange(val) {
      let newobj = Object.assign({
        page: val,
        type: 1
      }, obj);

      let sign = this.$md5(objKeySort(newobj) + APIUrl.appsecret);
      let params = Object.assign({
        sign: sign,
        num: this.nums,
        select_zid: this.select_zid,
        status: this.titleId
      }, newobj);
      this.$Indicator.open('加载中...');
      this.order(params)
    },
    status() {

      let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
      let params = Object.assign({ sign: sign, status: [0, 1, 2, 3, 4], select_zid: this.select_zid, }, obj)
      this.$get(APIUrl.root + APIUrl.censusNum, params).then(res => {
        let data = res.data;
        this.statusInfo = data

      })
    }

  },
  mounted() {

    this.screenWidth = document.getElementById('width').offsetWidth;
    const that = this
    window.onresize = () => {
      that.screenWidth = document.getElementById('width').offsetWidth;
    }
  },
  created() {
    this.status()
    this.childInfo()
    this.allOrder()
    //获取宽度

  }
};

</script>
<style>
.order_content .paging_box {
  display: flex;
  justify-content: flex-end;
}

.regular {
  display: flex;
  justify-content: space-around;
  background: white;
  border: 1px solid #efefef;
}

.regular th:nth-child(1) {
  width: 19.9%;
}

.regular th:nth-child(2) {
  width: 21.6%;
}

.regular th:nth-child(3) {
  width: 9.9%;
}

.regular th:nth-child(4) {
  width: 9.9%;
}

.regular th:nth-child(5) {
  width: 16.9%;
}

.regular th:nth-child(6) {
  width: 21.4%;
}

.movetr{display: block;margin-top:40px;}
/* .order_box .order_content .list_box:nth-child(2) {
  border-top: 37px solid #efefef;
} */

.el-button--primary {
  background: green !important;
}

.movetop {
  position: fixed;
  margin-top: -3px;
}

</style>
