<template>
	<view class="uni-his-details all">
		<page-heade :title="lang.common.historyDetails" :showRightText="showRightText" @click="onClick"></page-heade>
		<view class="his-chose-con page-top-padding">
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					AWB
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.awb}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.flightName}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.flightName}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.goodsName}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.goodsName}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.number}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.number}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.registerNumber}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.number}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.wmsWarehouse}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.wmsWarehouseName}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.goodsType}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.goodsType}}
				</view>
			</view>
		</view>
		<view class="uni-his-btn" hover-class="btn-hover" @click="changeInfo(0)">
			{{lang.bass.flightDetails}}
		</view>
		<view class="uni-his-btn" hover-class="btn-hover" @click="changeInfo(1)">
			{{lang.bass.barCode}}
		</view>

		<view class="page-share-title page-foot">
			<view class="page-change page-bottom-item" hover-class="hover" @click="changeInfo(2)">
				{{lang.common.Change}}
			</view>
			<view class="page-del page-bottom-item uni-bor-left" hover-class="hover" @click="changeInfo(3)">
				{{lang.common.delete}}
			</view>
		</view>
		<view class="uni-popup-hide" @click.stop="doChange(0)" v-if="showChange">
			<view class="uni-content-hide">
				<view class="uni-content-hide-top">
					<view class="uni-add-list">
						<view class="uni-add-list-one">
							{{lang.bass.goodsType}}
						</view>
						<good-type-select :list="goodType" :clearable="false" :showItemNum="goodType.length" :listShow="false"
						 :isCanInput="false" :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40"
						 :selectHideType="'hideAll'" @click="changChoose">
						</good-type-select>
					</view>
				</view>
				<view class="uni-content-hide-bottom">
					<view class="uni-content-left" @click="doChange(1)">
						{{lang.common.confirm}}
					</view>
					<view class="uni-content-right" @click="doChange(2)">
						{{lang.common.Cancel}}
					</view>
				</view>
			</view>
		</view>
		<!-- 行单详情 -->
		<view class="hide-con" v-if="saveTrue" @click.stop="saveTrue=false">
			<view class="hide-info">
				<view class="uni-add-item scrool-warpe">
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one ">
							{{lang.common.departure}}
						</view>
						<view class="uni-his-left-list-two">
							{{dataObj.departureStation}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.destinationStation}}
						</view>
						<view class="uni-his-left-list-two">
							{{dataObj.destinationStation}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.shipperName}}
						</view>
						<view class="uni-his-left-list-two">
							{{dataObj.shipperName}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.shipperAddress}}
						</view>
						<view class="uni-his-left-list-two">
							{{dataObj.shipperAddress}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.shipperPhone}}
						</view>
						<view class="uni-his-left-list-two">
							{{dataObj.shipperPhone}}
						</view>

					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.receiverName}}
						</view>
						<view class="uni-his-left-list-two">
							{{dataObj.receiverName}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.receiverAddress}}
						</view>
						<view class="uni-his-left-list-two">
							{{dataObj.receiverAddress}}
						</view>
					</view>
					<view class="uni-add-list ">
						<view class="uni-add-list-one">
							{{lang.common.receiverPhone}}
						</view>
						<view class="uni-his-left-list-two">
							{{dataObj.receiverPhone}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.chargeableWeight}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{dataObj.chargeableWeight}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.rateClass}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{dataObj.rateClass}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.grossWeight}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{dataObj.grossWeight}}
						</view>
					</view>
					<view class="uni-add-list ">
						<view class="uni-add-list-one">
							{{lang.common.productCode}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{dataObj.productCode}}
						</view>
					</view>

				</view>
				<view class="hide-btn" hover-class="btn-hover" @tap.stop="saveTrue=false">
					{{lang.common.confirm}}
				</view>
			</view>
		</view>
		<message ref="Message"></message>
		<!-- 条形码 -->
		<view class="hide-con" v-if="showCode" @click.stop="showCode=false">
			<view class="hide-info">
				<view class="title">
					{{lang.bass.barCode}}
				</view>
				<view class="uni-add-list-one borderCodeCon" v-for="(v,k) in codeList" :key="k">
					{{v.barCode}}
				</view>
			</view>
		</view>
		<poup-hide v-if="showModel" @click="doSomething"></poup-hide>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import poupHide from "@/components/poup-hide.vue"
	import goodTypeSelect from "@/components/xfl-select/goodType-select.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				showRightText: false,
				footTxt: '',
				goodType: getApp().globalData.goodsType,
				dataObj: {},
				showModel: false,
				showChange: false,
				showCode: false,
				list: [],
				codeList: [],
				saveTrue: false,
				endGoodType: ''
			}
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		components: {
			pageHeade,
			poupHide,
			goodTypeSelect
		},
		onLoad(options) {
			this.dataObj = JSON.parse(options.id)
			console.log(this.dataObj)
			this.list = getApp().globalData.goodsType
		},
		methods: {
			changeInfo(type) {
				switch (type) {
					case 0:
						this.awbDetail();
						break;
					case 1:
						this.awbScode();
						break;
					case 2:
						this.showChange = true;
						break;
					case 3:
						this.showModel = true;
						break;
				}
			},
			changChoose(e) {
				console.log(e)
				this.endGoodType = e.label
			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo('/pages/history/history')
			},
			awbDetail() {
				this.saveTrue = true
			},
			awbScode() {
				let parmas = {
					sortingRegisterId: this.dataObj.id
				};
				console.log(parmas)
				this.$REQ.get(parmas , "sortingRegister/findWmsSortingRegisterDetailList").then(res => {
					console.log(res)
					res.flag ? (this.showCode = true, this.codeList = res.result) : tthis.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			changData() {
				let parmas = {
					id: this.dataObj.id, //主链
					version: this.dataObj.version, //  版本号
					goodsType: this.endGoodType
				}
				console.log(parmas)
				this.$REQ.post(parmas, "sortingRegister/updateSortingRegister").then(res => {
					res.flag ? (this.$api.tip(this.lang.tip.success), setTimeout(() => {
						this.$api.back()
					}, 100)) : this.error(res.result)
				}).catch(err => {})
			},
			del() {
				let parmas = {
					id: this.dataObj.id, //主链
					version: this.dataObj.version, //  版本号
				}
				console.log(parmas)
				this.$REQ.post(parmas, "sortingRegister/deleteSortingRegister").then(res => {
					console.log(res)
					res.flag ? (this.$api.tip(this.lang.tip.success), setTimeout(() => {
						this.$api.back()
					}, 100)) : (this.error(res.result))
				}).catch(err => {})
			},
			error(res) {
				if (res.version != "" && res.version != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.version),
						duration: 2000,
						background: false
					})
				}
				if (res.goodsType != "" && res.goodsType != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.goodsType),
						duration: 2000,
						background: false
					})
				}
				if (res.id != "" && res.id != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.id),
						duration: 2000,
						background: false
					})
				}
			},
			// 修改
			doChange(e) {
				switch (e) {
					case 0:
						this.showChange = false;
						break;
					case 1:
						this.changData();
						break;
					case 2:
						this.showChange = false;
						break;
				}
			},
			doSomething(e) {
				switch (e) {
					case 0:
						this.showModel = false;
						break;
					case 1:
						this.del();
						break;
					case 2:
						console.log("取消")
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.his-chose-con {
		width: 90%;
		margin: 0 auto;
	}

	.his-chose-con-list {
		border-bottom: 2px solid #ebebeb;
		padding: 5px 0;
	}

	.uni-his-btn {
		width: 90%;
		margin: 10px auto;
		text-align: center;
		color: $uni-text-color-inverse;
		background: $uni-bg-color-grey;
		border-radius: $uni-border-radius-lg;
		padding: 15px 0;
	}

	.hide-con {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background: rgba(0, 0, 0, .5);
	}

	.scrool-warpe {
		padding: 20px;
	}

	.hide-info {
		width: 80%;
		height: 75%;
		border-radius: 15px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow-y: scroll;
		background: #FFFFFF;
	}

	.hide-btn {
		text-align: center;
		font-size: 30upx;
		color: #ff8300;
		background: #FFFFFF;
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		border-top: 10px solid #F0F0F0;
		border-radius: 0 0 15px 15px;
	}

	.title {
		text-align: center;
		padding: 15px 0;
		font-weight: bold;
		border-bottom: 10px solid #CCCCCC;
	}
	.borderCodeCon{
		text-align: center;
		padding: 5px 0;
	}
</style>
