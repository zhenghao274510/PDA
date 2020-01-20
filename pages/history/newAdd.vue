<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.common.registration" @click="onClick"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-list">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						AWB
					</view>
					<view class="myInput">
						<input type="text" class="input" v-model="awb" @blur="searchAwb" maxlength="50" />
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.flightName}}
					</view>
					<flight-select :list="ManifestType" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @click="changeFlight">
					</flight-select>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsName}}
					</view>
					<good-name-select :list="goodNameType" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @click="changeGoodName">
					</good-name-select>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.number}}
					</view>
					<view class="myInput" hover-class="input-hover">
						<input type="text" class="input" value="" v-model="number" disabled />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.registerNumber}}
					</view>
					<x-input :value.sync="registerNumber" @click="changeNumber" :type="1"></x-input>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.wmsWarehouse}}
					</view>
					<house-select :list="categoryList" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @click="changeStoreName">
					</house-select>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsType}}
					</view>
					<good-type-select :list="goodsType" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @click="changeGoodsType">
					</good-type-select>
				</view>
			</view>
			<view class="uni-add-list">
				<view class="uni-add-list-one">
					{{lang.common.remarks}}
				</view>
				<view class="myInput" hover-class="input-hover">
					<input type="text" value="" class="input" v-model="remarks" />
				</view>
			</view>

			<view class="uni-his-btn" hover-class="btn-hover" @click="flightDetials">
				{{lang.bass.flightDetails}}
			</view>
		</view>
		<page-foot :footTxt="lang.common.save" @click="save"></page-foot>
		<view class="hide-con" v-if="saveTrue">
			<!-- <scroll-view scroll-y class="scrool-warpe"> -->
			<view class="hide-info">
				<view class="uni-add-item scrool-warpe">
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one ">
							{{lang.common.departure}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="departureStation" /> -->
							{{dataObj.departureStation}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.destinationStation}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="destinationStation" /> -->
							{{dataObj.destinationStation}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.shipperName}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="shipperName" /> -->
							{{dataObj.shipperName}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.shipperAddress}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="shipperAddress" /> -->
							{{dataObj.shipperAddress}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.shipperPhone}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="shipperPhone" /> -->
							{{dataObj.shipperPhone}}
						</view>

					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.receiverName}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverName" /> -->
							{{dataObj.receiverName}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.receiverAddress}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverAddress" /> -->
							{{dataObj.receiverAddress}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.receiverPhone}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{dataObj.receiverPhone}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.chargeableWeight}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{chargeableWeight}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.rateClass}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{rateClass}}
						</view>
					</view>
					<view class="uni-add-list uni-bor-bottom">
						<view class="uni-add-list-one">
							{{lang.common.grossWeight}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{grossWeight}}
						</view>
					</view>
					<view class="uni-add-list ">
						<view class="uni-add-list-one">
							{{lang.common.productCode}}
						</view>
						<view class="uni-his-left-list-two">
							<!-- <input type="text" value="" v-model="receiverPhone" /> -->
							{{productCode}}
						</view>
					</view>


				</view>
				<view class="hide-btn" hover-class="btn-hover" @tap.stop="saveTrue=false">
					{{lang.common.confirm}}
				</view>
			</view>

		</view>
		<message ref="Message"></message>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import xflSelect from "@/components/xfl-select/xfl-select.vue"
	import flightSelect from "@/components/xfl-select/flight-select.vue"
	import goodNameSelect from "@/components/xfl-select/goodName-select.vue"
	import goodTypeSelect from "@/components/xfl-select/goodType-select.vue"
	import houseSelect from "@/components/xfl-select/hose-select.vue"
	import xInput from "@/components/x-input/x-input.vue"
	// import boboMessage from "@/components/bobo-message/bobo-message.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				saveTrue: false,
				goodsType: getApp().globalData.goodsType,
				ManifestType: [], //  航单下拉菜单
				goodNameType: [], //  货品名称
				categoryList: [], //   分拣登记点
				minHeight: '',
				dataObj: {},
				awb: "",
				flightId: "",
				goodsNameId: "",
				registerNumber: 0,
				wmsWarehouseId: "",
				wmsManifestId: "",
				number: 0,
				remarks: '',
				departureStation: "",
				destinationStation: "",
				shipperName: "",
				shipperAddress: "",
				shipperPhone: "",
				receiverName: "",
				receiverAddress: "",
				receiverPhone: "",
				grossWeight: "",
				chargeableWeight: "",
				rateClass: "",
				productCode: "",
				choseGoodsType: ''
			}
		},
		components: {
			pageHeade,
			pageFoot,
			houseSelect,
			goodNameSelect,
			goodTypeSelect,
			flightSelect,
			xflSelect,
			xInput
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		onLoad() {
			this.searchStoreNmae();
		},
		onSHow() {
			this.minHeight = uni.getStorageSync('height')
			console.log(this.minHeight)
		},
		methods: {
			flightDetials() {
				if (this.awb != '') {
					this.saveTrue = true;
				}
			},
			searchAwb() {
				if (this.awb != '') {
					let parmas = {
						awb: this.awb
					};
					console.log(parmas)
					this.$REQ.get(parmas,
						"manifest/findManifestByAwb").then(res => {
						console.log(res)
						res.flag ? (this.flightId = res.result.id, this.searchManifestId(res.result.id), this.searchGoodName(
							res.result.id), this.dataObj = res.result) : this.$refs.Message.error({
							content: this.$api.getError(res.errorCode),
							duration: 2000,
							background: false
						})
					}).catch(err => {})
				}

			},
			searchManifestId(id) {
				let parmas = {
					wmsManifestId: id
				};
				this.$REQ.get(parmas, "manifest/findFlightByWmsManifestId").then(res => {
					res.flag ? (res.result.forEach(item => {
						item.value = item.flight
					}), this.ManifestType = res.result) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			searchGoodName(id) {
				let parmas = {
					wmsManifestId: id
				};
				this.$REQ.get(parmas, "manifest/findGoodsNameByWmsManifestId").then(res => {
					res.flag ? (res.result.forEach(item => {
							item.value = item.goodsName
						}), this.goodNameType = res.result) :
						this.$refs.Message.error({
							content: this.$api.getError(res.errorCode),
							duration: 2000,
							background: false
						})
				}).catch(err => {})
			},
			searchStoreNmae() {
				let parmas = {
					state: '1'
				};
				this.$REQ.get(parmas, "sortingRegister/findWarehouseList").then(res => {
					res.flag ? (res.result.forEach(item => {
						item.value = item.name
					}), this.categoryList = res.result) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			searchNumber(id) {
				let parmas = {
					goodsNameId: id
				};
				this.$REQ.get(parmas, "manifest/findWmsManifestGoodsByGoodsNameId").then(res => {
					console.log(res)
					res.flag ? (this.number = res.result.number) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},

			onClick(e) {
				e == 0 ? uni.navigateBack() : this.$api.navTo('/pages/history/history')
			},
			changeFlight(e) {
				console.log(e)
				this.flightId = e.id;
				this.wmsManifestId = e.wmsManifestId;
				this.number = e.lineNumber;
			},
			changeGoodName(e) {
				console.log(e)

				this.goodsNameId = e.id;
				this.number = e.number
				this.grossWeight = e.grossWeight;
				this.productCode = e.productCode;
				this.rateClass = e.rateClass;
				this.chargeableWeight = e.chargeableWeight;
			},
			changeStoreName(e) {
				console.log(e)
				this.wmsWarehouseId = e.id;
			},
			changeGoodsType(e) {
				console.log(e)
				this.choseGoodsType = e.label;

			},
			changeNumber(e) {
				this.registerNumber = e;
			},
			error(res) {
				if (res.goodsNameId != "" && res.goodsNameId != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.goodsNameId),
						duration: 2000,
						background: false
					})
				}
				if (res.wmsWarehouseId != "" && res.wmsWarehouseId != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.wmsWarehouseId),
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
				if (res.registerNumber != "" && res.registerNumber != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.registerNumber),
						duration: 2000,
						background: false
					})
				}
				if (res.wmsManifestId != "" && res.wmsManifestId != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.wmsManifestId),
						duration: 2000,
						background: false
					})
				}
			},
			save() {

				let parmas = {
					awb: this.awb,
					flightId: this.flightId,
					goodsNameId: this.goodsNameId,
					registerNumber: this.registerNumber,
					wmsWarehouseId: this.wmsWarehouseId,
					goodsType: this.choseGoodsType,
					wmsManifestId: this.wmsManifestId,
					remarks: this.remarks,
					number: this.number,
					departureStation: this.dataObj.departureStation,
					destinationStation: this.dataObj.destinationStation,
					shipperName: this.dataObj.shipperName,
					shipperAddress: this.dataObj.shipperAddress,
					shipperPhone: this.dataObj.shipperAddress,
					receiverName: this.dataObj.receiverName,
					receiverAddress: this.dataObj.receiverAddress,
					receiverPhone: this.dataObj.receiverPhone,
					grossWeight: this.grossWeight,
					chargeableWeight: this.chargeableWeight,
					rateClass: this.rateClass,
					productCode: this.productCode
				};
				console.log(parmas)
				uni.showLoading({})
				this.$REQ.post(parmas, "sortingRegister/addSortingRegister").then(res => {
					console.log(res)
					uni.hideLoading()
					res.flag ? (this.$api.tip(this.lang.tip.success), this.awb = '',
						this.flightId = '',
						this.goodsNameId = '',
						this.registerNumber = 0,
						this.wmsWarehouseId = '',
						his.choseGoodsType = '',
						this.wmsManifestId = '',
						this.remarks = '',
						this.number =0,
						this.dataObj = {},
						this.grossWeight =0,
						this.chargeableWeight =0,
						this.rateClass = '',
						this.productCode = ''
					):this.error(res.result)
				}).catch(err => {})
			}

			// }
		}
	}
</script>

<style lang="scss" soped>
	@charset "UTF-8";

	.all {
		padding-bottom: 100px;
	}

	.uni-add-swiper {
		width: 90%;
		margin: 0 auto;
	}

	.uni-add-item {
		background: $uni-bg-color;
		// border-radius: $uni-border-radius-lg;
		display: flex;
		flex-direction: column;
	}

	.myInput {
		height: 50px;
		font-size: 16px;
		border-radius: 5px;
		border: 1px solid #c0c4cc;

		.input {
			height: 50px;
			line-height: 50px;
			font-size: 28upx;
			padding-left: 15px;
		}

		input {
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			padding-left: 15px;
		}
	}

	.uni-add-list {
		width: 100%;
	}

	.uni-add-list-one {
		font-weight: 600;
		color: #222222;
		padding: 5px 0;
	}

	.uni-his-btn {
		width: 90%;
		margin: 40px auto 0 auto;
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
</style>
