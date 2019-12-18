<template>
  <div class="pc" v-bind:class="{zindex:show}">
    <header>
      <top></top>
    </header>
      <div v-if='jumpstate'>
        <jump></jump>
      </div>
    <main class="main">
      <div id="leftnav2">
        <tabbar></tabbar>
      </div>
    
      <div>
        <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
  
        <router-view v-if="!$route.meta.keepAlive"></router-view>
     

      </div>
    </main>
    <div>
      <car></car>
    </div>
  </div>
</template>
<script>
import top from './head'
import tabbar from './leftnav'
import car from './shopcar'
import jump from './jump'
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }

  },
  name: 'App',
  computed: {
    ...mapState(['show','jumpstate'])
  },
  components: {
    top,
    tabbar,
    car,
    jump
  },
  created() {

  },
  mounted() {

  }
}

</script>
<style lang="less">
.zindex .el-header,
.zindex el-aside {
  z-index: 2;
}

.zindex .shop_box,
.map {
  z-index: 2;
}

* {
  margin: 0;
  padding: 0;
}

.pc header {
  width: 100%;
  overflow: hidden;
  margin: 0px 0 0 20px;
}

.pc .main>div:first-child {
  border: 2px solid #e0e0e0;
  width: 250px;
  position: fixed;
  height: 100%;
}

.pc .main>div:first-child>ul {
  margin-top: 20px;
}

.pc .main>div:first-child .el-menu-item-group__title {
  padding: 0;
}

.pc .main>div:last-child {
  margin-left: 280px;
  width: 100%;
  font-size: 14px;
}

.pc .main {
  width: 1300px;
  margin: 120px auto 0;
  display: flex;
}

@media(max-width:1368px) {
  .pc .main {
    width: 1200px
  }
}

</style>
