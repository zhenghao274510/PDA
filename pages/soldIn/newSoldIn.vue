<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.title.Newstores" @click="onClick"></page-heade>
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
						{{lang.common.putOnDate}}
					</view>
					<view class="myInput" @click="choseDate">
						{{putOnDate}}
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.weight}}(kg)
					</view>
					<x-input :value="weight" @click="changeWeigth"></x-input>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.palletNumber}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="palletNumber" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.productCode}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="productCode" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsName}}
					</view>
					<view class="myInput">
						<input type="text" :value="goodsName" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.length}}(mm)
					</view>
					<x-input :value="length" @click="changeLen" :type="1"></x-input>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.width}}(mm)
					</view>
					<x-input :value="width" @click="changeWidth" :type="1"></x-input>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.height}}(mm)
					</view>
					<x-input :value="height" @click="changeHeight" :type="1"></x-input>
				</view>
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
					<store-select :list="storeList" :disabled="disabled" :clearable="false" :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @click="changeStore">
					</store-select>
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
		<page-foot :footTxt="lang.common.save" @click="getwarehouseDetail(1)"></page-foot>
		<w-picker mode="date" startYear="2000" :current="true" @confirm="onConfirm" ref="date" themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
	import storeSelect from "@/components/xfl-select/store-select.vue"
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
				barCode: '',
				putOnDate: '',
				weight: 0,
				length: 0,
				width: 0,
				height: 0,
				wmsWarehouseName: '',
				wmsWarehouseDetailId: '',
				initValue: '',
				wmsWarehouseId: '',
				wmsStockId: '',
				goodsName: '',
				palletNumber: '',
				productCode: '',
				type: 1,
				tip: "",
				storeList: [],
				remarks: '',
				disabled: true
			}
		},
		components: {
			pageHeade,
			pageFoot,
			xInput,
			wPicker,
			storeSelect
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		onLoad(options) {
			this.type = options.type;
			this.type == 0 ? (this.barCode = options.id, this.loadData()) : this.barCode = ""
			this.minHeight = uni.getStorageSync('height')
			// this.barCode = "1577928797888";
			// this.loadData();
			// this.initValue = this.lang.common.initValue;
			console.log(this.minHeight)

		},
		methods: {
			changeStore(e) {
				console.log(e)
				this.wmsWarehouseDetailId = e.id;
			},
			//  修改长宽高
			changeLen(e) {
				this.length = e;
			},
			changeWidth(e) {
				this.width = e;
			},
			changeHeight(e) {
				this.height = e;
				if (this.length != 0 || this.width != 0) {
					this.getwarehouseDetail(1);
					this.disabled = false
				}
			},
			changeWeigth(e) {
				this.weight = e;

			},
			loadData() {
				if (this.barCode != "") {
					let parmas = {
						barCode: this.barCode
					};
					console.log(parmas)
					this.$REQ.get(parmas, "billPutOn/findInfoByBarCode").then(res => {
						console.log(res)
						res.flag ? (this.goodsName = res.result.goodsName, this.palletNumber = res.result.palletNumber, this.productCode =
							res
							.result.productCode, this.wmsWarehouseId = res.result.wmsWarehouseId, this.wmsStockId = res.result.wmsStockId,
							this.wmsWarehouseName = res.result.wmsWarehouseName
						) : this.$refs.Message.error({
							content: this.$api.getError(res.errorCode),
							duration: 2000,
							background: false
						})
					}).catch(err => {})
				}

			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo('/pages/soldIn/soldInHistory')
			},
			getwarehouseDetail(n) {
				let parmas = {
					length: this.length,
					width: this.width,
					height: this.height,
					wmsWarehouseId: this.wmsWarehouseId
				};
				console.log(parmas)
				this.$REQ.get(parmas, "warehouseDetail/findTopByPriority").then(res => {
					console.log(res)

					if (res.flag) {
						if (res.result.length ==1) {
							// this.$set(this.initValue,0, res.result[0].code);
							// this.$set(this.wmsWarehouseDetailId,res.result[0].wmsWarehouseId)
							this.initValue = res.result[0].code;
							this.wmsWarehouseDetailId = res.result[0].wmsWarehouseId
						// this.$forceUpdate()
						} else {
							res.result.forEach(item => {
								item.value = item.code;
								this.storeList.push(item)

							});
						}
					} else {
						this.$refs.Message.error({
							content: this.$api.getError(res.wmsManifestId),
							duration: 2000,
							background: false
						})
					}
				}).catch(err => {})
			},
			save() {
				if (this.barCode != '' && this.wmsStockId != '') {
					let parmas = {
						barCode: this.barCode,
						putOnDate: this.putOnDate,
						weight: this.weight,
						length: this.length,
						width: this.width,
						height: this.height,
						wmsWarehouseDetailId: this.wmsWarehouseDetailId,
						wmsStockId: this.wmsStockId,
						remarks: this.remarks
					};
					console.log(parmas)
					uni.showLoading({})
					this.$REQ.post(parmas, "billPutOn/addBillPutOn").then(res => {
						uni.hideLoading()
						res.flag ? (this.barCode = '',
							this.putOnDate = '',
							this.weight = 0,
							this.length = 0,
							this.width = 0,
							this.height = 0,
							this.wmsWarehouseDetailId = '',
							this.wmsStockId = '',
							this.remarks = '', this.$api.tip(his.lang.tip.success)) : this.$refs.Message.error({
							content: this.$api.getError(res.errorCode),
							duration: 2000,
							background: false
						})
					}).catch(err => {})
				} else {
					this.$refs.Message.error({
						content: this.$api.getError(res.wmsManifestId),
						duration: 2000,
						background: false
					});
				}

			},
			choseDate() {
				this.$refs.date.show()
			},
			onConfirm(e) {
				this.putOnDate = e.result
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
