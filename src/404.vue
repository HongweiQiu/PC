<template>
  <article class="main">
    <div class="error404">
      <div class="info">
        <h1>404</h1>
        <h2>抱歉，您访问的页面不存在或已被删除！ (｡•ˇ‸ˇ•｡)</h2>
        <p class="p1"><em id="wait">5</em>秒钟后将带您返回首页</p>
        <router-link to="/" class="btn">返回首页</router-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
	components:{
			
	},
	beforeCreate() {
      document.getElementsByTagName("body")[0].className="active";
  },
  beforeDestroy() {
      document.body.removeAttribute("class","active");
  },
  mounted() {
		var that=this;
      var wait = document.getElementById('wait');
      var interval = setInterval(function(){
          var time = --wait.innerHTML;
          if(time <= 0) {
              that.$router.push("/");
              clearInterval(interval);
          };
      }, 1000);
  },  
}
</script>

<style>
.error404 {
	margin: 0 auto;
	font-size:12px; font-family:Arial,Microsoft YaHei,SimSun;
	margin-top:1rem;
}
.error404 .info {
	float: left;
	padding-left: 2%;
	text-align: center;
}
.error404 .info h1 {
	font-size: 1.42rem;
	font-weight: 700;
	margin-top: 1.3rem;
	line-height: 1.05rem;
	color: #09bb07;
	text-transform: uppercase;
	
}
.error404 .info h2 {
	font-size: 0.4rem;
	line-height: 0.6rem;
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 0.2rem;
	margin-top: 0.2rem;
  color:#333;
}
.error404 .info p.p1 {
	font-size: 0.28rem;
}
.error404 .info p.p1 em{ color:red; margin-right:0.1rem;}

.error404 .info .btn {
	font-size: 0.28rem;
	font-weight: 600;
	color: #ffffff;
	border: 0px solid;
	border-bottom: 1px solid;
	border-color: #09bb07;
	padding: 0.1rem 0.41rem;
	border-radius: 0.1rem;
	background: none;
	text-transform: uppercase;
	display: inline-block;
	margin: 0.8rem 0.2rem 0 0;
	background-color: #09bb07;
	-webkit-transition: all 0.5s ease-in-out;
	-moz-transition: all 0.5s ease-in-out;
	-ms-transition: all 0.5s ease-in-out;
	-o-transition: all 0.5s ease-in-out;
	transition: all 0.5s ease-in-out;
	text-decoration: none;
	cursor: pointer;
}
.error404 .info .btn:hover {
	background: #ef6d00;
	color: #ffffff;
	text-decoration: none;
}
.error404 .info .btn-brown {
	border-color: #7b7b7b;
	background-color: #9f9f9f;
}
.error404 .info .btn-brown:hover {
	background: #7b7b7b;
}
</style>


