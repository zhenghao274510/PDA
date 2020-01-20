const bassUrl=require('./bass.js').upmsapi;
const upms={
	post(data = {},t) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: encodeURI(`${bassUrl}/upmsapi/`+t),
				method: "POST",
				data: data,
				sslVerify:false,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
					// 'X-CSRF-TOKEN': uni.getStorageSync('Xcsrftoken'),
					'X-APP-UACCOUNT':uni.getStorageSync('account')
					
				}, 
				success: function(res) {
					// success
					uni.hideLoading();
					resolve(res);
				},
				fail: function(error) {
					// fail
					uni.hideLoading();
					reject(error);
				},
				complete: function() {
					// complete
					uni.hideLoading();
				}
			})
		})
	},
	get(data = {},t) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: encodeURI(`${bassUrl}/upmsapi/`+t),
				method: "get",
				data: data,
				sslVerify:false,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
					'X-APP-UACCOUNT':uni.getStorageSync('account'),
				}, 
				success: function(res) {
					// success
					uni.hideLoading();
					resolve(res);
				},
				fail: function(error) {
					// fail
					uni.hideLoading();
					reject(error);
				},
				complete: function() {
					// complete
					uni.hideLoading();
				}
			})
		})
	}
}
export default upms