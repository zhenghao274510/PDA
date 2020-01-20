<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.title.Underframe" @click="onClick"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-item">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.barCode}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="barCode" v-if="type==1" @blur="loadData" />
					</view>
					<view class="myInput" v-if="type==0">
						{{barCode}}
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.putOffDate}}
					</view>
					<view class="myInput" @click="choseDate">
						{{putOffDate}}
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.productCode}}
					</view>
					<view class="myInput" hover-class="input-hover">
						<input type="text" value="" v-model="productCode" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsName}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="goodsName" />
					</view>
				</view>
				<!-- 仓库 -->
				<!-- 仓库 -->
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.Warehouse}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="wmsWarehouseName" />
					</view>
				</view>
				<!-- 储位 -->
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.wmsWarehouseDetailName}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="wmsWarehouseDetailName" />
					</view>
				</view>

				<!-- 备注 -->
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.remarks}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="remarks" />
					</view>
				</view>
			</view>

		</view>
		<message ref="Message"></message>
		<page-foot :footTxt="lang.common.save" @click="save"></page-foot>
		<w-picker mode="date" startYear="2000" :endYear="endYear" :current="true" @confirm="onConfirm" :disabledAfter="true"
		 ref="date" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import xInput from "@/components/x-input/x-input.vue"
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				minHeight: '',
				barCode: "",
				putOffDate: "",
				wmsWarehouseId: "",
				productCode: '',
				goodsName: '',
				endYear: new Date(),
				type: 0,
				remarks: '',
				wmsWarehouseName: '',
				wmsWarehouseDetailName: ''

			}
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		components: {
			pageHeade,
			pageFoot,
			xInput,
			wPicker
		},
		onLoad(options) {
			this.type = options.type;
			this.type == 0 ? (this.barCode = options.id, this.loadData()) : this.barCode = "";
			this.minHeight = uni.getStorageSync('height')
			// this.loadData()
		},
		methods: {
			choseDate() {
				this.$refs.date.show()
			},
			onConfirm(e) {
				this.putOffDate = e.result;
			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo('/pages/soldOut/soldOutHistory')
			},
			loadData() {
				let parmas = {
					barCode: this.barCode
				};
				this.$REQ.get(JSON.stringify(parmas), "billPutOff/findInfoByBarCode").then(res => {
					console.log(res)
					res.flag ? (this.goodsName = res.result.goodsName, this.productCode = res.result.productCode, this.wmsWarehouseId =
						res.result.wmsWarehouseId, this.wmsWarehouseDetailId = res.result.wmsWarehouseDetailId, this.wmsWarehouseName =
						res.result.wmsWarehouseName, this.wmsWarehouseDetailName = res.result
						.wmsWarehouseDetailName) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			error(res) {
				if (res.barCode != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.barCode),
						duration: 2000,
						background: false
					})
				}


				if (res.putOffDate != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.putOffDate),
						duration: 2000,
						background: false
					})
				}
				if (res.wmsWarehouseDetailId != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.wmsWarehouseDetailId),
						duration: 2000,
						background: false
					})
				}
				if (res.wmsWarehouseId != undefined) {
					this.$refs.Message.error({
						content: this.$api.getError(res.wmsWarehouseId),
						duration: 2000,
						background: false
					})
				}
			},
			save() {
				let parmas = {
					barCode: this.barCode,
					putOffDate: this.putOffDate,
					wmsWarehouseDetailId: this.wmsWarehouseDetailId,
					wmsWarehouseId: this.wmsWarehouseId,
					remarks: this.remarks
				};
				console.log(parmas)
				uni.showLoading({})
				this.$REQ.post(parmas, "billPutOff/addBillPutOff").then(res => {
					uni.hideLoading()
					res.flag ? (this.$api.tip(this.lang.tip.success), this.barCode = '',
						this.putOffDate = '',
						this.wmsWarehouseDetailId = '',
						this.wmsWarehouseId = '',
						this.remarks = '') : (this.error(res.result))
				}).catch(err => {})
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
