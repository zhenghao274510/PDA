<template>
	<view>
		<cover-view class="uni-page-scan-con">
			<cover-view class="uni-page-scan-left">
				<cover-image src="static/backBar.png" mode="scaleToFill" class="imgsBack" @click="onClick(0)"></cover-image>
				<cover-view class="uni-page-scan-title" style="color: #FFFFFF;">{{lang.bass.newWindow}}</cover-view>
			</cover-view>

		</cover-view>

		<!-- 弹出层 -->
		<view class="uni-popup-hide" @click.stop="onClick(1)" v-if="show">
			<view class="uni-content-hide">
				<view class="uni-content-hide-top">
					<view class="uni-add-list">
						<view class="uni-add-list-one">
							{{lang.bass.barCode}}
						</view>
						<view class="myInput">
							{{barCode}}
						</view>
					</view>
					<view class="uni-add-list">
						<view class="uni-add-list-one">
							{{lang.bass.Warehouse}}
						</view>
						<view class="myInput">
							{{WarehouseName}}
						</view>
					</view>
					<view class="uni-add-list pos-con">
						<view class="uni-add-list-one">
							{{lang.common.wmsWarehouseDetailName}}
						</view>
						<!-- <view class="myInput"> -->
						<store-select :list="chuweiList" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
						 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="choseGoods">
						</store-select>
						<!-- </view> -->
						<!-- <view class="myInput uni-flex-con" @click.stop="showItem=true">
							<view class="myInput-info">
								{{WarehouseName}}
							</view>
							<view class="icon-con">
								<view class="iconfont icon-downpx" style="color: #CCCCCC;font-size: 15px;" v-if="!showItem">

								</view>
								<view class="iconfont icon-up" style="color: #CCCCCC;font-size: 15px;" v-else>

								</view>
							</view>
						</view> -->
					</view>
				</view>
				<view class="uni-content-hide-bottom">
					<view class="uni-content-left" @click="onClick(2)">
						{{lang.common.confirm}}
					</view>
					<view class="uni-content-right" @click="onClick(3)">
						{{lang.common.Cancel}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	var barcode = null;
	import {
		mapState
	} from "vuex"
	import storeSelect from "@/components/xfl-select/store-select.vue"
	export default {
		data() {
			return {
				flash: true, //是否打开摄像头
				show: false,
				showItem: false,
				chuweiList: [],
				content: '手工录入',
				barCode: '',
				wmsWarehouseId: '',
				WarehouseName: "",
				wmsWarehouseDetailsName: '',
				wmsWarehouseDetailsId:'',
				version:'',
				id:''
			};
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		components: {
			storeSelect
		},
		onLoad(options) {
			this.wmsWarehouseId = options.wmsWarehouseId;
			this.id=options.id;
			this.getCuwei();
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
			choseGoods(e) {
				console.log(e)
				this.wmsWarehouseDetailsName = e.orignItem.code,
					this.wmsWarehouseDetailsId = e.orignItem.id,
					this.version=e.orignItem.version;
			},
			getCuwei() {
				let parmas = {
					wmsWarehouseId: this.wmsWarehouseId,
					state: '1'
				}
				this.$REQ.get(parmas, 'warehouseDetail/findWarehouseDetailList').then(res => {
					res.result.forEach(item => {
						item.value = item.code,
							this.chuweiList.push(item)
					});
					this.WarehouseName = res.result[0].wmsWarehouseModel.name
					console.log(res)
				}).catch(err => {})
			},
			onClick(n) {
				n == 0 || n == 3 || n === 1 ? uni.navigateBack() : (this.$api.prePage().barCode = this.barCode, this.$api.prePage()
					.wmsWarehouseDetailsId =
					this.wmsWarehouseDetailsId, this.$api.prePage()
					.wmsWarehouseDetailsName =
					this.wmsWarehouseDetailsName, this.$api.prePage().WarehouseName = this.WarehouseName, this.$api.prePage().version = this.version, uni.navigateBack())
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
				this.show = true;
				this.barCode = result;
				barcode.close();
				// this.$api.navTo(`/pages/soldOut/newSoldOut?id=${result}`)
				// this.$api.tip(type + result);

			},
			// 创建二维码窗口
			createBarcode(currentWebview) {
				let filter = [plus.barcode.EAN13, plus.barcode.EAN8, plus.barcode.UPCA, plus.barcode.UPCE, plus.barcode.CODABAR]
				barcode = plus.barcode.create('barcode', filter, {
					top: '0',
					left: '0',
					width: '100%',
					height: '100%',
					scanbarColor: 'green',
					position: 'static',
					frameColor: 'green',
					"z-index": '-1'
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

				var content = new plus.nativeObj.View('content', {
						bottom: '20%',
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
					uni.redirectTo({
						url: `/pages/stockStore/stockDetails?wmsWarehouseId=${this.wmsWarehouseId}&id=${this.id}`
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
								text: this.ligth,
								textStyles: {
									size: '10px',
									color: '#ffffff'
								},
								position: {
									width: '100%',
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
									width: '100%'
								}
							}
						])
					}
					if (barcode) {
						barcode.setFlash(temp.flash);
					}
				}, false)
			},
			getStoreName() {
				let parmas = {
					barCode: this.barCode
				};
				this.$REQ.get(parmas, "").then(res => {
					res.flag ? (this.list = res) : this.$api.tip(res.errorCode)
				}).catch(err => {})
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

<style scoped lang="scss">
	.uni-page-scan-con {
		background: transparent;
		width: 95%;
		height: 160px;
		margin-left: 5%;
		display: flex;
		align-items: center;

	}

	.uni-flex-con {
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.icon-con {
		width: 70px;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uni-page-scan-left {
		display: flex;
		height: 160px;
		flex: 1;
		align-items: center;
	}

	.myInput-info {
		border-right: 1px solid #ccc;
		width: 90%;
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

	.pos-con {
		position: relative;
	}

	.select-con {
		position: absolute;
		top: 150px;
		background: #FFFFFF;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		z-index: 9999;

		.select-con-item {
			height: 60px;
			line-height: 60px;
			padding: 5px 0;
			box-sizing: border-box;
			width: 100%;
		}
	}

	.uni-add-item {
		background: $uni-bg-color;
		border-radius: $uni-border-radius-lg;
		display: flex;
		flex-direction: column;
	}

	.myInput {
		height: 50px;
		line-height: 50px;
		font-size: 30px;
		border-radius: 5px;
		border: 1px solid #c0c4cc;
		padding-left: 15px;

		input {
			height: 50px;
			line-height: 50px;
			font-size: 26px;
		}
	}

	.uni-add-list {
		width: 100%;
	}

	.uni-add-list-one {
		font-weight: 600;
		color: #222222;
		padding: 10px 0;
	}

	.uni-page-scan-title {
		font-size: 40px;
		font-weight: bold;
	}

	.uni-content-hide {
		width: 85%;
		height: 550px;
		padding: 30px 0 0 0;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 20px;
		background: #FFFFFF;
		border: none;
	}

	.uni-content-hide-top {
		padding: 20px;
		height: 400px;
		box-sizing: border-box;
		text-indent: 10px;
		border: none;

	}

	.uni-content-hide-bottom {
		display: flex;
		align-items: center;
		height: 80px;
		border-top: 15px solid #f0f0f0;
	}

	.uni-content-left,
	.uni-content-right {
		flex: 1;
		height: 60px;
		line-height: 60px;
		text-align: center;
	}

	.uni-content-right {
		border-left: 2px solid #f0f0f0;
	}
</style>
