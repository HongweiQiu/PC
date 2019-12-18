<template>
  <el-menu :default-active="routename" class="el-menu-vertical-demo nav" 

  active-text-color="#009A44" @select="select" @open="open" unique-opened="true">
    <el-menu-item :key="index" :index="first.link" v-for="(first,index) in list">
      <div class="first">
        <img :src="first.imga" v-if="path==first.link"><img v-else :src="first.img">
        <span>{{first.name }}</span>
      </div>
    </el-menu-item>
    <el-submenu :index="item.link" v-for="(item,index) in secondlist" :key="item.link">
      <template slot="title">
        <div class="first">
          <img :src="item.imga" v-if="path==item.link"><img v-else :src="item.img">
          <span>{{item.name }}</span>
       
        </div>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="second.link" v-for="(second,index) in item.data" :key="second.link">
          {{second.tittle }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import logout from './deletebuy';
import { mapState, mapMutations } from 'vuex'
import allOrders from '../order/allOrders'

export default {
  data() {
    return {
      on: false,
      menu:[],
      web: '',
      visible: false,
      list: [{
          img: '../../../static/img/pc_menu_home.png',
          imga: '../../../static/img/pc_menu_home_a.png',
          name: '首页',
          link: '/'
        },
        {
          img: '../../../static/img/pc_menu_classify.png',
          imga: '../../../static/img/pc_menu_classify_a.png',
          name: '分类',
          link: 'classify'
        },
        {
          img: '../../../static/img/pc_menu_car.png',
          imga: '../../../static/img/pc_menu_car_a.png',
          name: '购物车',
          link: 'shoppingCar'
        },
      ],
      secondlist: [{
          img: '../../../static/img/pc_menu_order.png',
          imga: '../../../static/img/pc_menu_order_a.png',
          jt: '../../../static/img/pc_menu_jt.png',
          jta: '../../../static/img/pc_menu_jt_a.png',
          name: '订单',
          link: 'order',
          data: [{
              tittle: '全部订单',
              link: 'allOrders'
            },
            // {
            //   tittle: '未支付',
            //   link: 'nonPayment'
            // },
          ]
        },
        {
          img: '../../../static/img/pc_menu_user.png',
          imga: '../../../static/img/pc_menu_user_a.png',
          jt: '../../../static/img/pc_menu_jt.png',
          jta: '../../../static/img/pc_menu_jt_a.png',
          name: '我的',
          link: 'user',
          data: [{
              tittle: '信息资料',
              link: 'infomation'
            },
            {
              tittle: '账单记录',
              link: 'billingRecord'
            },
            {
              tittle: '修改密码',
              link: 'modify'
            },

            {
              tittle: '账号管理',
              link: 'accountMange'
            },
          ]
        }
      ]
    }
  },
  computed: {
    routename() {
      if (this.$route.name == 'index') {
        return '/';
      } else if (this.$route.name == 'orderDetails' || this.$route.name == 'map') {
        return 'allOrders'
      } else if (this.$route.name == 'billingDetails') {
        return 'billingRecord'
      } else if (this.$route.name == 'loginAccount') {
        return 'accountMange'
      } else {
        return this.$route.name
      }
    },
    ...mapState([
      'token', 'path'
    ])
  },
  components: {
    logout
  },

  methods: {
    ...mapMutations(['hiddenCar', 'jumppage', 'firstNav']),

    selectPath(index, status = true) {

      if (index == '/' || index == 'classify') {
        this.firstNav(index);
        // this.$refs.menu.close('nonPayment')
        this.$router.push({ path: index })
      } else {
        if (index == "allOrders" || index == "nonPayment") {

          this.firstNav('order');
        } else if (index == "infomation" || index == "billingRecord" || index == "modify" || index == "accountMange") {
          this.firstNav('user');
        } else if (index == "shoppingCar") {
          this.firstNav('shoppingCar');
        }
        this.jumppage(status)
      }
    },
    select(index) {

   
      if (index != 'shoppingCar') {
        this.hiddenCar(true)
      } else {
        this.hiddenCar(false)
      }

      if (!this.token) {
        this.selectPath(index, status = true)

      } else {
        this.selectPath(index, status = false);
        this.$router.push({ path: index })

      }

    },

  },
  created() {
    if(this.token){
      this.selectPath(this.routename, status = false)
    }else{this.firstNav(this.routename)}
  if(this.path=='shoppingCar'){
  this.hiddenCar(false)

  }
  }
};

</script>
<style>
.nav>li:focus {
  background: #009A44 !important;
  color: white;
}

.nav>li:hover {
  color: black !important;
}

.nav .el-submenu .el-menu-item {
  padding-left: 60px !important;
}

.nav>.is-active {
  background: #009A44;
  color: white !important;
}

.nav .first {
  display: flex;
  align-items: center;
}

.nav .first img {
  margin-right: 20px;
}

.is-active .el-submenu__title {
  background: #009A44;
  color: white;
}

.is-active .first:hover {
  color: black;
}

.is-active .el-submenu__title i {
  color: white;
}

</style>
