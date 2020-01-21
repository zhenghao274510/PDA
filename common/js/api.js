import store from '@/store';

const api = {
	tip(a) {
		uni.showToast({
			title: a,
			icon: "none",
			duration: 1500
		})
	},
	getError(err){
		console.log(store.state)
		let error=Object.keys(store.state.lang.error);
		let val=Object.values(store.state.lang.error);
		let num=0;
		if( err.indexOf('?')==-1 ){
			error.forEach((item,index)=>{
				if(item==err){
					num=index
				}
			})
			return val[num]
		}else{
			let str1=err.split('?')[0];
			let lastData=err.split('?')[1]
			let arr = lastData.split('&');
			let str4='';
			let endStr='';
			console.log(arr)
			error.forEach((item,index)=>{
				if(item==str1){
					num=index
				}
			})
			str4=val[num];
				for(let i;i<arr.length;i++){
					console.log(1)
					 str4=str4.replace(new RegExp(/\'{'+arr[i].split('=')[0]+'}'/g,arr[i].split('=')[1]) )
				}
				console.log(str4)
			// })
			
			setTimeout(()=>{
				return str4
			},30)
			
			
		}
		
	},
	navTo(b) {
		uni.navigateTo({
			url: b
		})
	},
	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		return prePage.$vm;
	},
	formatTime(unixtime) {
		if (typeof unixtime == undefined) {
			return;
		} else {
			var date = new Date(unixtime);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? "0" + m : m;
			var d = date.getDate();
			d = d < 10 ? "0" + d : d;
			var h = date.getHours();
			h = h < 10 ? "0" + h : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? "0" + minute : minute;
			second = second < 10 ? "0" + second : second;
			return y + "-" + m + "-" + d + " " + h + ":" + minute;
		}
	},
	parsePrice(money) {
		var n = 2;
		money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = money.split(".")[0].split("");
		var r = money.split(".")[1];
		var t = "";
		for (let i = 0; i < l.length; i++) {
			t += l[i];
		}
		return t + "." + r;
	}
}
export default api;
