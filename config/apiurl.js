// 配置API接口地址
const timeStamp=Math.round(new Date().getTime()/1000);
export default {
    root                  : process.env.API_HOST,               // 代理
    appid                 : 2,                                  // appid
    appsecret             : 'StJfzJcXmya6k6Ar',                 // 密码
    timeStamp             : timeStamp,                          // 时间戳
    roleType              : 'mobileOrder/roleType',             // 登录角色
    cart                  : 'mobileOrder/cart',                 // 登录角色
    login                 : 'mobileOrder/login',                // 登录
    openCart              : 'mobileOrder/openCart',    		    	//购物车
    captcha               :'mobileOrder/captcha',               //图形验证码
    sendCode              :'mobileOrder/sendCode',              //短信验证码
    forgetPassword        :'mobileOrder/forgetPassword',        //修改密码
    cateList              :'mobileOrder/cateList',              //分类列表
    itemListByCate        :'mobileOrder/itemListByCate',        //分类商品
    modifyPassword        :'mobileOrder/modifyPassword',        //修改密码
    uploadImg             :'mobileOrder/uploadImg',             //上传图片  x
    moneyList             :'mobileOrder/moneyList',             //账单列表
    moneyListPaginate     :'mobileOrder/moneyListPaginate',   //账单详情
    orderList             :'mobileOrder/orderList',             //订单列表
    orderInfo             :'mobileOrder/orderInfo',             //订单详情
    childInfo             :'mobileOrder/childInfo',             //子账户信息列表
    editChild             :'mobileOrder/editChild',             //编辑子账户
    getSearchItem         :'mobileOrder/getSearchItem',         //搜索商品
    firstChangeNum        :'mobileOrder/firstChangeNum',        //单个商品自增添加购物车
    changeNum             :'mobileOrder/changeNum',             //更新购物车数量
    getCountNum           :'mobileOrder/getCountNum',           //购物车总价和数量
    deleteCart            :'mobileOrder/deleteCart',            //删除单个购物车
    deleteByUserIds       :'mobileOrder/deleteByUserIds',       //删除多个购物车
    pcAddOrder            :'mobileOrder/pcAddOrder',            //Pc端直接下单
    cancelOrder           :'mobileOrder/cancelOrder',           //取消订单
    receiveOrder          :'mobileOrder/receiveOrder',          //确认收货
    oneMoreTime           :'mobileOrder/oneMoreTime',           //再来一单
    testOrder             :'mobileOrder/testOrder',             //检查订单能否直接下单
    pcMergeOrder          :'mobileOrder/pcMergeOrder',          //PC合并订单
    memberInfo        	  :'mobileOrder/memberInfo',          	//用户信息
    saveMemberInfo        :'mobileOrder/saveMemberInfo',        //保存用户信息
    carPosition           :'mobileOrder/carPosition',           //查看物流
    moneyListInfo         :'mobileOrder/moneyListInfo',         //账单详情
    moneyListExport       :'mobileOrder/moneyListExport',       //账单记录导出
    orderExport           :'mobileOrder/orderExport',           //订单记录导出
    indexAd               : 'mobileOrder/indexAd',              //首页公告接口
    indexItem             : 'mobileOrder/indexItem',            //首页商品
    censusNum             :'mobileOrder/censusNum',             //订单账单统计
    addInfo               :'mobileOrder/addInfo',               //合拼收货人信息和子账号
    itemRemark            :'mobileOrder/itemRemark',            //购物车备注
    memberAddressInfo     :'mobileOrder/memberAddressInfo',     //用户地址信息
  	baseURL               : '',

};
