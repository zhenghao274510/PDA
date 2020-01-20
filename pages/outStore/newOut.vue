<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.title.outStore" @click="onClick"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-item">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.barCode}}
					</view>
					<!-- type 0   扫码  type 1 输入 -->
					<view class="myInput" v-if="type==1">
						<input type="text" value="" v-model="barCode" @blur="loadData" />
					</view>
					<view class="myInput" v-else>
						{{barCode}}
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.outputDate}}
					</view>
					<view class="myInput" @click="choseDate">
						{{outputDate}}
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.ladingNumber}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="ladingNumber" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.consignor}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="consignor" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.consignorPhone}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="consignorPhone" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsType}}
					</view>
					<view class="myInput">
						{{goodsType}}
					</view>
					<!-- 	<good-type-select :list="goodType" :clearable="false"  :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changeGoodType">
					</good-type-select> -->
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.outStore}}
					</view>
					<view class="myInput">
						{{outStore}}
					</view>
					<!-- 	<store-select :list="storeList" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changeStore">
					</store-select> -->
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.productCode}}
					</view>
					<view class="myInput">
						{{productCode}}
						<!-- <input type="number" value="" v-model="productCode" /> -->
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsName}}
					</view>
					<view class="myInput">
						{{goodsName}}
						<!-- <input type="number"  v-model="goodsName" /> -->
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.suspicion}}
					</view>
					<view class="myInput">
						{{suspicion}}
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.remarks}}
					</view>
					<view class="myInput">
						<input type="number" class="input" v-model="remarks" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.suspicionProblem}}
					</view>
					<view class="myInput">
						<input type="number" class="input" v-model="suspicionProblem" :disabled="disabled" />
					</view>
				</view>

			</view>

		</view>
		<page-foot :footTxt="lang.common.save" @click="save"></page-foot>
		<w-picker mode="date" startYear="2000" :endYear="endYear" :current="true" @confirm="onConfirm" ref="date" themeColor="#f00">
		</w-picker>
		<message ref="Message"></message>
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
				outStore: '',
				minHeight: '',
				barCode: '',
				outputDate: '',
				ladingNumber: '',
				consignor: '',
				consignorPhone: '',
				goodsName: '',
				goodsType: '',
				productCode: '',
				wmsStockId: '',
				remarks: '',
				endYear: new Date(),
				suspicion: '',
				type: 1,
				disabled: true,
				suspicionProblem: ''
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
			this.type == 0 ? (this.barCode = options.id, this.loadData()) : this.barCode = ''
			// this.loadData()
			this.minHeight = uni.getStorageSync('height')
			console.log(this.minHeight)
		},
		methods: {
			loadData() {
				// this.barCode="1579067995069" 
				// if (this.barCode != '') {
				let parmas = {
					barCode: this.barCode
				}
				console.log(parmas)
				this.$REQ.get(parmas, 'billOutput/findInfoByBarCode').then(res => {
					console.log(res)
					res.flag ? (this.goodsName = res.result.goodsName, this.outStore = res.result.wmsWarehouseIdName, this.goodsType =
							res.result.goodsType, this.productCode =
							res.result.productCode, this.wmsStockId = res.result.wmsStockId, this.suspicion = res.result.suspicion, this.remarks =
							res.result.remarks,
							res.result.suspicion == "有嫌疑" ? this.disabled = false : this.disabled = true
						) :
						this.$refs.Message.error({
							content: this.$api.getError(res.errorCode),
							duration: 2000,
							background: false
						})
				}).catch(err => {})
				// }

			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo('/pages/outStore/historyoutStore')
			},
			save() {
				let parmas = {
					barCode: this.barCode,
					outputDate: this.outputDate,
					ladingNumber: this.ladingNumber,
					consignor: this.consignor,
					consignorPhone: this.consignorPhone,
					wmsStockId: this.wmsStockId,
					suspicionProblem: this.suspicionProblem,
					remarks: this.remarks

				}
				console.log(parmas)
				uni.showLoading({})
				this.$REQ.post(parmas, 'billOutput/addBillOutput').then(res => {
					uni.hideLoading();
					res.flag ? (this.$api.tip(this.lang.tip.success), this.barCode = '',
						this.outputDate = '',
						lathis.ladingNumber = 0,
						this.consignor = '',
						consthis.consignorPhone = '',
						this.wmsStockId = '',
						suspithis.suspicionProblem = '',
						this.remarks = ''

					) : this.error(res.result)
				}).catch(res => {})
			},
			error(res) {
				if (res.consignor != "" && res.consignor != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.consignor),
						duration: 2000,
						background: false
					})
				}
				if (res.consignorPhone != "" && res.consignorPhone != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.consignorPhone),
						duration: 2000,
						background: false
					})
				}
				if (res.ladingNumber != "" && res.ladingNumber != undefined) {
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
				if (res.outputDate != "" && res.outputDate != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.outputDate),
						duration: 2000,
						background: false
					})
				}
				if (res.wmsStockId != "" && res.wmsStockId != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.wmsStockId),
						duration: 2000,
						background: false
					})
				}
			},
			onConfirm(e) {
				this.outputDate = e.result;
			},
			choseDate() {
				this.$refs.date.show();
			},
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
