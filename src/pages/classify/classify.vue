<template>
  <div class="content_box" id="sortHeight">
    <div class="classify_box">
      <!--选择文字-->
      <div class="option_box" :class="{priority:level}">
        <span v-if="classify1 != ''">{{classify1}}</span>
        <span v-if="classify2 != ''"> >{{classify2}}</span>
      </div>
      <!--搜索框-->
      <div class="inp_box ">
        <el-input v-model="input" placeholder="请输入商品名称" @keyup.native.enter="search" clearable></el-input>
        <el-button type="success" @click="search">
          <img src="../../../static/img/pc_search.png" alt="">
        </el-button>
      </div>
      <!--分类列表-->
      <div class="classify_list_box">
        <div class="classify_list">
          <div class="list_title">
            一级分类：
          </div>
          <div class="list_box">
            <div class="list_item" v-for="item in classify_one" :class="{'classify_on':classify1==item.name}" @click="moreOneItem(item)">
              {{item.name}}
            </div>
          </div>
          <div class="list_btn" v-if="moreOne == false" @click="moreOneClick(true)">
            <span>更多</span>
            <i class="fa fa-angle-down"></i>
          </div>
          <div class="list_btn classify_on" v-if="moreOne == true" @click="moreOneClick(false)">
            <span>收起</span>
            <i class="fa fa-angle-up"></i>
          </div>
        </div>
        <div class="classify_list second" :class="{secondShow:seconds}" v-if="classify1 != ''" style="margin-bottom:10px;">
          <div class="list_title">
            二级分类：
          </div>
          <div class="list_box">
            <div class="list_item" v-for="item in classify_two" :class="{'classify_on':classify2==item.name}" @click="moreTwoItem(item)">
              {{item.name}}
            </div>
          </div>
          <div class="list_btn" v-if="moreTwo == false" @click="moreTwoClick(true)">
            <span>更多</span>
            <i class="fa fa-angle-down"></i>
          </div>
          <div class="list_btn classify_on" v-if="moreTwo == true" @click="moreTwoClick(false)">
            <span>收起</span>
            <i class="fa fa-angle-up"></i>
          </div>
        </div>
      </div>
      <!--表格-->
      <div class="form_box" v-if="bitmap" id='mask'>
        <div class="form_title">
          <div v-for="(item,index) in sorttitle">{{item.title}}</div>
        </div>
        <div class="form_content">
          <div v-for="item in list">
            <div class="form_content_list" v-if="item.attr.length==0">
              <div class="list_item">
                <!-- <img :src="root+item.img" alt=""> -->
                 <el-image :src="item.img" fit="contain">
      <div slot="error" class="image-slot">
          <img :src="defaultImg">
      </div>
    </el-image>
              </div>
              <div class="list_item">
                {{item.title}}
              </div>
              <div class="list_item">
                /
              </div>
              <div class="list_item">
                <span v-if='is_look==1'> {{item.price}}</span>
                <span v-else class="red"> ***</span>
              </div>
              <div class="list_item">
                {{item.unit}}
              </div>
              <div class="list_item">
                <el-input-number size="mini" v-model="item.cart_num" @focus="focus" @change="handleChange(item,item.cart_num)" :min="0" label="描述文字"></el-input-number>
              </div>
            </div>
            <div v-else>
              <div class="form_content_list" :class="{'bgcolor':item.choose}">
                <div class="list_item">
                 <el-image :src="item.img" fit="contain">
      <div slot="error" class="image-slot">
          <img :src="defaultImg">
      </div>
    </el-image>
                </div>
                <div class="list_item">
                  {{item.title}}
                </div>
                <div class="list_item">
                  多规格
                </div>
                <div class="list_item red">
                  <span v-if='is_look==1'> {{item.area_price}}</span>
                  <span v-else> ***</span>
                </div>
                <div class="list_item">
                </div>
                <div class="list_item ">
                  <div style="text-align: center;">
                    <i class="el-icon-d-arrow-right colspan pointer" :class="{'colspan1':item.choose}" @click="toggle(item)"></i>
                  </div>
                </div>
              </div>
              <div v-for="attr1 in item.attr" v-show="item.choose" class="form_content_list bgcolor" style="padding:1.5% 0 1.5%;">
                <div class="list_item"></div>
                <div class="list_item"></div>
                <div class="list_item">{{attr1.attr_title}}</div>
                <div class="list_item">
                  <span v-if='is_look==1'> {{attr1.attr_price}}</span>
                  <span v-else class="red"> ***</span>
                </div>
                <div class="list_item"> {{attr1.unit}}</div>
                <div class="list_item ">
                  <el-input-number size="mini" v-model="attr1.cart_num" @focus="focus" :min="0" @change="handleChange(attr1,attr1.cart_num)">
                  </el-input-number>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="nosort">
        <img src="../../../static/img/nosort.png" alt="" />
      </div>
      <!--      分页-->
      <div class="paging_box" v-if="bitmap">
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
  </div>
</template>
<script>
import APIUrl from '../../../config/apiurl'
import { mapState, mapMutations } from 'vuex'
let obj = {
  appid: APIUrl.appid,
  timeStamp: APIUrl.timeStamp,
}
export default {
  components: {
    // 'car': () =>import('../public/tabbar.vue'), // 退出登录
  },
  data() {
    return {
      defaultImg:'',
      root :APIUrl.root,
      seconds:false,
      level: false,
      sorttitle: [
        { title: '商品图片' }, { title: '商品名称' }, { title: '商品规格' }, { title: '单价(￥)' }, { title: '单位' }, { title: '购买数量' }
      ],
      list: [],
      visible: false,
      input: this.$route.query.keyword,
      num7: 1,
      currentPage3: 1,
      classify_one: [],
      classify_two: [],
      classify1: '',
      classify2: '',
      moreOne: false,
      moreTwo: false,
      firstArr: [],
      num: 10,
      total: '',
      screenWidth: '',
      bitmap: true,
      is_look: '',
      page: 1,
      cateId: this.$route.query.id
    }
  },

  computed: {
    ...mapState({
      cateInfo: 'cate',
      token: 'token'
    }),
    sign() {
      return this.$md5(objKeySort(obj) + APIUrl.appsecret)
    }
  },
  methods: {
    ...mapMutations(['jumppage', 'firstNav']),
    focus() {
      if (this.token == null) {
        this.jumppage(true)
      }
    },
    blur() {
      let int = Math.ceil((this.total / this.num))
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
    //展开多规格商品
    toggle(item) {
      item.choose = !item.choose;
      this.$forceUpdate()
    },
    //查找商品
    search() {
      let id = this.cateId;
      let params = Object.assign({ sign: this.sign, cateId: id, num: this.num, title: this.input,active:APIUrl.active }, obj)
      this.load(APIUrl.itemListByCate, params)
    },
    moreOneItem(data) {

      this.classify1 = data.name
      this.classify2 = ''
      this.cateId = data.id
      this.classify_two = data.self_next;
      this.firstArr = data.self_next


      // if (this.moreOne == true) {
      //   this.moreOne = false
      //   this.classify_one = this.cateInfo.slice(0, 10)
      // }
      let params = Object.assign({ sign: this.sign, cateId: this.cateId, num: this.num, title: this.input,active:APIUrl.active }, obj)
      this.load(APIUrl.itemListByCate, params)
    },
    moreTwoItem(data) {

      this.classify2 = data.name
      this.cateId = data.id;
      let params = Object.assign({ sign: this.sign, cateId: this.cateId, num: this.num, title: this.input,active:APIUrl.active }, obj)
      this.load(APIUrl.itemListByCate, params)
    

    },
    moreOneClick(data) {
      // if (this.classify_one.length <= 5) {
      //   this.$Toast({
      //     message: '暂时没有更多分类'
      //   })
      //   return
      // }
      this.moreOne = data
      if (data == true) {
        this.classify_one = this.cateInfo.list;
      } else {
        this.classify_one = this.cateInfo.list.slice(0, 5)
      }
    },
    moreTwoClick(data) {
      if (this.classify_two.length <= 5) {
        this.$Toast({
          message: '暂时没有更多分类'
        })
        return
      }
      this.seconds=!this.seconds;
     
    },
    handleCurrentChange(val) {

      let params = Object.assign({
        sign: this.sign,
        page: val,
        num: this.num,
        cateId: this.CateId,
        active:APIUrl.active
      }, obj)

      this.load(APIUrl.itemListByCate, params)
    },
    //单个商品自增添加购物车
    handleChange(item, value) {

      if (this.token == null) {
        setTimeout(() => {
          this.$set(item, 'cart_num', 0)
        })
        this.jumppage(true);
        return;
      }
      if (item.status == 0) {

        this.$Toast({
          message: '该商品已下架',
          duration: 1000
        })
        return;
      }
      if (item.is_float == 1) {
        if (!Number.isInteger(value)) {
          this.$Toast({
            message: '购买数量不能为小数',
            duration: 1000
          })
          return;
        }
      }
      let newobj
      if (item.item_id) {
        newobj = Object.assign({ item_id: item.item_id, attr_id: item.id, item_num: value }, obj)
      } else {
        newobj = Object.assign({ item_id: item.id, attr_id: 0, item_num: value }, obj)
      }
      let newsign = this.$md5(objKeySort(newobj) + APIUrl.appsecret)
      let params = Object.assign({ sign: newsign,active:APIUrl.active }, newobj)
      if (value != 0) {
        this.$post(APIUrl.root + APIUrl.changeNum, params).then(res => {
          if (res.code != 200) {
            this.$Toast({
              message: res.msg,
              duration: 1000
            })
          } else {
            this.$Toast({
              message: '加入购物车成功',
              duration: 1000
            })
            this.$store.commit('changeNum', res.data.countNum)
          }
        })
      } else {
        this.$post(APIUrl.root + APIUrl.deleteCart, params).then(res => {
          if (res.code != 200) {
            this.$Toast({
              message: res.msg,
              duration: 1000
            })
          } else {
            this.$Toast({
              message: '删除成功',
              duration: 1000
            })

            this.$store.commit('changeNum', res.data.countNum)


          }
        })
      }

    },
    load(url, params) {
      this.$Indicator.open('正在加载中.....')
      this.$get(APIUrl.root + url, params).then(res => {
         
       if(res.code==401){
          this.$Indicator.close()
            this.bitmap = false;
       //      this.$store.commit('jumppage',true)
            return;
       }

        let data = res.data;
        this.defaultImg=data.item_default;
        this.is_look = data.is_look;
        if (data.list.length) {
          this.list = data.list;
          this.total = data.totalNum
          this.bitmap = true;
          this.$Indicator.close()
        } else {
          if (this.input) {
            this.$Toast({ message: '你查找的物品在该分类中不存在' })
            this.$Indicator.close()
            this.bitmap = false
          } else {
            this.$Indicator.close()
            this.bitmap = false;
          }
        }

      })
    },
    loadClassifyInfo() {
      this.$Indicator.open('正在加载中')
      let params = Object.assign({ sign: this.sign, cateId: this.cateId, num: this.num, page: 1,active:APIUrl.active }, obj);

      this.load(APIUrl.itemListByCate, params)

    },
    loadClassify() {
      let params = Object.assign({ sign: this.sign,active:APIUrl.active }, obj)
      this.$get(APIUrl.root + APIUrl.cateList, params).then(res => {
        let data = res.data
        // this.classify_one=data.list;
        this.classify_one = data.list.slice(0, 5)
        this.$store.commit('classify', data)
      })
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop) {
        this.level = true
      } else { this.level = false }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.screenWidth = document.getElementById('mask').offsetWidth
    const that = this
    window.onresize = () => {
      that.screenWidth = document.getElementById('mask').offsetWidth
    }
  },
  created() {
    this.loadClassify() //获取分类列表
   
    if (this.cateId) {
      this.classify1 = localStorage.getItem('catetitle')
      let params = Object.assign({ sign: this.sign,active:APIUrl.active }, obj)
      this.$get(APIUrl.root + APIUrl.cateList, params).then(res => {
        let data = res.data;
        for (let i = 0; i < data.list.length; i++) {
          if (data.list[i].id == this.cateId) {
            this.classify_two = data.list[i].self_next;
          }
        }

      })
    }
    if (this.input) {

      this.search();
      

    } else {
      this.loadClassifyInfo()//获取分类信息
    }
    // var that = this
    // if (that.moreOne == false) {
    //   that.classify_one = this.cateInfo.list.slice(0, 5)
    // }
    // if (that.moreTwo == false) {
    //   that.classify_two =  this.firstArr.slice(0, 5)
    //   that.classify_two =  false;
    // }
  },

}

</script>
<style lang="less">
.priority {
  z-index: 0 !important;
}

.sortlist {

  .sorttitle,
  .attrnull,
  .attr {
    overflow: hidden;

    div {
      float: left;
      width: 15%;
    }
  }
}

.classify {

  .search {
    display: flex;
  }

}

.classify_box .nosort {
  text-align: center;
  margin-top: 10%;
}

.classify .sort ul {
  display: flex;
}

.classify .el-table td:first-child {
  padding: 2px 0;
}

.classify .el-table img {
  vertical-align: middle;
  width: 50px;
}

.form_box {

  .colspan {
    color: green;
    /*text-align: center;*/
    transform: rotate(90deg);
    /*width: 100%;*/
  }

  .colspan1 {
    transform: rotate(270deg);
  }
}

.bgcolor {
  background: #F2F6FC;
}

.classify_box .classify_list_box .second .list_box .list_item:nth-child(n+6){display:none;}
.classify_box .classify_list_box .secondShow .list_box .list_item:nth-child(n+6){display:block;}
</style>
