webpackJsonp([10],{"6+26":function(t,e){},De3b:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={components:{},beforeCreate:function(){document.getElementsByTagName("body")[0].className="active"},beforeDestroy:function(){document.body.removeAttribute("class","active")},mounted:function(){var t=this,e=document.getElementById("wait"),s=setInterval(function(){--e.innerHTML<=-99&&(t.$router.push("/"),clearInterval(s))},1e3)}},i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("article",{staticClass:"main"},[e("div",{staticClass:"error404"},[e("div",{staticClass:"info"},[e("h1",[this._v("404")]),this._v(" "),e("h2",[this._v("抱歉，您访问的页面不存在或已被删除！ (｡•ˇ‸ˇ•｡)")]),this._v(" "),this._m(0),this._v(" "),e("router-link",{staticClass:"btn",attrs:{to:"/"}},[this._v("返回首页")])],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"p1"},[e("em",{attrs:{id:"wait"}},[this._v("5")]),this._v("秒钟后将带您返回首页")])}]};var a=s("VU/8")(n,i,!1,function(t){s("6+26")},null,null);e.default=a.exports}});