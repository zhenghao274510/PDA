(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/history/chooseHistory"],{"0502":function(e,t,o){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o("2f62");function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},n=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),n.forEach(function(t){r(e,t,o[t])})}return e}function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var a=function(){return o.e("components/page-head").then(o.bind(null,"cf30"))},c=function(){return o.e("components/page-foot").then(o.bind(null,"07ef"))},u=function(){return o.e("components/xfl-select/xfl-select").then(o.bind(null,"45e1"))},l=function(){return o.e("components/xfl-select/flight-select").then(o.bind(null,"a2f9"))},d=function(){return o.e("components/xfl-select/goodName-select").then(o.bind(null,"4d98"))},f=function(){return o.e("components/xfl-select/goodType-select").then(o.bind(null,"de96"))},h=function(){return o.e("components/xfl-select/hose-select").then(o.bind(null,"7c34"))},g=function(){return o.e("components/x-input/x-input").then(o.bind(null,"bd8b"))},p=function(){return o.e("components/xfl-select/shop-select").then(o.bind(null,"f08f"))},b=function(){return o.e("components/xfl-select/test").then(o.bind(null,"49e6"))},m={data:function(){var e;return e={goodsType:getApp().globalData.goodsType,flightName:"",goodsName:"",categoryList:[],minHeight:"",showRightText:!1,awb:"",number:0,productCode:"",destinationStation:"",departureStation:"",house:""},r(e,"goodsType",getApp().globalData.goodsType),r(e,"goods",""),r(e,"wmsWarehouseId",""),e},components:{pageHeade:a,pageFoot:c,xflSelect:u,xInput:g,shopSelect:p,houseSelect:h,goodTypeSelect:f,goodNameSelect:d,flightSelect:l,test:b},computed:i({},(0,s.mapState)(["lang"])),onLoad:function(){this.minHeight=e.getStorageSync("height"),console.log(n(this.minHeight," at pages\\history\\chooseHistory.vue:144")),this.loadData()},methods:{changeGoods:function(e){this.goods=e.newVal,console.log(n(e," at pages\\history\\chooseHistory.vue:150"))},changeHouse:function(e){console.log(n(e," at pages\\history\\chooseHistory.vue:153")),this.wmsWarehouseId=e.orignItem.id},chengNumber:function(e){console.log(n(e," at pages\\history\\chooseHistory.vue:158")),this.number=e},onClick:function(t){console.log(n(t," at pages\\history\\chooseHistory.vue:162")),0==t?e.navigateBack():this.$api.navTo("/pages/history/history")},loadData:function(){var e=this,t={status:""};this.$REQ.get(t,"sortingRegister/findWarehouseList").then(function(t){console.log(n(t.data," at pages\\history\\chooseHistory.vue:170")),t.flag?(t.result.forEach(function(e){e.value=e.name}),e.categoryList=t.result):e.$refs.Message.error({content:e.$api.getError(t.errorCode),duration:2e3,background:!1})}).catch(function(e){})},getInfo:function(){var e={};""!=this.awb&&(e.awb=this.awb),""!=this.flightName&&(e.flightName=this.flightName),""!=this.goodsName&&(e.goodsName=this.goodsName),0!=this.number&&(e.registerNumber=this.number),""!=this.departureStation&&(e.departureStation=this.departureStation),""!=this.destinationStation&&(e.destinationStation=this.destinationStation),""!=this.wmsWarehouseId&&(e.wmsWarehouseId=this.wmsWarehouseId),""!=this.goods&&(e.goodsType=this.goodsType),""!=this.productCode&&(e.productCode=this.productCode),this.$api.navTo("/pages/history/history?id=".concat(JSON.stringify(e)))}}};t.default=m}).call(this,o("6e42")["default"],o("0de9")["default"])},a755:function(e,t,o){"use strict";var n=o("f3cc"),s=o.n(n);s.a},bcb0:function(e,t,o){"use strict";(function(e){o("855e"),o("921b");n(o("66fd"));var t=n(o("d8dd"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},be61:function(e,t,o){"use strict";var n,s=function(){var e=this,t=e.$createElement;e._self._c},i=[];o.d(t,"b",function(){return s}),o.d(t,"c",function(){return i}),o.d(t,"a",function(){return n})},c06e:function(e,t,o){"use strict";o.r(t);var n=o("0502"),s=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,function(){return n[e]})}(i);t["default"]=s.a},d8dd:function(e,t,o){"use strict";o.r(t);var n=o("be61"),s=o("c06e");for(var i in s)"default"!==i&&function(e){o.d(t,e,function(){return s[e]})}(i);o("a755");var r,a=o("f0c5"),c=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=c.exports},f3cc:function(e,t,o){}},[["bcb0","common/runtime","common/vendor"]]]);