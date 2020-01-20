import Vue from 'vue';
import Vuex from 'vuex';
import http from "@/common/js/upms.js"
Vue.use(Vuex);

// 国际化相关代码
try {
	// 1. 分析用户已经选择的语言 
	var userLang = uni.getStorageSync("userLang");
	// 2. 如果用户没有选择过获取用户手机的语言
	if(!userLang){
		const sys = uni.getSystemInfoSync();
		userLang = sys.language;
	}
	console.log(userLang);
	// 以中英文切换为例, 其他语言请使用 getSystemInfoSync 获取语言对应的字符串
	// 然后扩展语言包即可
	if(userLang.substring(0,2) == 'zh'){
		var lang = require('../lang/zh-CN.js');
	}else{
		var lang = require('../lang/en.js');
	}
} catch (e) {
    // error
}
const store = new Vuex.Store({
	state: {
		lang : lang
	},
	mutations: {
		changeLang: function(state){
			uni.showActionSheet({
				itemList:['简体中文', 'English'],
				success:function(e){
					let LANG;
					if(e.tapIndex == 0){
						lang = require('../lang/zh-CN.js');
						LANG="zh-CN"
						console.log(111)
					}else{
						lang = require('../lang/en.js');
						LANG='en-US'
					}
					let parmas={
						path: 'upms',
						lang:LANG
					}
					http.post(parmas,'i18n/vueJsonByLang').then(res=>{
						console.log(res)
					}).catch(err=>{})
					state.lang = lang;
				}
			})
		}
	}
})
export default store;