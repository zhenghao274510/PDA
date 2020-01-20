const bassUrl = require('./bass.js').wmsapi;
import axios from '@/node_modules/axios'
const http = {
	get(data = {}, t) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: encodeURI(`${bassUrl}/wms/` + t),
				method: "GET",
				data: data,
				responseType: "json", // 一般一个网站的responseType 都是一样的
				sslVerify:false,
				xhrFields: {
					withCredentials: true
				}, // 是否允许带cookie这些
				header: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
					'X-APP-UACCOUNT': uni.getStorageSync('account')
				},
				success: function(res) {
					resolve(res.data);
				},
				fail: function(error) {
					reject(error); //请求失败
				},
				complete: function() {}
			})
		})
	},
	post(data = {}, t) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: encodeURI(`${bassUrl}/wms/` + t),
				method: "POST",
				data: data,
				responseType: "json", // 一般一个网站的responseType 都是一样的
				sslVerify:false,
				xhrFields: {
					withCredentials: true
				}, // 是否允许带cookie这些
				header: {
					// application/x-www-form-urlencoded;charset=UTF-8,
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
					'X-APP-UACCOUNT': uni.getStorageSync('account')
				},
				success: function(res) {
					// success
					// uni.hideLoading();
					resolve(res.data);
				},
				fail: function(error) {
					// fail
					// uni.hideLoading();
					reject(error);
				},
				complete: function() {
					// complete
					// uni.hideLoading();
				}
			})
		})
	}

}


export default http;
