<style scoped="scoped">
  .shopcar_box .top_box {
    display: flex;
    justify-content: space-between;
    /*  margin-bottom: 35px; */
    /*      background: white;
     z-index: 5;
     height: 2em;
     position: fixed;
     width: 64.5%; */
  }

  .shopcar_box .top_box .time_box {
    color: #FF0000;
    font-family: Microsoft YaHei;
  }

  .shopcar_box .top_box .empty_box {
    color: #ef9428;
    font-family: Microsoft YaHei;
    text-align: end;
    cursor: pointer;
  }

  .shopcar_box .car_from table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    cursor: pointer;
  }

  .shopcar_box .car_from table .from_title {
    text-align: center;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(26, 26, 26, 1);
  }

  .shopcar_box .car_from table .from_title th {
    padding-bottom: 15px;
  }

  .shopcar_box .car_from table .from_title th:first-child {
    width: 5%;
  }

  .shopcar_box .car_from table td {
    padding: 2px 0;
  }

  .shopcar_box .car_from table .from_item {
    border: 1px solid #E0E0E0;
  }

  .shopcar_box .car_from .imgwidth {
    height: 20%;
    width: 80px;
  }

  .shopcar_box .car_from .from_list_box .form_content_list {
    display: flex;
    text-align: center;
    justify-content: space-between;
    font-size: 16px;
    font-family: Microsoft YaHei;
    color: rgba(26, 26, 26, 1);
  }

  .shopcar_box .total_box {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .shopcar_box .total_box .check_all_box {
    display: flex;
    cursor: pointer;
  }

  .shopcar_box .total_box .check_all_box div:hover {
    color: #1a1a1a !important;
  }

  .shopcar_box .total_box .check_all_box div:nth-child(1) {
    color: #999;
  }

  .shopcar_box .total_box .check_all_box div:nth-child(2) {
    color: #999;
    margin-left: 30px;
  }

  .shopcar_box .total_box .total_txt {
    color: #1A1A1A;
  }

  .shopcar_box .total_box .total_txt span:nth-child(1) {
    color: #FF0000;
  }

  .shopcar_box .total_box .total_txt span:nth-child(2) {
    color: #808080;
  }

  .shopcar_box .total_box .total_txt .el-button {
    background: #009A44;
    border: 1px solid #009A44;
    color: #ffffff;
    padding: 10px 15px;
  }

  .shopcar_box .linkman_box {
    margin-top: 50px;
    /* cursor: pointer; */
  }

  .shopcar_box .linkman_box .linkman_title {
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #1A1A1A;
    margin-bottom: 15px;
  }

  .shopcar_box .linkman_box .linkman_content {
    border: 1px solid rgba(224, 224, 224, 1);
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .shopcar_box .linkman_box .linkman_content .linkman_left div {
    padding: 2px 0;
  }

  .shopcar_box .linkman_box .linkman_content .linkman_left .linkman_time {
    display: flex;
    align-items: center;
  }

  .shopcar_box .linkman_box .linkman_content .linkman_left .linkman_time .time_img input {
    border: none;
    font-size: 15px;
    width: 600px;
  }

  .shopcar_box .linkman_box .linkman_content .linkman_left .linkman_time .time_img input::-webkit-input-placeholder {
    color: #808080;
    font-size: 15px;
  }

  .shopcar_box .linkman_box .linkman_content .linkman_right {
    color: #009A44;
    cursor: pointer;
  }

  .shopcar_box .linkman_box .linkman_content .linkman_right a:hover {
    color: green;
  }

  .shopcar_box .linkman_box .linkman_chack {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<template>
  <div class="content_box" :data="tableData">
    <div v-if="bitmap" class="shopcar_box">
      <div class="top_box">
        <div class="time_box">
          请在（{{startime}}~{{endtime}}）之间下单
        </div>
        <div class="empty_box" @click="deletebuy">
          删除
        </div>
      </div>
      <div class="car_from">
        <el-dialog title="备注" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <el-input type="textarea" placeholder="请输入内容" v-model="remark2" maxlength="30"
                    @keydown.native="remarkInfo($event)" show-word-limit></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button @click="confirmRemark" size="mini" type='success'>确 定</el-button>
          </span>
        </el-dialog>
        <el-table ref="multipleTable" :data="myCart" @cell-click="oneclick" tooltip-effect="dark"
                  @selection-change="changeFun">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="商品图片" width="150">
            <template slot-scope="scope">
              <!-- <img class='imgwidth' :src="root+scope.row.img"> -->
              <el-image :src="scope.row.img" fit="contain" class='imgwidth'>
                <div slot="error" class="image-slot">
                  <img :src="defaultImg">
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" width="120" prop="title">
          </el-table-column>
          <el-table-column label="商品规格" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.attr==false">/</span>
              <span v-else>{{scope.row.attr.attr_title}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价(￥)" width="120">
            <template slot-scope="scope">
              <div v-if='is_look==1'>
                <span v-if="scope.row.attr==false">{{scope.row.price}}</span>
                <span v-else>{{scope.row.attr.attr_price}}</span>
              </div>
              <div v-else class='red'>***</div>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="100" prop="unit">
          </el-table-column>
          <el-table-column label="小计" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.attr==false"> {{(scope.row.cart_num*scope.row.price).toFixed(2)}}</span>
              <span v-else> {{(scope.row.cart_num*scope.row.attr.attr_price).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="addRemark(scope.row)">
                <img src="../../../static/img/remark.png" alt="">
                {{scope.row.remark}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="购买数量">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.cart_num" @change="handleChange(scope.row,scope.row.cart_num)"
                               :min="0"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="total_box">
        <div class="check_all_box">
          <div @click="all([...myCart])" :class="{green1:status1}">全选</div>
          <div @click="cancel([...myCart])" :class="{green1:status2}">取消</div>
        </div>
        <div class="total_txt">
          合计：<span>￥{{(parseFloat(totalPrice)+parseFloat(fare)).toFixed(2)}}</span>
          <span>（含运费：￥{{fare}}）</span>
        </div>
      </div>
      <div class="linkman_box">
        <div class="linkman_title select_count">
          <div> 收货人信息</div>
          <div>选择子账号:
            <el-select v-model="value" placeholder="选择子账号" @change="selectClick">
              <el-option key="当前账号" label="当前账号" value=" ">
              </el-option>
              <el-option v-for="item in options" :key="item.nickname" :label="item.nickname" :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="linkman_content">
          <div class="linkman_left">
            <div>姓名：{{nickname}}</div>
            <div>电话：{{phone}}</div>
            <div>地址：{{address}}</div>
          </div>
          <div class="linkman_right" @click='modifyCount'>
            修改
          </div>
        </div>
      </div>
      <div class="linkman_box">
        <div class="linkman_title">
          配送时间及备注
        </div>
        <div class="linkman_content">
          <div class="linkman_left">
            <div class="linkman_time">
              <div class="time_txt">配送日期：</div>
              <div class="time_img pointer">
                <el-date-picker value-format="yyyy-MM-dd" v-model="sendTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <div class="linkman_time">
              <div class="time_txt">配送时间：</div>
              <el-select v-model="sendTimeinfo" placeholder="请选择" @change="deliveryTime">
                <el-option
                  v-for="item in delivery_time_list"
                  :key="index"
                  :label="item.delivery_time_info"
                  :value="item.delivery_time_info">
                </el-option>
              </el-select>
            </div>
            <div class="linkman_time">
              <div class="time_txt">备注：</div>
              <div class="time_img">
                <input type="text" v-model='remark' placeholder="请告诉我们需要注意的地方~" value=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="linkman_box">
        <div class="linkman_title">
          支付方式
        </div>
        <div class="linkman_chack">
          <el-radio v-model="radio" label="1">货到付款</el-radio>
          <el-button @click="checkOrder" type='success'>确认并下单</el-button>
        </div>
        <div style="height:50px;"></div>
      </div>
      <div v-if="display">
        <deletecar></deletecar>
      </div>
    </div>
    <div v-else class="emptyCart" :style="{height:heightImg-150+'px'}" id="leftnav">
      <img src="./../../../static/img/pc_cart.png">
    </div>
  </div>
</template>
<script>
  import * as types from '../../../config/types'
  import APIUrl from '../../../config/apiurl'
  import deletecar from './../public/deletebuy'
  import {mapState, mapMutations} from 'vuex'

  let obj = {appid: APIUrl.appid, timeStamp: APIUrl.timeStamp}
  export default {
    components: {
      // 'car': () =>import('../public/tabbar.vue'), // 退出登录
    },
    data () {
      return {
        defaultImg: '',
        root: APIUrl.root,
        status1: false,
        status2: false,
        totalPrice: 0,
        cartId: [],
        cartInfo: [],
        sendTime: '',
        name: '123',
        mobile: '',
        address: '',
        multipleTable: [],
        radio: '1',
        options: [],
        value: '当前账号',
        select_zid: '',
        selectCart: [],
        nickname: '',
        phone: '',
        address: '',
        heightImg: '',
        remark: '',
        remark2: '',
        dialogVisible: false,
        remarks: '',
        fare: '',
        startime: '',
        endtime: '',
        statu: this.$route.query.statu,
        cartlist: [],
        delivery_time_list: [{delivery_time_info: '不限', delivery_time_id: ''}],
        delivery_time_id: '',
        sendTimeinfo: '不限'
      }
    },
    watch: {

      myCart () {

        if (this.statu != 0) {
          this.$nextTick(() => {
            let rows = this.myCart
            this.checked(rows, true)
          })
        } else {
          this.$nextTick(() => {
            let row = JSON.parse(localStorage.getItem('localKey'))
            for (let i = 0; i < this.myCart.length; i++) {
              for (let j of row) {
                if (this.myCart[i].id == j.id) {
                  this.$refs.multipleTable.toggleRowSelection(this.myCart[i], true)
                }
              }
            }
          })
        }
      }
    },

    computed: {
      ...mapState([
        'myCart',
        'show',
        'bitmap',
        'countInfo',
        'is_look',
        'price'
      ])
    },
    components: {
      deletecar
    },

    methods: {
      ...mapMutations(['firstNav', 'checkCart', 'selectCar']),
      remarkInfo (event) {

        if (event.keyCode == 13) {
          this.confirmRemark()
          event.preventDefault() // 阻止浏览器默认换行操作
          return false
        }

      },
      deliveryTime (e) {
        for (let i of this.delivery_time_list) {
          if (i.delivery_time_info == e) {
            this.delivery_time_id = i.delivery_time_id
            this.sendTimeinfo = i.delivery_time_info
          }
        }

      },
      oneclick (rows, column, cell, event) {
        if (column.label == '购买数量') {
          let test = []
          test.push(rows)
          this.checked(test, false)
          this.checked(test, true)
        }
      },
      addRemark (item) {
        let rows = this.$store.state.carts
        this.dialogVisible = true
        this.remark2 = item.remark
        this.remarks = item
      },
      confirmRemark () {
        let item = this.remarks
        let newobj

        if (item.attr.length != 0) {
          newobj = Object.assign({item_id: item.attr.item_id, attr_id: item.attr.id, remark: this.remark2}, obj)
        } else {
          newobj = Object.assign({item_id: item.id, attr_id: 0, remark: this.remark2}, obj)
        }

        let newsign = this.$md5(objKeySort(newobj) + APIUrl.appsecret)
        let params = Object.assign({sign: newsign, active: APIUrl.active}, newobj)
        this.$post(APIUrl.root + APIUrl.itemRemark, params).then(res => {
          if (res.code == 200) {
            this.$Toast({
              message: '修改备注成功'
            })
            this.dialogVisible = false
            this.$api.cartList()
          }
        })
      },
      //勾选商品合计价钱
      total (price) {
        this.cartId = []

        let totalPrice = []
        for (let i of price) {

          if (i.attr.length == 0) {
            totalPrice.push(i.cart_num * i.price)
          } else {
            totalPrice.push(i.cart_num * i.attr.attr_price)
          }
          this.cartId.push(i.cart_id)

        }
        let sum = 0

        for (let i of totalPrice) {

          sum += i
        }
        this.totalPrice = sum

      },
      //复选框改变的值
      changeFun (val) {
        this.selectCart = val
        this.total(val)
      },
      //自增加入购物车
      handleChange (item, value) {
        this.$api.addCart(item, value)
        this.total(this.selectCart)
      },
      selectClick (event) {
        this.select_zid = event.zid
        let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret)
        let params = Object.assign({sign: sign, active: APIUrl.active}, obj)
        this.$get(APIUrl.root + APIUrl.addInfo, params).then(res => {
          let data = res.data

          if (res.code != 200) {
            this.$Toast({
              message: res.msg
            })
          } else {
            if (this.select_zid) {
              this.nickname = event.value
              this.phone = event.mobile
              this.address = event.address
            } else {
              this.nickname = data.userInfo.nickname
              this.phone = data.userInfo.phone
              this.address = data.userInfo.address

            }
          }
        })

      },
      //修改子账号
      modifyCount () {
        if (this.select_zid) {
          this.firstNav('user')
          this.$router.push({path: 'loginAccount', query: {id: this.select_zid}})
        } else {
          this.firstNav('user')
          this.$router.push({path: 'infomation'})
        }

      },

      deletebuy () {

        if (!this.selectCart.length) {
          this.$Toast({
            message: '请选择要删除的商品'
          })
          return

        }

        this.$store.commit('changedisplay', 'clear')
        this.selectCar(this.cartId)
      },
      //检查订单能否直接下单
      checkOrder () {

        if (!this.selectCart.length) {
          this.$Toast({
            message: '请选择商品'
          })
          return

        }
        let newobj = Object.assign({send_time: this.sendTime}, obj)
        let newsign = this.$md5(objKeySort(newobj) + APIUrl.appsecret)
        let params = Object.assign({sign: newsign, active: APIUrl.active}, newobj)

        if (this.select_zid) {
          this.$MessageBox.confirm('', {
            message: '信用金即将用完，请及时结账（可以直接下单）？',
            title: '提示',
          }).then(action => {
            if (action == 'confirm') { //确认的回调
              this.order()
            }
          })

          return

        }
        this.$get(APIUrl.root + APIUrl.testOrder, params).then(res => {
          let code = res.code
          if (res.data.on_delivery == 1) {
            switch (code) {

              case 101:
                this.$MessageBox.confirm('', {
                  message: '信用金即将用完，请及时结账（可以直接下单）？',
                  title: '提示',
                }).then(action => {
                  if (action == 'confirm') { //确认的回调
                    this.order()
                  }
                })
                break
              case 300:
                this.$MessageBox.confirm('', {
                  message: '信用金即将用完，请及时结账（可以直接下单）？',
                  title: '提示',
                }).then(action => {
                  if (action == 'confirm') { //确认的回调
                    this.order()
                  }
                })
                break
              case 301:
                this.$MessageBox.confirm('', {
                  message: '信用金即将用完，请及时结账（可以合并订单）？',
                  title: '提示',
                }).then(action => {
                  if (action == 'confirm') { //确认的回调
                    this.mergeOrder()
                  }
                }).catch(err => {
                  if (err == 'cancel') { //取消的回调
                    this.$MessageBox.confirm('', {
                      message: '直接下单？',
                      title: '提示',
                    }).then(action => {
                      if (action == 'confirm') { //确认的回调
                        this.order()
                      }
                    })
                  }
                })
                break

              case 500:
                this.$Toast({
                  message: '信用金已用完，不能下单',
                  duration: 1200
                })
                break

              case 200:
                this.$MessageBox.confirm('', {
                  message: '可以合并订单？',
                  title: '提示',
                }).then(action => {
                  if (action == 'confirm') { //确认的回调
                    this.margeOrder()
                  }
                }).catch(err => {
                  if (err == 'cancel') { //取消的回调
                    this.$MessageBox.confirm('', {
                      message: '直接下单？',
                      title: '提示',
                    }).then(action => {
                      if (action == 'confirm') { //确认的回调
                        this.order()
                      }
                    })
                  }
                })
                break
            }
          } else {
            this.$MessageBox.confirm('', {
              message: '确定下单？',
              title: '提示',
            }).then(action => {
              if (action == 'confirm') { //确认的回调
                this.order()
              }
            })
          }
        })
      },
      //直接下单
      order () {
        let newobj = Object.assign({send_time: this.sendTime}, obj)
        let newsign = this.$md5(objKeySort(newobj) + APIUrl.appsecret);
        let info=this.sendTimeinfo;
        if(info=='不限'){
          info='';
        }
        let params = Object.assign({
          sign: newsign,
          remark: this.remark,
          cartIds: this.cartId,
          select_zid: this.select_zid,
          active: APIUrl.active,
          delivery_time_id: this.delivery_time_id,
          delivery_time_info:info
      },
        newobj
      )
        this.$post(APIUrl.root + APIUrl.pcAddOrder, params).then(res => {
          if (res.code == 200) {
            this.$Toast({
              message: '下单成功',
              duration: 1000
            })

            this.$api.getCartNum()
            this.firstNav('order')
            this.$router.push({path: 'allOrders'})
          } else if (res.code == 500) {
            this.$Toast({
              message: '服务器内部错误,请稍候再试',
              duration: 1000
            })
          } else {
            this.$Toast({
              message: '请刷新网页重试',
              duration: 1000
            })
          }
        })
      },
      //合拼下单
      mergeOrder () {
        let newobj = Object.assign({send_time: this.sendTime}, obj)
        let newsign = this.$md5(objKeySort(newobj) + APIUrl.appsecret)
        let params = Object.assign({
          sign: newsign,
          cartIds: this.cartId,
          select_zid: this.select_zid,
          active: APIUrl.active
        }, newobj)
        this.$post(APIUrl.root + APIUrl.pcMergeOrder, params).then(res => {
          if (res.code != 200) {
            this.$Toast({
              message: '请刷新网页重试',
              duration: 1000
            })
          } else {
            this.$Toast({
              message: '合拼订单成功',
              duration: 1000
            })
            this.$api.getCartNum()
            this.firstNav('order')
            this.$router.push({name: 'allOrders'})
          }
        })
      },

      checked (rows, statu) {
        this.$nextTick(() => {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row, statu)
            })
          }
        })
      },
      //全选
      all (rows) {
        this.status1 = true
        this.status2 = false
        this.checked(rows, true)

      },
      //取消全选
      cancel (rows) {
        this.status1 = false
        this.status2 = true
        this.checked(rows, false)

      },
      //选择账号
      selectCount () {
        let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret)
        let params = Object.assign({sign: sign, active: APIUrl.active}, obj)
        this.$get(APIUrl.root + APIUrl.addInfo, params).then(res => {

          let data = res.data
          for (let i of data.delivery_time_list) {
            this.delivery_time_list.push(i)
          }
          this.startime = data.open_time
          this.endtime = data.end_time
          this.nickname = data.userInfo.nickname
          this.phone = data.userInfo.phone
          this.address = data.userInfo.address
          this.options = data.childList
          this.fare = data.fare
        })
      },

    },
    mounted () {

      this.heightImg = document.getElementById('leftnav2').offsetHeight
      const that = this
      window.onresize = () => {
        that.heightImg = document.getElementById('leftnav2').offsetHeight
      }

    },
    created () {
      //账号信息
      this.selectCount()
      //购物车列表

      this.$api.cartList()
      this.defaultImg = localStorage.getItem('defaultImg')
      if (localStorage.getItem('token')) { // 判断是否登录
        var result = JSON.parse(localStorage.getItem('token'))
        var data = new Object()
        data.token = result.token
        var str = JSON.stringify(data)
        this.$store.commit(types.LOGIN, str)
      }

      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate() + 1

      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }

      this.sendTime = year + '-' + month + '-' + day

    }
  }

</script>
<style lang="less">
  .car_from {
    padding-top: 20px;

    .el-table td {
      padding: 7px 0;
    }
  }


  .car_from .el-table td:first-child {
    border-left: 1px solid #efefef;
  }

  .car_from .el-table td:last-child {
    border-right: 1px solid #efefef;
  }

  .car_from .el-input-number {
    line-height: 23px;
  }

  .car_from .el-input__inner {
    height: 25px;
  }

  .content_box .emptyCart {
    border: 2px solid #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .car_from .el-input-number {
    width: 130px;
  }

  .car_from .el-input-number .el-input__inner {
    padding: 0;
  }

  .car_from .el-input-number__decrease,
  .car_from .el-input-number__increase {
    width: 23px;
  }

  .select_count {
    justify-content: space-between;
    align-items: baseline;
    display: flex;
  }

  .select_count .el-select > .el-input {
    width: 140px !important;
  }

  .select_count .el-input__inner {
    color: green;
    border: none;
  }

  .car_from .el-table {
    position: static !important;
  }

  .shopcar_box textarea {
    width: 100%;
    height: 100px;
  }

  .shopcar_box .el-dialog__body {
    padding: 0 20px;
  }

  .car_from .el-table .cell {
    text-align: inherit;
    color: black !important;
  }

  .green1 {
    color: green !important;
  }

  .car_from .el-table .cell .el-button--text {
    color: black !important;
  }

  // .car_from th:nth-child(8){text-align:center;}
  .car_from .el-table__body tr td:nth-child(8) span {
    text-align: left;
    display: block;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .time_img .el-icon-circle-close {
    display: none;
  }

  .linkman_time .el-input__icon {
    line-height: 1;
  }
  .el-image {
    z-index: -1;}
</style>
