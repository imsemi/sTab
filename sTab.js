

// 防止变量污染, 闭包colsure, 并传递jQuery对象
;(function ($){
    console.log("colsure is exec");
    // 构造函数 类 首字母大写
    // @obj 是jquery对象 , 包含选择的元素对象集合
    // @options 选项
    // return null
    var STab = function(obj,options){
        // 这里的this是 s_tab对象
        // 对象属性
        // obj => jquery对象
        // this.element => jqurey对象
        this.element = obj;
        // 默认配置
        this.defaults = {
            tabType:"H",             // 选项卡类型 H 水平 V 垂直
            defaultSelectedTab:0,    // 默认选中的tab
            defaultTabBg:"none",     // 默认的tab背景色
            hoverTabBg:"#ddd",       // 鼠标经过的tab背景色
            selectedTabBg:"#aaa",    // 选中的tab背景色
        };
        // 合并选项
        this.setting = $.extend({}, this.defaults, options);

        console.log("STab() called","obj",obj);
        //
        return this;
    };

    // 在对象原型上添加方法
    STab.prototype = {
        // 设置box样式
        setBoxStyle:function (){
            console.log("setBoxStyle() called");
            // console.log("--",this.defaults.selectedTabBg);
            // this => STab对象
            // this.element => Jquery 对象集合
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
            console.log("setUlStyle() called");
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
            console.log("hideAllTabBody() called");
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
                background:this.setting.selectedTabBg
            });
            // 设置 body 显示
            this.element.find('.s-tab-body').eq(tabIndex).css({
                display:'block'
            });
        },

        // 设置Li样式
        setLiStyle:function(){
            var _this = this;
            // 隐藏所有tab body
            this.hideAllTabBody();
            // li的个数
            var allLi = this.element.children().children("li");
            allLi.css({
                cursor:'pointer',
            });
            // console.log(">>>>",this.defaults);
            allLi.hover(function(){
                $(this).css("background",_this.setting.hoverTabBg);
            },function(){
                $(this).css("background",_this.setting.defaultTabBg);
            });
            // jquery集合 默认有 length属性
            var liLen= $(allLi).length;
            console.log("setLiStyle() called",allLi);

            // console.log("1",boxWidth);

            // 遍历
            return allLi.each(function(index,ele){
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


                // console.log("--",this);
            });






        },
        test:function(str)
        {
            console.log("STab.test called",str);
        },

        // 初始化
        init:function(){
            // 链式调用只支持jquery, 这里的this是STab对象
            // 如何 支持 链式 ?  this.setBoxStyle().setUlStyle()?
            // this => STab对象
            this.setBoxStyle();
            this.setUlStyle();
            this.setLiStyle();

            // 选中默认tabIndex
            if( this.setting.defaultSelectedTab>=0 )
            {
                // $(ele).children('.s-tab-header').css({
                //     background:'#aaa'
                // });
                // $(ele).children('.s-tab-body').css({
                //     display:'block'
                // });
                this.setTabSwitch(this.setting.defaultSelectedTab);
            }

            // 返回 STab类
            return this;

        }
    };

    // 在jquery对象的fn对象上 扩展函数
    // 插件中使用Beautifier对象
    $.fn.sTabP = function(options) {
        console.log("typeof options",typeof options);
        console.log("STab",STab);
        STab.prototype.test("hello");

        // 这里 this是 对象集合
        // 判断参数类型
        if(typeof options == "string")
        {
            // 调用方法
            console.log("options is string");
            // STab["test"]();
            STab.prototype[options].apply(this,Array.prototype.slice.call( arguments, 1 ));

        }
        else if( typeof options == "object"||!options )
        {
            //创建STab的实体
            // 传递 jquery 对象集合 进去
            console.log("options is {}");
            var stab = new STab(this, options);
            //调用 初始化其方法
            return stab.init();
        }
        else
        {

            console.log( 'Method ' +  options + ' does not exist on jQuery plugin' );

        }


    };

})(window.jQuery);
