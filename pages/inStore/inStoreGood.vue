<template>
	<view>
		<cover-view class="uni-page-scan-con">
			<cover-view class="uni-page-scan-left">

				<cover-image src="static/backBar.png" mode="scaleToFill" class="imgsBack" @click.stop="onClick(0)"></cover-image>
				<cover-view class="uni-page-scan-title" style="color: #FFFFFF;">{{lang.title.WarehouseGoods}}</cover-view>
			</cover-view>
			<cover-image src="static/lishijilu.png" mode="scaleToFill" class="imgsLi" @click.stop="onClick(1)"></cover-image>
		</cover-view>
	</view>
</template>
<script>
	import {mapState} from "vuex"
	var barcode = null;
	export default {
		data() {
			return {
				flash: true, //是否打开摄像头
				type: '',
				content:"",
				light:'',
				height:''

			};
		},
		computed:{
			...mapState([
				'lang'
			])
		},
		onLoad(d) {
			this.content=this.lang.title.Manualinventory;
			this.light=this.lang.bass.light;
			this.height=uni.getStorageSync("height");
			
			var n = d.text;
			this.type = d.type;
			if (n) {
				this.name = n;
			}
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			// #ifdef APP-PLUS
			// plus.navigator.setFullscreen(true); //全屏
			var currentWebview = page.$getAppWebview();
			this.createBarcode(currentWebview); //创建二维码窗口
			this.createView(currentWebview); //创建操作按钮及tips界面
			// #endif
		},
		methods: {
			onClick(n) {
				n == 0 ? (uni.navigateBack()) : this.$api.navTo('/pages/inStore/historyInStore')
			},
			// 扫码成功回调
			onmarked(type, result) {
				var text = '未知: ';
				switch (type) {
					case plus.barcode.QR:
						text = 'QR: ';
						break;
					case plus.barcode.EAN13:
						text = 'EAN13: ';
						break;
					case plus.barcode.EAN8:
						text = 'EAN8: ';
						break;
				}
				plus.navigator.setFullscreen(false);
				this.$api.navTo(`/pages/inStore/newIn?id=${result}&type=0`)
				this.$api.tip(type + result);
				barcode.close();
			},
			// 创建二维码窗口
			createBarcode(currentWebview) {
				let filter = [plus.barcode.EAN13, plus.barcode.EAN8, plus.barcode.UPCA, plus.barcode.UPCE, plus.barcode.CODABAR]
				barcode = plus.barcode.create('barcode', filter, {
					top: '0',
					left: '0',
					width: '100%',
					height: this.height,
					scanbarColor: 'green',
					position: 'static',
					frameColor: 'green'
				});
				barcode.onmarked = this.onmarked;
				barcode.setFlash(this.flash);
				currentWebview.append(barcode);
				barcode.start();
			},
			// 创建操作按钮及tips
			createView(currentWebview) {
				// 创建打开手电筒的按钮
				var scanBarVew = new plus.nativeObj.View('scanBarVew', {
						top: '60%',
						left: '40%',
						height: '10%',
						width: '20%'

					},
					[{
							tag: 'img',
							id: 'scanBar',
							src: 'static/scanBar.png',
							position: {
								width: '28%',
								left: '36%',
								height: '30%'
							}
						},
						{
							tag: 'font',
							id: 'font',
							text: this.light,
							textStyles: {
								size: '10px',
								color: '#ffffff'
							},
							position: {
								width: '100%'
							}
						}
					]);
				// 创建展示类内容组件
				var content = new plus.nativeObj.View('content', {
						bottom: '25%',
						left: '0px',
						height: '40px',
						width: '100%'

					},
					[{
						tag: 'font',
						id: 'scanTips',
						text: this.content,
						textStyles: {
							size: '14px',
							color: 'yellow',
							whiteSpace: 'normal'
						},
						position: {
							bottom: '0',
							left: '10%',
							width: '80%',
							height: 'wrap_content'

						}
					}]);
				scanBarVew.interceptTouchEvent(true);
				content.interceptTouchEvent(true);
				currentWebview.append(content);
				currentWebview.append(scanBarVew);
				content.addEventListener("click", () => {
					uni.navigateTo({
						url: "/pages/inStore/newIn?type=1"
					})
				});
				var temp = this;
				scanBarVew.addEventListener("click", function(e) { //点亮手电筒
					temp.flash = !temp.flash;
					if (temp.flash) {
						scanBarVew.draw([{
								tag: 'img',
								id: 'scanBar',
								src: 'static/yellow-scanBar.png',
								position: {
									width: '28%',
									left: '36%',
									height: '30%'
								}
							},
							{
								tag: 'font',
								id: 'font',
								text: this.light,
								textStyles: {
									size: '10px',
									color: '#ffffff'
								},
								position: {
									width: '100%'
								}
							}
						]);
					} else {
						scanBarVew.draw([{
								tag: 'img',
								id: 'scanBar',
								src: 'static/scanBar.png',
								position: {
									width: '28%',
									left: '36%',
									height: '30%'
								}
							},
							{
								tag: 'font',
								id: 'font',
								text: this.light,
								textStyles: {
									size: '10px',
									color: '#ffffff'
								},
								position: {
									width: '100%',
								}
							}
						])
					}
					if (barcode) {
						barcode.setFlash(temp.flash);
					}
				}, false)

			}
		},
		onBackPress() {
			// #ifdef APP-PLUS
			// 返回时退出全屏
			barcode.close();
			plus.navigator.setFullscreen(false);
			// #endif
		},
		onUnload() {
			plus.navigator.setFullscreen(false);
		}


	};
</script>

<style scoped>
	.uni-page-scan-con {
		background: transparent;
		width: 95%;
		height: 160px;
		margin-left: 5%;
		display: flex;
		align-items: center;

	}

	.uni-page-scan-left {
		display: flex;
		height: 160px;
		flex: 1;
		align-items: center;
	}

	.imgsBack {
		width: 60px;
		height: 60px;
	}

	.imgsLi {
		width: 40px;
		height: 40px;
		margin-top: 10px;
	}

	.uni-page-scan-title {
		font-size: 40px;
		font-weight: bold;
	}
</style>
