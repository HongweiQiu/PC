<template>
  <div class="content_box">
    <div @click="back" class="pointer back" id="back">返回</div><br>

    <div class="baidumap" id="container"></div>
  </div>

</template>
<script>
  import APIUrl from '../../../config/apiurl'
  export default {
    data() {
              return {
                  id: this.$route.query.id,
                   test:''
               }
          },
    components: {

    },
    created() {
      let obj = {
        appid: APIUrl.appid,
        timeStamp: APIUrl.timeStamp,
        id: this.id
      };
      let sign = this.$md5(objKeySort(obj) + APIUrl.appsecret);
      let params = Object.assign({sign: sign}, obj)

      this.$get(APIUrl.root + APIUrl.orderInfo, params).then(res => {
          if (res.code == 200) {
            localStorage.setItem('destin',res.data.orderInfo.address)
          }
        }
      )

      this.$post(APIUrl.root + APIUrl.carPosition, params).then(res => {
        let data=res.data;
        localStorage.setItem('lng',data.member_longitude);
        localStorage.setItem('lat',data.member_latitude)
        localStorage.setItem('ak',data.ak)
      })

         },
    mounted() {   var script = document.createElement("script");
         script.type = "text/javascript";
           script.src="http://api.map.baidu.com/api?v=2.0&ak="+localStorage.getItem('ak');
           document.body.appendChild(script);
      this.baiduMap()
    },
    methods: {
       back() {
                window.history.back(-1)  ;
          },
      baiduMap() {
        var map = new BMap.Map('container');
        let lng=localStorage.getItem('lng');
        let lat=localStorage.getItem('lat');
         let destin=localStorage.getItem('destin');


        var point = new BMap.Point(lng,lat) // 创建点坐标

        map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true)

        var myGeo = new BMap.Geocoder();
        //地址解析
        let provice = destin.indexOf('省');
        let city = destin.indexOf('市');
        let zone = destin.substr(provice + 1, city + 1);

        map.addControl(new BMap.NavigationControl());
        myGeo.getPoint(destin, function(res) {
            if (res) {
              let destination = new BMap.Point(res.lng, res.lat);

              let test = new BMap.Label('目的地:' + destin, { position: destination, offset: new BMap.Size(-90, -60) });
              test.setStyle({
                color: "#ff6f06",
                fontSize: "16px",
                backgroundColor: "white",
                border: "1px #ff6f06 solid",
                borderRadius: "10px",
                padding: "4px 5px",
            });

              var marker = new BMap.Marker(destination); // 创建标注
              map.addOverlay(marker);
              map.addOverlay(test);

            }
          },

          myGeo.getLocation(point, function(result){
            if (result){
              let pass=result.address
              var test= new BMap.Label('途经:'+pass,{position:point,offset:new BMap.Size(-90,-60)});
              test.setStyle({
                color : "#ff6f06",
                fontSize : "16px",
                backgroundColor :"white",
                border :"1px #ff6f06 solid",
                borderRadius:"10px",
                padding:"4px 5px",
              });
              var marker = new BMap.Marker(point);        // 创建标注-->
              map.addOverlay(marker);
              map.addOverlay(test);
            }
          }),
          zone);
      }
    }
  }
</script>
<style>
  .baidumap {
    width:64%;
  height:650px;
    position: absolute;
  }
@media(max-width:1366px){
  .baidumap {
   
   height:480px;
  
  }
}
@media(min-width:1800px){
  .baidumap {
  height:820px;
  }
}
  /* 去除百度地图版权那行字 和 百度logo */
  .baidumap > .BMap_cpyCtrl {
    display: none !important;
  }
  .baidumap > .anchorBL {
    display: none !important;
  }
  .back {
      color: green;
   }
</style>
