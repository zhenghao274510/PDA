<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.title.newlibrary" @click="onClick"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-item">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.barCode}}
					</view>
					<view class="myInput" v-if="type==1">
						<input type="text" class="input" value="" v-model="barCode" @blur="productCode" />
					</view>
					<view class="myInput" v-else>
						{{barCode}}
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.inputDate}}
					</view>
					<view class="myInput" @click="choseDate">
						{{inputDate}}
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.Storagewarehouse}}
					</view>
					<view class="myInput">
						<input type="text" value="" class="input" v-model="dataObj.wmsWarehouseIdName" />
					</view>
					<!-- 		<store-select :list="storeList" :clearable="false"  :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changStore">
					</store-select> -->
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.palletNumber}}
					</view>
					<view class="myInput" hover-class="input-hover">
						<input type="text" value="" v-model="palletNumber" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.weight}}(kg)
					</view>
					<!-- <view class="myInput">
						<input type="text" value="" v-model="weight" />
					</view> -->
					<x-input :value="weight" @click="changeNumber" :type="0"></x-input>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsType}}
					</view>
					<view class="myInput" v-if="dataObj.goodsType==undefined">
						<!-- <input type="text" value="" v-model="goodName" /> -->
					</view>

					<view class="myInput" v-else>
						<input type="text" value="" v-model="dataObj.goodsType" />
					</view>
					<!-- <good-type-select :list="goodType" :clearable="false" :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changGood">
					</good-type-select> -->
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.productCode}}
					</view>
					<view class="myInput">
						<input type="text" value="" class="input" v-model="dataObj.productCode" />
					</view>
					<!-- 	<xfl-select :list="productCodeList" :clearable="false"  :listShow="false"
					 :isCanInput="false" :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'"
					 @change="changeProduct">
					</xfl-select> -->
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsName}}
					</view>
					<view class="myInput">
						<input type="text" class="input" v-model="goodsName" />
					</view>
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

		</view>
		<message ref="Message"></message>
		<page-foot :footTxt="lang.common.save" @click="save"></page-foot>
		<w-picker mode="date" :current="true" :endYear="endYear" @confirm="onConfirm" ref="date" themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import xflSelect from "@/components/xfl-select/xfl-select.vue"
	import goodTypeSelect from "@/components/xfl-select/goodType-select.vue"
	import storeSelect from "@/components/xfl-select/store-select.vue"
	import xInput from "@/components/x-input/x-input.vue"
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				storeList: [],
				goodType: getApp().globalData.goodsType,
				productCodeList: [], //商品代号
				minHeight: '',
				barCode: '',
				inputDate: '',
				palletNumber: '',
				weight: 0,
				goodsName: '',
				endYear: new Date(),
				choseStore: {},
				choseProductCode: {},
				choseGoodType: {},
				dataObj: {},
				type: 1,
				remarks: ''
			}
		},
		components: {
			pageHeade,
			pageFoot,
			xflSelect,
			xInput,
			wPicker,
			goodTypeSelect,
			storeSelect
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		onLoad(options) {
			// this.type = options.type;
			this.type == 0 ? (this.barCode = options.id, this.productCode()) : this.barCode = "";
			this.barCode = "1579067995071";
			this.productCode()
			// this.minHeight = uni.getStorageSync('height')
			// console.log(this.minHeight)
		},
		methods: {
			changeNumber(e) {
				this.weight = e;
			},
			productCode() {
				let parmas = {
					barCode: this.barCode
				};
				console.log(parmas)
				this.$REQ.get(parmas, "billInput/findInfoByBarCode").then(res => {
					console.log(res)
					res.flag ? (this.dataObj = res.result, this.goodsName = res.result.goodsName, this.weight = res.result.weight,
							this.palletNumber = res.result.palletNumber) :
						this.$refs.Message.error({
							content: this.$api.getError(res.errorCode),
							duration: 2000,
							background: false
						})
				}).catch(err => {})
			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo('/pages/inStore/historyInStore')
			},
			loadData() {
				let parmas = {
					state: ''
				};
				this.$REQ.get(parmas, "billStockCheck/findWarehouseList").then(res => {
					// console.log(res)
					res.flag ? res.result.forEach(item => {
						item.value = item.name;
						this.storeList.push(item)
					}) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			save() {
				let parmas = {
					barCode: this.barCode,
					inputDate: this.inputDate,
					palletNumber: this.palletNumber,
					weight: this.weight,
					remarks: this.remarks
				}
				console.log(parmas)
				this.$REQ.post(parmas, "billInput/addBillInput").then(res => {
					res.flag ? (this.$api.tip(this.lang.tip.success), this.barCode = '',
						this.inputDate = '',
						this.palletNumber = '0',
						this.weight = 0,
						this.remarks = '') : this.error(res.result)
				}).catch(err => {})
				// }

			},
			error(res) {
				if (res.palletNumber != "" && res.palletNumber != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.palletNumber),
						duration: 2000,
						background: false
					})
				}
				if (res.weight != "" && res.weight != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.weight),
						duration: 2000,
						background: false
					})
				}
				if (res.inputDate != "" && res.inputDate != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.inputDate),
						duration: 2000,
						background: false
					})
				}
				if (res.barCode != "" && res.barCode != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.barCode),
						duration: 2000,
						background: false
					})
				}
			},
			onConfirm(e) {
				this.inputDate = e.result;
			},
			choseDate() {
				this.$refs.date.show();
			},
			changGood(e) {
				console.log(e)
				this.choseGoodType = e;
			},
			changeProduct(e) {
				console.log(e)
				this.choseProductCode = e;
			},
			changStore(e) {
				console.log(e)
				this.choseStore = e
			}
		}
	}
</script>

<style lang="scss">
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
		border-radius: $uni-border-radius-lg;
		display: flex;
		flex-direction: column;
	}

	.myInput {
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		border-radius: 5px;
		border: 1px solid #c0c4cc;
		padding-left: 15px;

		input {
			height: 50px;
			line-height: 50px;
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
</style>
