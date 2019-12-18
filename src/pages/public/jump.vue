<template>
  <div class='jumppage'>
    <div class="fixed mask"></div>
    <div class="tips fixed">
      <p>你尚未登录,{{seconds}}后跳转到登录页,是否继续?</p>
      <div>
        <el-button size="mini" @click='cancel' type="info">取消</el-button>
        <el-button size="mini" @click='determine' type="success">跳转</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
let clear;
export default {
  data() {
    return {
      seconds: 6
    }
  },
  computed: {
    ...mapState(['jumpstate'])
  },
  methods: {
    ...mapMutations(['jumppage']),
    jump() {

      if (this.jumpstate == true) {
        clear = setInterval(() => {
          this.seconds--;
          if (this.seconds ==0) {
            this.$router.push({ name: 'login' })
            this.jumppage(false);
          }
        }, 1000)
      }
    },
    cancel() {
      clearInterval(clear)
      this.jumppage(false)
    },
    determine() {
      this.$router.push({ name: 'login' })
      this.jumppage(false);
    }

  },
  created() {
    this.jump()
  }
};

</script>
<style>
.jumppage .mask {
  width: 100%;
  height: 100%;
  z-index: 9998;
}

.jumppage .tips {
  width: 300px;
  height: 90px;
  background: white;
  z-index: 9999;
  top: 44%;
  left: 45%;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 5px #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}

</style>
