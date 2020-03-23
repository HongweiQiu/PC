// html的font-size设为100px
;(function(designWidth, maxWidth) {
    var doc = document,
        win = window;
    var docEl = doc.documentElement;
    var tid;
    var rootItem,rootStyle;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (!maxWidth) {
            maxWidth = 540;
        };
        if (width > maxWidth) {
            width = maxWidth;
        }
        //与淘宝做法不同，直接采用简单的rem换算方法1rem=100px
        var rem = width * 100 / designWidth;
        //兼容UC开始
        rootStyle="html{font-size:"+rem+'px !important}';
        rootItem = document.getElementById('rootsize') || document.createElement("style");
        if(!document.getElementById('rootsize')){
            document.getElementsByTagName("head")[0].appendChild(rootItem);
            rootItem.id='rootsize';
        }
        if(rootItem.styleSheet){
            rootItem.styleSheet.disabled||(rootItem.styleSheet.cssText=rootStyle)
        }else{
            try{rootItem.innerHTML=rootStyle}catch(f){rootItem.innerText=rootStyle}
        }
        //兼容UC结束
        docEl.style.fontSize = rem + "px";
    };
    refreshRem();

    win.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(640, 640);

$().ready(function(){
    // 兼容readonly
    $(document).on("focus","input[readonly]",function(){
        $(this).trigger('blur');
    });
    
    // 刷新当前页
    $(document).on("touchstart",".conta_nav_r",function(){
        location.reload();
    });
    // 通用置顶
    $(document).on("click",".adminispu_seb_zd",function(){
        var thvl=$.trim($(".adminispu_seb input").val());
        $(".adminiszd_list ol").prepend($(".adminiszd_list ol li:contains('" + thvl + "')"));
    });
    // 采购置顶
    $(document).on("click",".adminispu_seb_zd1",function(){
        var thvl=$.trim($(".adminisdl_sel1 .adminispu_seb_zdi").val());
        $(".adminiszd_list ol").prepend($(".adminiszd_list ol li:contains('" + thvl + "')"));
    });
    // 勾选变颜色
    $(document).on("change",".adminispu_gy .mint-checkbox-input",function(){
        $(".adminispu_gy .mint-checkbox-input:checked").parents(".mint-checklist-label").find(".mint-checkbox-label").addClass("on");
    });
    // 清空
    $(document).on("click",".lcalendar_qk",function(){
        $("#start_date").val('');
        $(".gearDate").remove();
    });
    // 采购计算总价
    $(document).on("input propertychange",'.appadqd_list_in',function(){
        var inp=$.trim($(this).val());
        var inp1=$.trim($(this).siblings(".appadqd_list_in1").val());
        var inp2=$.trim($(this).siblings(".appadqd_list_in2").val());
        if(inp2!='')
        {
            if(inp==''&&inp1!='')
            {
                $(this).val((inp2*1000)/(inp1*1000)/1000000)
                var inp=$.trim($(this).val());
            }
        }
        $(this).siblings(".appadqd_list_in2").val(((inp*1000)*(inp1*1000))/1000000);
    });
    $(document).on("input propertychange",'.appadqd_list_in1',function(){
        var inp=$.trim($(this).val());
        var inp1=$.trim($(this).siblings(".appadqd_list_in").val());
        var inp2=$.trim($(this).siblings(".appadqd_list_in2").val());
        if(inp2!='')
        {
            if(inp==''&&inp1!='')
            {
                $(this).vall((inp2*1000)/(inp1*1000)/1000000)
                var inp=$.trim($(this).val());
            }
        }
        $(this).siblings(".appadqd_list_in2").val(((inp*1000)*(inp1*1000))/1000000);
    });
});
