(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/soldIn/headSoldIn"],{"51b0":function(t,e,n){"use strict";n.r(e);var a=n("7fef"),i=n("ff4f");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("a973");var r,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"5dd8f3dc",null,!1,a["a"],r);e["default"]=s.exports},"7b6e":function(t,e,n){},"7fef":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return a})},9110:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("2f62");function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){o(t,e,n[e])})}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r=null,c={data:function(){return{flash:!0,type:"",content:"",light:""}},computed:i({},(0,a.mapState)(["lang"])),onLoad:function(e){this.content=this.lang.title.Manualon,this.light=this.lang.bass.light,this.height=t.getStorageSync("height");var n=e.text;this.type=e.type,n&&(this.name=n);var a=getCurrentPages(),i=a[a.length-1],o=i.$getAppWebview();this.createBarcode(o),this.createView(o)},methods:{onClick:function(e){0==e?(t.navigateBack(),r.close()):this.$api.navTo("/pages/soldIn/soldInHistory?type=1")},onmarked:function(e,n){switch(e){case plus.barcode.QR:"QR: ";break;case plus.barcode.EAN13:"EAN13: ";break;case plus.barcode.EAN8:"EAN8: ";break}plus.navigator.setFullscreen(!1),t.navigateBack({delta:1}),this.$api.navTo("/pages/soldOut/newSoldOut?id=".concat(n,"&type=0")),this.$api.tip(e+n),r.close()},createBarcode:function(t){var e=[plus.barcode.EAN13,plus.barcode.EAN8,plus.barcode.UPCA,plus.barcode.UPCE,plus.barcode.CODABAR];r=plus.barcode.create("barcode",e,{top:"0",left:"0",width:"100%",height:this.height,scanbarColor:"green",position:"static",frameColor:"green"}),r.onmarked=this.onmarked,r.setFlash(this.flash),t.append(r),r.start()},createView:function(e){var n=new plus.nativeObj.View("scanBarVew",{top:"60%",left:"40%",height:"10%",width:"20%"},[{tag:"img",id:"scanBar",src:"static/scanBar.png",position:{width:"28%",left:"36%",height:"30%"}},{tag:"font",id:"font",text:this.light,textStyles:{size:"10px",color:"#ffffff"},position:{width:"100%"}}]),a=new plus.nativeObj.View("content",{bottom:"20%",left:"0px",height:"40px",width:"100%"},[{tag:"font",id:"scanTips",text:this.content,textStyles:{size:"14px",color:"yellow",whiteSpace:"normal"},position:{bottom:"0",left:"10%",width:"80%",height:"wrap_content"}}]);n.interceptTouchEvent(!0),a.interceptTouchEvent(!0),e.append(a),e.append(n),a.addEventListener("click",function(){t.navigateTo({url:"/pages/soldIn/newSoldIn?type=1"})});var i=this;n.addEventListener("click",function(t){i.flash=!i.flash,i.flash?n.draw([{tag:"img",id:"scanBar",src:"static/yellow-scanBar.png",position:{width:"28%",left:"36%",height:"30%"}},{tag:"font",id:"font",text:this.light,textStyles:{size:"10px",color:"#ffffff"},position:{width:"100%"}}]):n.draw([{tag:"img",id:"scanBar",src:"static/scanBar.png",position:{width:"28%",left:"36%",height:"30%"}},{tag:"font",id:"font",text:this.light,textStyles:{size:"10px",color:"#ffffff"},position:{width:"100%"}}]),r&&r.setFlash(i.flash)},!1)}},onBackPress:function(){r.close(),plus.navigator.setFullscreen(!1)},onUnload:function(){plus.navigator.setFullscreen(!1)}};e.default=c}).call(this,n("6e42")["default"])},a973:function(t,e,n){"use strict";var a=n("7b6e"),i=n.n(a);i.a},f37c:function(t,e,n){"use strict";(function(t){n("855e"),n("921b");a(n("66fd"));var e=a(n("51b0"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},ff4f:function(t,e,n){"use strict";n.r(e);var a=n("9110"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a}},[["f37c","common/runtime","common/vendor"]]]);