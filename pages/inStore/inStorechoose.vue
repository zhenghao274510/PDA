<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.common.filter" :showRightText="showRightText" @click="onClick"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-item">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.barCode}}
					</view>
					<view class="myInput">
						<input type="number" value="" v-model="barCode" />
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.inputDate}}
					</view>
					<view class="myInput flex-date">
						<view class="time" @click="choseDate(0)">
							{{inputDateStart}}
						</view>
						<text class="line"></text>
						<view class="time" @click="choseDate(1)">
							{{inputDateEnd}}
						</view>
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.Storagewarehouse}}
					</view>
					<store-select :list="storeList" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="choseHouse">
					</store-select>
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
					<x-input :value="weight" @click="changeNumber" :type="0"></x-input>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsType}}
					</view>
					<good-type-select :list="goodType" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="choseGoods">
					</good-type-select>
				</view>

				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsName}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="goodsName" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.workName}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="updaterName" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.workTime}}
					</view>
					<view class="myInput flex-date">
						<view class="time" @click="choseDate(2)">
							{{updateDateStart}}
						</view>
						<text class="line"></text>
						<view class="time" @click="choseDate(3)">
							{{updateDateEnd}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<page-foot :footTxt="lang.common.Query" @click="chooseInfo"></page-foot>
		<w-picker mode="date" startYear="2000" :endYear="endYear" :current="true" @confirm="onConfirm" ref="date" themeColor="#f00">
		</w-picker>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import xflSelect from "@/components/xfl-select/xfl-select.vue"
	import storeSelect from "@/components/xfl-select/store-select.vue"
	import goodTypeSelect from "@/components/xfl-select/goodType-select.vue"
	import xInput from "@/components/x-input/x-input.vue"
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				goodType: getApp().globalData.goodsType,
				minHeight: '',
				showRightText: false,
				weight: 0,
				barCode: '',
				goodsName: '',
				palletNumber: '',
				borcode: '',
				inputDate: '',
				storeList: [],
				endYear: new Date(),
				wmsWarehouseId: '',
				goods: "",
				inputDateStart: "开始日期",
				inputDateEnd: "结束日期",
				updaterName: "",
				updateDateStart: "开始日期",
				updateDateEnd: "结束日期",
				current:0

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
			xflSelect,
			xInput,
			wPicker,
			storeSelect,
			goodTypeSelect
		},
		onLoad() {
			// this.barCode ="1577928797890"
			this.minHeight = uni.getStorageSync('height')
			console.log(this.minHeight)
			this.loadData()
		},
		methods: {
			choseHouse(e) {
				this.wmsWarehouseId = e.orignItem.id
			},
			choseGoods(e) {
				console.log(e)
				this.goods = e.orignItem.label;
			},
			changeNumber(e) {
				this.weight = e;
			},
			loadData() {
				let parmas = {
					state: ''
				};
				this.$REQ.get(parmas, "billStockCheck/findWarehouseList").then(res => {
					console.log(res)
					res.flag ? res.result.forEach(item => {
						item.value = item.name;
						this.storeList.push(item)
					}) : this.$api.tip(res.errorCode)
				}).catch(err => {})
			},
			onClick(e) {
				uni.navigateBack();
			},
			onConfirm(e) {
				let n=this.current;
				switch(n){
					case 0:
					this.inputDateStart = e.result;
					break;
					case 1:
					this.inputDateEnd=e.result;
					break;
					case 2:
					this.updateDateStart = e.result;
					break;
					case 3:
					this.updateDateEnd=e.result;
					break;
					
				}
			},
			choseDate(n) {
				this.current=n
				this.$refs.date.show()
			},
			chooseInfo() {
				let parmas = {}
				if (this.barCode != '') {
					parmas.barCode = this.barCode
				}
				if (this.inputDate != '') {
					parmas.inputDate = this.inputDate
				}
				if (this.goodsName != '') {
					parmas.goodsName = this.goodsName
				}
				if (this.weight != 0) {
					parmas.weight = this.weight
				}
				if (this.palletNumber != '') {
					parmas.palletNumber = this.palletNumber
				}
				if (this.wmsWarehouseId != '') {
					parmas.wmsWarehouseId = this.wmsWarehouseId
				}
				if (this.goods != '') {
					parmas.goodsType = this.goods
				}

				if (this.updateDateEnd != "结束日期") {
					parmas.updateDateEnd = this.updateDateEnd
				}
				if (this.updateDateStart != "开始日期") {
					parmas.updateDateStart = this.updateDateStart
				}
				if (this.inputDateEnd != "结束日期") {
					parmas.inputDateEnd = this.inputDateEnd
				}
				if (this.inputDateStart != "开始日期") {
					parmas.inputDateStart = this.inputDateStart
				}
				if (this.updaterName != '') {
					parmas.updaterName = this.updaterName
				}
				console.log(parmas)

				this.$api.navTo(`/pages/inStore/historyInStore?id=${JSON.stringify(parmas)}`)
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
		padding: 10px 0;
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
