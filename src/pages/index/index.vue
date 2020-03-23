<template>
  <div class="content_box pcindex">
    <div class="inp_box ">
      <el-input v-model="input" placeholder="请输入商品名称" @keyup.native.enter="search" clearable></el-input>
      <el-button type="success" @click="search">
        <img src="../../../static/img/pc_search.png" alt="">
      </el-button>
    </div>
    <div class="whole">
      <div class="indexsort">
        <ul>
          <li v-for="(item,index) in indexAd" v-if="!num.test(item.id)">
            <img :src="item.img_url">
            <div><span>{{item.title}}</span>
              <span class="pointer" @click="enter(item)">进入</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="today">
        <div v-if="display_car" class="mask">
        </div>
        <div class="carInfo" v-if="display_car">
          <i class="el-icon-close pointer" @click="display_car=false"></i>
          <div>
            <div class='enter'>
              <img :src="attr.img">
              <div>
                <span>{{attr.title}}</span>
                <span class="gray">{{attr.describe}}</span>
                <span class="red" v-if="attr.attr.length">￥{{price}}/{{unit}}</span>
                <span class="red" v-else>￥{{attr.price}}/{{attr.unit}}</span>
              </div>
            </div>
            <div class="attr">
              <div v-if="attr.attr.length">
                <p>选择规格</p>
                <span class="pointer" :class="{'choose_attr':choose==item.attr_title}" v-for="(item,index) in attr.attr" @click="select(item)">{{item.attr_title}}</span>
              </div>
              <div>
              </div>
            </div>
            <div class="buynums">
              <div> 购买数量　
                <el-input-number v-model="selectnum" :min="0" @keyup.native.enter='determine'></el-input-number>
              </div>
              <span @click="determine" 　class="pointer">确定</span>
            </div>
          </div>
        </div>
        <div class="note">
          <h1 class="pointer">今日精选</h1><span class="square"></span>
          <img src="../../../static/img/horn.png">
          <el-carousel style="width:63%;height:20px;" arrow="never">
            <el-carousel-item v-for="item in 4" :key="item" style="height: 20px;">
              <span id="scroll">{{public_msg}}</span>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="bitmap" class="goods" id="mask">
          <div class='sort pointer' v-for="(item,index) in indexItem" @click="shopping(item)">
            <p> {{item.title}}</p>
            <!-- <img :src="root+item.img"> -->

             <el-image :src="item.img" fit="contain">
      <div slot="error" class="image-slot">
          <img :src="defaultImg">
      </div>
    </el-image>
            <div class="judge_attr">
              <div class="specs">
                <span v-if="item.attr.length>0">
                  <span class="orange">多规格</span>
                  <span class="red bottom">
                    <span v-if="is_look==1">￥{{item.area_price}}</span>
                    <span v-else>***</span>
                  </span>
                </span>
                <span v-else class="red">
                  <span class="none"></span>
                  <span v-if="is_look==1">￥{{item.area_price}}/{{item.unit}}</span>
                  <span v-else>***</span>
                </span>
              </div>
              <i class="el-icon-shopping-cart-2 "></i>
            </div>
          </div>
          <div v-if="bitmap" class="paging_box">
            <div class="block flex">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="nums" layout="prev, pager, next" :total="total">
              </el-pagination>
              前往 <el-input v-model='page' size="small" class="turnpage" @blur="blur"></el-input>页 　
              <el-button size="small" type="success" 　@click="turnpage">
                跳转
              </el-button>
            </div>
          </div>
        </div>
        <img v-if="bitmap==false" src="../../../static/img/nogoods.png" class="nogoods">
      </div>
    </div>
  </div>
</template>
<script>
import APIUrl from '../../../config/apiurl'
import { mapMutations, mapState } from 'vuex'

let obj = { appid: APIUrl.appid, timeStamp: APIUrl.timeStamp }

export default {
  components: {
    // 'car': () =>import('../public/tabbar.vue'), // 退出登录
  },
  data() {
    return {
      defaultImg:'',
      root:APIUrl.root,
      num: '',
      screenWidth: '',
      input: '',
      indexItem: [],
      public_msg: '',
      indexAd: [],
      total: '',
      nums: 12,
      bitmap: true,
      display_car: false,
      selectnum: 0,
      attr: '',
      choose: false,
      order: '',
      price: '',
      unit: '',
      is_look: '',
      page: 1,

    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapMutations(['jumppage', 'firstNav']),
    search() {
      if (!this.input) {
        this.$Toast({ message: '请输入查询条件' })
      } else {
        this.firstNav('classify')
        this.$router.push({ path: 'classify', query: { keyword: this.input } })
      }

    },
    blur() {
      let int = Math.ceil((this.total / this.nums))
      // console.log(int)
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
    cateList() {
      let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret)
      let params = Object.assign({ sign: sign,active:APIUrl.active}, obj)
      this.$get(APIUrl.root + APIUrl.indexAd, params).then(res => {
        this.indexAd = res.data.nav
        this.num = /^(1|2|3|4)$/;

        this.public_msg = res.data.public_msg;
        localStorage.setItem('logo', res.data.logo)
      })
    },
    loadInfo(url, params) {
      // this.$Indicator.open('正在加载中......')

      this.$get(APIUrl.root + url, params).then(res => {
              if(res.code==200) {
                let data = res.data;
                this.defaultImg = data.item_default;
                this.is_look = data.is_look;
                this.indexItem = data.list;
                // console.log(this.indexItem)

                  if (!data.list) {
                    this.bitmap = false;
                  } else {
                    this.bitmap = true;
                  }
                  this.total = data.total
                }


              })

      this.$Indicator.close()
    },
    shopInfo() {
   // console.log(12)
      let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret)
      let params = Object.assign({ sign: sign, num: this.nums, page: 1,active:APIUrl.active }, obj)
      this.loadInfo(APIUrl.indexItem, params)

    },
    handleCurrentChange(val) {

      let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret)
      let params = Object.assign({ sign: sign, num: this.nums, page: val,active:APIUrl.active }, obj)
      this.loadInfo(APIUrl.indexItem, params)

    },
    shopping(data) {
      if (this.token == null) {
        this.jumppage(true);
        return
      }
      if (data.status == 0) {
        this.$Toast({
          message: '该商品已下架',
          duration: 1000
        })
        return;
      }
      this.display_car = true
      this.choose = false;
      this.attr = data
      this.order = '',
        this.selectnum = 0;
      this.choose = data.attr[0].attr_title;
      this.price = data.attr[0].attr_price;
      this.unit = data.attr[0].unit;
    },
    select(data) {
      this.choose = data.attr_title
      this.price = data.attr_price;
      this.unit = data.unit;
      this.order = data
    },
    determine() {

      let nums = this.selectnum;
      if (nums == 0) {
        this.$Toast({
          message: '购买数量不能为零',
          duration: 2000
        })
        return;
      }


      if (this.attr.is_float == 1) {
        if (!Number.isInteger(nums)) {
          this.$Toast({
            message: '购买数量不能为小数',
            duration: 2000
          })
          return;
        }
      }
      let data = this.order;
      let obj = { appid: APIUrl.appid, timeStamp: APIUrl.timeStamp, item_num: this.selectnum }
      let joinSign;
      let attr = this.attr.attr;
      if (attr.length == 0) {
        joinSign = Object.assign({
          item_id: this.attr.id,
          attr_id: 0,
        }, obj)
      } else if (this.choose == attr[0].attr_title) {
        joinSign = Object.assign({
          item_id: attr[0].item_id,
          attr_id: attr[0].id,
        }, obj)
      } else {
        joinSign = Object.assign({
          item_id: data.item_id,
          attr_id: data.id,
        }, obj)
      }
      let sign = this.$md5(objKeySort(joinSign) + APIUrl.appsecret)
      let params = Object.assign({ sign: sign,active:APIUrl.active }, joinSign)

      this.$post(APIUrl.root + APIUrl.firstChangeNum, params).then(res => {
        if (res.code == 200) {
          this.display_car = false
          this.$Toast({
            message: '加入购物车成功',
            duration: 1000
          })

          this.$store.commit('changeNum', res.data.countNum)

        } else {
          this.$message.info({
            message: res.msg,
            duration: 1000
          })
        }
      })
    },

    //进入
    enter(item) {
      let page = (pagename, pagename2) => {
        this.firstNav(pagename)
        this.$router.push({ name: pagename2 });
      }

      if (item.status == 0) {
        this.$Toast({
          message: '该栏目已下架'
        })
        return
      };

      let id = item.id
      switch (id) {
        case 8:
          page('user', 'infomation')
          break;

        case 7:
         if (this.token == null) {
          this.jumppage(true);
          return;
        }
          page('order', 'allOrders')
          break;

        case 6:
          if (this.token == null) {
          this.jumppage(true);
          return;
        }
          page('shoppingCar', 'shoppingCar')
          break;

        case 5:
          page('classify','classify')
          break;

       default:
          this.firstNav('classify')
          localStorage.setItem('catetitle', item.title)
          this.$router.push({ path: '/classify', query: { id: item.cate_id } });
          break;
      }

    }

  },
  mounted() {
    let oScroll=document.getElementById('scroll');

         let x=oScroll.style.left;
         let x1=oScroll.offsetLeft;

         let scrollLeft=()=>{
          x++;
          oScroll.style.left=x1-x+'px';
          // console.log(x1)
           if(oScroll.style.left==700+'px'){
            clearInterval(clear)
           }
         }

         // let clear=setInterval(scrollLeft,1);

    this.screenWidth = document.getElementById('mask').offsetWidth
    const that = this
    window.onresize = () => {
      that.screenWidth = document.getElementById('mask').offsetWidth
    }
  },
  created() {
 // console.log(APIUrl.root + APIUrl.firstChangeNum)
    this.cateList()
    this.shopInfo()
  }
}

</script>
<style lang="less">
// #scroll{position:absolute;left:49%;}
.pcindex .inp_box {
  display: flex;

  .el-input__inner {
    height: 32px;
  }

  .el-input {

    width: 40%;
  }

  button {
    padding: 0px 13px;
  }
}

.pcindex {
  .indexsort {
    width: 20%;

    border-top: 2px solid #009A44;

    ul {
      border: 1px solid #efefef;
      padding-bottom: 13px;
    }

    // li:nth-child(n+6) {
    //   display: none;
    // }

    li {
      padding: 13px 0 0 13px;

      display: flex;

      div {
        margin-left: 13px;

        span {
          display: block;
          margin-top: 12px;
        }

        span:last-child {
          background: #009A44;
          color: white;
          padding: 1px 2px;
          border-radius: 15px;
          font-size: 8px;
          text-align: center;
          width: 35px;
        }
      }
    }
  }

  .whole {
    margin-top: 40px;
    display: flex;

    .goods {
      margin-bottom: 3%;
      padding: 2% 0 2% 0;
      overflow: hidden;
      border: 1px solid #efefef;
      border-top: 2px solid #009A44;

      img {

        width: 100px;
        height: 100px;
        margin: 5px 0 0 0;
      }

      .sort {
        text-align: center;
        float: left;
        box-shadow: -1px 3px 7px #D6D6D6;
        margin: 1% 2% 0 2%;

        height: 200px;
        width: 21%;

        p {
          margin-top: 5px;
        }

        .judge_attr {
          justify-content:space-between;
          align-items:center;
          display: flex;
          width: 94%;
          padding: 10px 0 0 0px;

          .orange {
            width: 50px;
            background: #FF9600;
            color: white;
            height: 18px;
            display: block;
            margin: 0 0 5px 11px;
            border-radius: 13px;
            padding: 2px 4px;
            font-size: 14px;
          }

          i {
            box-shadow: 0px 2px 4px #D6D6D6;
            color: #069C48;
            border: 1px solid #efefef;
            height: 20px;
            width: 27px;
            margin-top: 16px;
            padding-top: 4px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .today {
      margin-left: 20px;
      width: 100%;

      h1 {
        font-size: 16px;
        background: #009A44;
        color: white;
        padding: 1px 20px;
      }

      .square {
        margin-left: 83px;
        position: absolute;
        width: 0;
        height: 0;
        border-width: 1px 21px 23px;
        border-style: solid;
        border-color: transparent transparent #009A44;
        /* width: 22px; */
        z-index: -1;
      }

      .note {
        display: flex;

        .el-carousel__container {
          height: 20px;
        }

        img {
          margin: 0 20px 0 35px;
          height: 20px;
          width: 20px;
        }
      }
    }
  }

  .paging_box {
    /*display: flex;*/
    /*justify-content: flex-end;*/
    float: left;
  }
}

.nogoods {
  margin: 23% 45% 34% 44%
}

.whole .mask {
  top: 0;
  left: 0;
  background: #434343;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0.3;
  z-index: 9998;
}

.whole .carInfo {
  position: fixed;
  z-index: 9999;

  margin-top: 5%;
  width: 400px;
  height: 300px;
}

.whole .carInfo>i {
  float: right;

  text-align: right;
  color: white;
  font-size: 20px;
  margin-top: -20px;
}

.whole .carInfo>div {
  border-radius: 5px;
  width: 96%;

  background: white;
}

.today .enter {
  padding: 20px 0 20px 20px;
  display: flex;

  img {
    width: 36%;
    height: 100px;
    border: 1px solid #efefef;
    padding: 10px;
    border-radius: 5px;
  }

  div {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 20px
  }
}

.carInfo {
  .el-input-number {
    width: 130px;
    line-height: 20px;
  }

  .el-input-number__decrease,
  .el-input-number__increase {
    width: 20px;
  }

  .el-input__inner {
    height: 22px;
  }

  .el-input-number .el-input__inner {
    padding: 0;
  }
}

.carInfo .buynums {
  padding: 21px 20px;
  display: flex;
  justify-content: space-between;

  span:last-child {
    background: #009A44;
    padding: 1px 8px;
    border-radius: 6px;
    color: white;
  }
}

.carInfo .attr {
  margin-left: 20px;

  p {
    margin-bottom: 7px;
  }
}

.carInfo .attr span {
  border: 1px solid #009A44;
  color: #009A44;
  border-radius: 4px;
  padding: 2px 5px;
}

.carInfo .attr span:nth-child(n+2) {
  margin: 2px 0 0 10px;
}

.carInfo .choose_attr {
  background: #009A44;
  color: white !important;
}

.specs .none {
  color: white;
  height: 18px;
  display: block;
  margin: 0 0 5px 11px;
  border-radius: 13px;
  padding: 2px 4px;
  font-size: 14px;
}

.specs .none+span {
  margin-left: 10px;
}

.indexsort ul li img {
  width: 70px;
  height: 71px;
}

.goods .paging_box {
  width: 99%;
  text-align: right;
  margin-top: 3%;
}

.note .el-carousel__container {
  z-index: -1;
}

.specs span .red {
  margin-left: 13%;
}

</style>
