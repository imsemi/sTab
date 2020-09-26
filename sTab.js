

// 防止变量污染, 闭包colsure
;function (){

// 构造函数 类 首字母大写
// @obj 是jquery对象 , 包含选择的元素对象集合
// @options 选项
// return null
    var STab = function(obj,options){
        // 这里的this是 s_tab对象
        // 对象属性
        // this.element 是 最外层的 box
        this.element = obj;
        // 默认配置
        this.defaults = {
            tabType:'H',             // 选项卡类型 H 水平 V 垂直
            defaultSelectedTab:0,    // 默认选中的tab
        };
        // 合并选项
        this.setting = $.extend({}, this.defaults, options);

        console.log(">>","STab调用","对象集合",obj);
    };

// 在对象原型上添加方法
    STab.prototype = {
        // 设置box样式
        setBoxStyle:function (){
            console.log(">>","box调用");
            // 这里的this是STab对象
            // 返回jquery 对象
            return this.element.css({
                width:'100%',
                height:'100%',
                border:"1px solid #ccc",
                boxSizing:'border-box'
            });
        },
        // 获取Ul
        getBoxWidth:function()
        {
            // 获取盒子宽度
            return this.element.width();
        },

        // 设置Ul样式
        setUlStyle:function(){
            console.log(">>","Ul调用");
            return this.element.children().css({
                listStyleType:'none',
                height: '100%',
                padding:0,
                position:'relative',
                // background:'#ddd',
                margin:0,
            });
        },
        // 清除所有 .s-tab-header 选中
        clearAllTabHeader:function()
        {
            this.element.find('.s-tab-header').css({
                background:'none'
            });
        },

        // 隐藏所有 .s-tab-body
        hideAllTabBody:function()
        {
            console.log(">>","hideAllTabBody");
            var boxWidth  = this.getBoxWidth();
            // 设置 tab-body 样式
            this.element.find('.s-tab-body').css({
                // border:'1px solid green',
                float: 'left',
                width: boxWidth,
                position: 'absolute',
                zIndex: 99,
                left:0,
                display:'none',
                overflowWrap: 'break-word',
            });
        },


        // 切换tab
        setTabSwitch:function(tabIndex)
        {
            // 清空 头和体
            this.clearAllTabHeader();
            this.hideAllTabBody();
            // 设置 header 背景色
            this.element.find('.s-tab-header').eq(tabIndex).css({
                background:'#aaa'
            });
            // 设置 body 显示
            this.element.find('.s-tab-body').eq(tabIndex).css({
                display:'block'
            });
        },

        // 设置Li样式
        setLiStyle:function(){
            // 隐藏所有tab body
            this.hideAllTabBody();
            // li的个数
            var allLi = this.element.children().children("li");
            allLi.css({
                cursor:'pointer',
            });
            allLi.hover(function(){
                $(this).css("background","#ddd");
            },function(){
                $(this).css("background",'none');
            });
            // jquery集合 默认有 length属性
            var liLen= $(allLi).length;
            console.log(">>","allLi",allLi);
            console.log(">>","Li调用");

            // console.log("1",boxWidth);
            var _this = this;

            // 遍历
            allLi.each(function(index,ele){
                // each 里面的 this 是 单个元素 element
                // console.log("2",boxWidth);
                // console.log("singleLi ele==this",ele,this);

                // 设置单个内容的 样式
                // each 里么的 this == ele
                $(ele).css({
                    float:"left",
                    // border:'1px solid blue',
                    width:100/liLen + '%',
                    boxSizing:'border-box',
                    // position:'relative',
                });

                // 设置tab-header 头的样式
                $(ele).children('.s-tab-header').css({
                    border:'1px solid #666',
                    borderRadius:4,
                    margin:0,
                    padding:4,
                    'text-overflow':'ellipsis',
                    'white-space': 'nowrap',
                    overflow: 'hidden'
                })
                // 为每个tabHeader绑定index
                    .attr('data-index',index)
                    .bind("click",function(){
                        // 绑定点击事件
                        console.log("turn switch:"+$(this).attr('data-index'));
                        _this.setTabSwitch($(this).attr('data-index'));
                    });
                // .children(".s-tab-body").attr("");


                // console.log(">>",this);

                // 选中默认tabIndex
                if( index==_this.setting.defaultSelectedTab )
                {
                    $(ele).children('.s-tab-header').css({
                        background:'#aaa'
                    });
                    $(ele).children('.s-tab-body').css({
                        display:'block'
                    });
                }

            });






        },

        // 初始化
        init:function(){
            // 链式调用只支持jquery, 这里的this是STab对象
            // 如何 支持 链式 ?  this.setBoxStyle().setUlStyle()?
            this.setBoxStyle();
            this.setUlStyle();
            this.setLiStyle();

            // 返回 STab类
            return this;

        }
    };

// 在jquery对象的fn对象上 扩展函数
// 插件中使用Beautifier对象
    $.fn.sTabP = function(options) {
        //创建STab的实体
        // 传递 jquery 对象集合 进去
        var stab = new STab(this, options);
        //调用 初始化其方法
        return stab.init();
    };
}();
