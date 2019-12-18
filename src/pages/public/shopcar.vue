<style>
  .shop_box {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 40px;
    background: #434343;
    color: #ffffff;
    z-index: 99;
    cursor: pointer;
  }

  .shop_box .shop_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 100%;
  }

  .shop_box .shop_item div:nth-child(1) {
    margin-bottom: 10px;
    font-size: 20px;
    color: #009A44;
  }

  .shop_box .shop_item div:nth-child(2) {
    margin-bottom: 10px;
    color: #ffffff;
    writing-mode: vertical-rl;
  }

  .shop_box .shop_item div:nth-child(3) {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%;
    background: #F3B42C;
    color: #FFFFFF;
  }
</style>
<template>
  <article>
    <div class="shop_box" v-if="hiddencart" @click="car([...myCart])">
      <div class="shop_item">
        <div>
          <i class="fa fa-shopping-cart"></i>
        </div>
        <div>购物车</div>
        <div style="font-size:8px;">
          <span v-if="carnums>99">99+</span><span v-else> {{carnums||0}}</span>
        </div>
      </div>
    </div>
    <el-drawer :modal='false' :before-close="handleClose" :visible.sync="discar" :direction="direction" custom-class="buycar">
      <el-container>
        <el-aside @click.native="car1">
          <div>
            <i class="fa fa-shopping-cart"></i>
          </div>
          <div>购物车</div>
          <div style="font-size:8px;">
            <span v-if="carnums>99">99+</span><span v-else> {{carnums||0}}</span>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <div class="details">
              <i class="el-icon-delete"></i>
              <span @click='deletebuy([myCart[0]])' class="pointer"> 删除</span>
              <span></span>
            </div>
            <div v-if="bitmap">
              <el-table :data="myCart" ref="multipleTable" @cell-click="oneclick" :show-header="false" @selection-change="changeFun">
                <el-table-column type="selection"></el-table-column>
                <!--   <el-table-column width="40">
                  <template slot-scope="scope"><img :src="'http://test.caidj.cn' +scope.row.img "></template>
                </el-table-column> -->
                <el-table-column>
                  <template slot-scope="scope">{{scope.row.title}}
                    <span class="red">
                      <span v-if="scope.row.attr==false">
                        x{{scope.row.price}}</span>
                      <span v-else>
                        x{{scope.row.attr.attr_price}}</span></span>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.cart_num" @change="handleChange(scope.row,scope.row.cart_num)" :min="0" label="描述文字"></el-input-number>
                  </template>
                </el-table-column>
              </el-table>
              <span class="all pointer" :class="{red:all}" @click="toggleSelection([...myCart])">{{select}} </span>
              <span class="price">￥{{totalPrice.toFixed(2)}}</span>
            </div>
            <div v-else class="noimg">
              <i class="el-icon-shopping-cart-2"></i>
              <p>购物车还是空的</p>
            </div>
          </el-main>
          <el-footer>
            <div class="pointer" @click="pay">结算</div>
          </el-footer>
        </el-container>
      </el-container>
      <div v-if="show">
        <deletecar></deletecar>
      </div>
    </el-drawer>
  </article>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import APIUrl from '../../../config/apiurl'
import deletecar from './deletebuy'
let obj = {
  appid: APIUrl.appid,
  timeStamp: APIUrl.timeStamp,
}
export default {
  data() {
    return {
      select: '全选',
      all: true,
      cartId: [],
      multipleTable: [],
      selectgoods: [],
      showimg: true,
      direction: 'rtl',
      totalPrice: 0,
      // myCart:[]
    }
  },
  watch: {

    myCart() {
      this.$nextTick(() => {
        let rows = this.myCart;
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        }

      })
    },
  },
  computed: {
    ...mapState([
      'token', 'discar',
      'myCart',
      'show', 'hiddencart', 'bitmap', 'carnums', 'carts'
    ])
  },
  components: {
    deletecar
  },
  methods: {
    ...mapMutations(['displaycar', 'changedisplay', 'selectCar', 'changeNum', 'hiddenCar', 'jumppage', 'firstNav']),
    handleClose(done) {
      this.displaycar();
    },
    //复选框改变时获取的值
    oneclick(rows, column, cell, event) {
      let test = []
      test.push(rows);
      this.checked(test, false)
      this.checked(test, true)
    },
    changeFun(val) {
      this.cartId = [];
      let totalPrice = []
      this.selectgoods = val;

      if (!val.length) {
        this.all = false;
        this.select = '全选';
      } else {
        this.all = true;
        this.select = '取消';
      }

      localStorage.setItem("localKey", JSON.stringify(val))

      for (let i of val) {

        if (i.attr.length == 0) {
          totalPrice.push(i.cart_num * i.price)
        } else {
          totalPrice.push(i.cart_num * i.attr.attr_price)
        }
        this.cartId.push(i.cart_id)
      }
      let sum = 0;
      for (let i of totalPrice) {
        sum += i;
      }
      this.totalPrice = sum;
    },
    checked(rows, status) {
      rows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row, status);
      });
    },
    //全选
    toggleSelection(rows) {
      this.all = !this.all
      if (this.all) {
        this.select = '取消';
        this.checked(rows, true)
      } else {
        this.select = '全选'
        this.checked(rows, false)
      }

    },
    //自增加入购物车
    handleChange(item, value) {
      if (item.is_float == 1) {
        if (!Number.isInteger(value)) {
          this.$Toast({
            message: '购买数量不能为小数',
            duration: 1000
          })
          return;
        }
      }
      this.$api.addCart(item, value);

      let totalPrice = []
      for (let i of this.selectgoods) {
        totalPrice.push(i.cart_num * i.price)
      }
      let sum = 0;
      for (let i of totalPrice) {
        sum += i;
      }
      this.totalPrice = sum;

    },
    //右边购物车
    rightCar() {
      this.$api.cartList()
    },
    car1() {
      this.displaycar();
    },
    car() {

      if (this.token) {

        this.rightCar();

        this.displaycar();
      } else {
        this.jumppage(true)
      }
    },
    //是否显示清空购物车
    deletebuy() {
      if (!this.selectgoods.length) {
        this.$Toast({
          message: '请选择要删除的商品'
        })
        return;

      }

      this.changedisplay('clear');
      this.selectCar(this.cartId)
    },
    //获取购物车数量和总价
    getCountNum() {
      this.$api.getCartNum();
    },
    pay() {
     if (!this.selectgoods.length) {
        this.$Toast({
          message: '请选择要结算的商品'
        })
        return;

      }

      if (this.bitmap == false) {
        this.$Toast({
          message: '请添加商品到购物车中'
        })
        return;
      }

      this.firstNav('shoppingCar');
      this.$router.push({ name: 'shoppingCar', query: { statu: 0 } });
      this.hiddenCar(false);
      this.displaycar();
    }
  },
  mounted() {

  },
  created() {

    this.getCountNum();

  }


};

</script>
<style>
.buycar {
  width: 400px !important;
}

.buycar .el-input-number__increase,
.buycar .el-input-number__decrease {
  width: 17px;
}

.buycar .el-input-number {
  line-height: 1.32;
}

.buycar .el-input__inner {
  height: 19px;
}

.buycar .el-table td,
.el-table th {
  padding: 6px 0 0 0;
}

.buycar .el-input-number .el-input__inner {
  padding-left: 0px;
  padding-right: 0px;
}

.buycar .el-input-number {
  width: 100%;
}

.buycar .el-table .cell {
  padding-left: 0;
  white-space: nowrap;
  overflow: hidden;
}

.buycar .el-table td {
  vertical-align: top;
}

.buycar .all {
  float: right;
  color: green;
  margin-right: 2%;
}

.buycar .el-icon-delete {
  color: green;
}

</style>
