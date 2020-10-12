
## 说明
1. 版本: v2.0
2. 作者: semi

## HTML 基本结构
 ```html
<div id="box">
        <ul>
            <li>
                <p class="s-tab-header">选项卡标题1</p>
                <div class="s-tab-body">
                    选项卡内容1
                </div>
            </li>

            <li>
                <p class="s-tab-header">选项卡标题2</p>
                <div class="s-tab-body">
                    选项卡内容2
                </div>
            </li>

            <li>
                <p class="s-tab-header">选项卡标题3</p>
                <div class="s-tab-body">
                    选项卡内容3
                </div>
            </li>
        </ul>
</div>
```
   
## 如何使用
 ```html
 <!--引入插件, 基于jquery-->
 <script src="./jquery-3.0.0.js"></script>
 <script src="../sTab.js"></script>
```

```javascript
// 使用插件
$(function(){
   var stab = $("#box").sTabP({});
   // 设置选中
   stab.setTabSwitch(2);
});
```

## 选项 
| 属性名 | 描述 | 默认值 |  
| --- | --- | :--- |
|tabType             | 选项卡类型 H 水平 V 垂直 | (String)H|
|defaultSelectedTab    | 默认选中的tab |(Number)0 |
|defaultTabBg     | 默认的tab背景色 |(String)none |
|hoverTabBg      | 鼠标经过的tab背景色 | (String)#ddd|
|selectedTabBg    | 选中的tab背景色 | (String)#aaa |


## 方法
| 方法名 | 描述 | 参数 |
| --- | --- | :--- | 
|setTabSwitch(tabIndex)  | 选项卡切换 | (Number)tabIndex 要切换的tabIndex | 


## 事件
| 事件名 | 描述 | 作用 | 参数 |
| --- | --- | :--- | --- |
|tabType             | 选项卡类型 H 水平 V 垂直 | (String)H| |

