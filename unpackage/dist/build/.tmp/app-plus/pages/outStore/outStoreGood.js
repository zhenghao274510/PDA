(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/outStore/outStoreGood"],{"0547":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return a})},"5d11":function(t,e,n){"use strict";n.r(e);var a=n("78e8"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},"5d1b":function(t,e,n){"use strict";(function(t){n("855e"),n("921b");a(n("66fd"));var e=a(n("838e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"78e8":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2f62");function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r=null,c={data:function(){return{flash:!0,type:"",text:"",light:"",content:"",height:""}},onLoad:function(e){this.content=this.lang.title.Manualoutbound,this.ligt=this.lang.bass.light,this.height=t.getStorageSync("height");var n=e.text;this.type=e.type,n&&(this.name=n);var a=getCurrentPages(),i=a[a.length-1],o=i.$getAppWebview();this.createBarcode(o),this.createView(o)},computed:i({},(0,a.mapState)(["lang"])),methods:{onClick:function(e){0==e?(t.navigateBack(),r.close()):this.$api.navTo("/pages/outStore/historyoutStore")},onmarked:function(t,e){switch(t){case plus.barcode.QR:"QR: ";break;case plus.barcode.EAN13:"EAN13: ";break;case plus.barcode.EAN8:"EAN8: ";break}plus.navigator.setFullscreen(!1),this.$api.navTo("/pages/outStore/newOut?id=".concat(e,"&type=0")),this.$api.tip(t+e),r.close()},createBarcode:function(t){var e=[plus.barcode.EAN13,plus.barcode.EAN8,plus.barcode.UPCA,plus.barcode.UPCE,plus.barcode.CODABAR];r=plus.barcode.create("barcode",e,{top:"0",left:"0",width:"100%",height:this.height,scanbarColor:"green",position:"static",frameColor:"green"}),r.onmarked=this.onmarked,r.setFlash(this.flash),t.append(r),r.start()},createView:function(e){var n=new plus.nativeObj.View("scanBarVew",{top:"60%",left:"40%",height:"10%",width:"20%"},[{tag:"img",id:"scanBar",src:"static/scanBar.png",position:{width:"28%",left:"36%",height:"30%"}},{tag:"font",id:"font",text:this.ligt,textStyles:{size:"10px",color:"#ffffff"},position:{width:"100%"}}]),a=new plus.nativeObj.View("content",{bottom:"20%",left:"0px",height:"40px",width:"100%"},[{tag:"font",id:"scanTips",text:this.content,textStyles:{size:"14px",color:"yellow",whiteSpace:"normal"},position:{bottom:"0",left:"10%",width:"80%",height:"wrap_content"}}]);n.interceptTouchEvent(!0),a.interceptTouchEvent(!0),e.append(a),e.append(n),a.addEventListener("click",function(){t.navigateTo({url:"/pages/outStore/newOut?type=1"})}),rightView.addEventListener("click",function(){t.navigateTo({url:"/pages/outStore/historyoutStore"})}),backVew.addEventListener("click",function(e){t.navigateBack({delta:1}),r.close(),plus.navigator.setFullscreen(!1)},!1);var i=this;n.addEventListener("click",function(t){i.flash=!i.flash,i.flash?n.draw([{tag:"img",id:"scanBar",src:"static/yellow-scanBar.png",position:{width:"28%",left:"36%",height:"30%"}},{tag:"font",id:"font",text:this.light,textStyles:{size:"10px",color:"#ffffff"},position:{width:"100%"}}]):n.draw([{tag:"img",id:"scanBar",src:"static/scanBar.png",position:{width:"28%",left:"36%",height:"30%"}},{tag:"font",id:"font",text:this.light,textStyles:{size:"10px",color:"#ffffff"},position:{width:"100%"}}]),r&&r.setFlash(i.flash)},!1)}},onBackPress:function(){r.close(),plus.navigator.setFullscreen(!1)},onUnload:function(){plus.navigator.setFullscreen(!1)}};e.default=c}).call(this,n("6e42")["default"])},"838e":function(t,e,n){"use strict";n.r(e);var a=n("0547"),i=n("5d11");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("aabe");var r,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"b3078ff2",null,!1,a["a"],r);e["default"]=s.exports},aabe:function(t,e,n){"use strict";var a=n("c800"),i=n.n(a);i.a},c800:function(t,e,n){}},[["5d1b","common/runtime","common/vendor"]]]);