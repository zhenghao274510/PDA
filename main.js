import Vue from 'vue'
import App from './App'
import api from "@/common/js/api.js"
import http from "@/common/js/request.js"
import upms from "@/common/js/upms.js"
import boboMessage from '@/components/bobo-message/bobo-message.vue'


// 使用自定义消息提示
Vue.component('message', boboMessage)
// 挂载 vueX
import store from './store';
Vue.prototype.$store = store;
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$REQ = http;
Vue.prototype._reqw = upms;
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
