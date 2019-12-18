<template>
  <div class="content_box">
    <div class="information">
      <h1>信息资料</h1>
      <form>
        <div>
          <div class="avator">个人头像 : </div>
          <img :src="imageUrl" class="avatar">
          <div>
            <el-upload class="avatar-demo" action="123" :http-request="upLoad" :show-file-list="false" :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"><mark>要求图片不超过2MB</mark></div>
            </el-upload>
          </div>
        </div>
        <p style="clear:both;">单位名 : <input type="text" v-model="userinfo.nickname"></p>
        <p>联系人 : <input type="text" v-model="userinfo.contact"></p>
        <p>手机号 : <input type="text" v-model="userinfo.phone"></p>
        <p>地　址 : <input type="text" placeholder="请上传你的地址" v-model="userinfo.address"></p>
        <p class="pointer save" @click="userinfoSave()">保存</p>
      </form>
    </div>
  </div>
</template>
<script>
import APIUrl from '../../../config/apiurl'
export default {
  data() {
    return {
      imageUrl: '',
      avatar: '',
      userinfo: {

      },
    }
  },
  methods: {
    upLoad(file) {
      this.$Indicator.open('上传中...');
      var obj = {
        appid: APIUrl.appid,
        timeStamp: APIUrl.timeStamp,
        type: 'avatars'
      };
      let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
      let fd = new window.FormData();
      fd.append('sign', sign);
      fd.append('appid', APIUrl.appid);
      fd.append('timeStamp', APIUrl.timeStamp);
      fd.append('type', 'avatars ');
      fd.append('img', file.file);

      this.$post(APIUrl.root + APIUrl.uploadImg, fd).then(res => {
        this.$Indicator.close();
        if (res.code == 200) {
          this.$message({
            message: '上传成功',
            duration: 1000,
            iconClass: "none",
            customClass: 'modifypwd',
            center: true,
          })

          this.avatar = res.data.path;
          this.imageUrl = APIUrl.root + res.data.path;
        } else {
          this.$message({
            message: res.msg,
            duration: 1000,
            iconClass: "none",
            customClass: 'modifypwd',
            center: true,
          })
        }
      });
      return false // 返回false不会自动上传
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    //保存信息
    userinfoSave() {
      this.$Indicator.open('保存中...');
      var obj = {
        appid: APIUrl.appid,
        timeStamp: APIUrl.timeStamp,
      };
      let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
      let fd = new window.FormData();
      fd.append('sign', sign);
      fd.append('appid', APIUrl.appid);
      fd.append('timeStamp', APIUrl.timeStamp);
      fd.append('avatar', this.avatar);
      fd.append('nickname', this.userinfo.nickname);
      fd.append('phone', this.userinfo.phone);
      fd.append('address', this.userinfo.address);
      fd.append('contact', this.userinfo.contact);
      this.$post(APIUrl.root + APIUrl.saveMemberInfo, fd).then(res => {
        this.$Indicator.close();
        if (res.code == 200) {
          this.$message({
            message: '保存成功',
            duration: 1000,
            iconClass: "none",
            customClass: 'modifypwd',
            center: true,
          })
        } else {
          this.$message({
            message: res.msg,
            duration: 1000,
            iconClass: "none",
            customClass: 'modifypwd',
            center: true,
          })
        }
      });
    },
    userinfoRequest() {
      this.$Indicator.open('加载中...');
      let sign = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret);
      this.$get(APIUrl.root + APIUrl.memberInfo, {
        appid: APIUrl.appid,
        timeStamp: APIUrl.timeStamp,
        sign: sign
      }).then(res => {
        this.$Indicator.close();
        if (res.code == 200) {
          this.userinfo = res.data.info
          if (this.userinfo.logo == '') {
            this.imageUrl = APIUrl.root + res.data.member_default;
          } else {
            this.imageUrl = APIUrl.root + this.userinfo.logo;
          }

        }
      })
    }
  },
  created() {
    this.userinfoRequest()
  }
}

</script>
<style scoped>
.information .el-button--primary {
  background-color: #009A44;
  border-color: #009A44;
  padding: 2px 5px;
}

</style>
