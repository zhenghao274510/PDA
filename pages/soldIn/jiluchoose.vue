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
						<input type="text" value="" v-model="barCode" />
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.putOnDate}}
					</view>
					<view class="myInput flex-date">
						<view class="time" @click="choseDate(0)">
							{{putOnDateStart}}
						</view>
						<text class="line"></text>
						<view class="time" @click="choseDate(1)">
							{{putOnDateEnd}}
						</view>
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
						{{lang.bass.palletNumber}}
					</view>
					<view class="myInput" hover-class="input-hover">
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
						{{lang.bass.Warehouse}}
					</view>
					<xfl-select :list="storeList" :clearable="false" :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="choseHouse">
					</xfl-select>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.wmsWarehouseDetailName}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="wmsWarehouseDetailIdName" />
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
		<page-foot :footTxt="lang.common.Query" @click="findItem"></page-foot>
		<w-picker mode="date" startYear="2000" :endYear="endYear" :defaultVal="endYear" :current="true" @confirm="onConfirm"
		 :disabledAfter="true" ref="date" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import xflSelect from "@/components/xfl-select/xfl-select.vue"
	import xInput from "@/components/x-input/x-input.vue"
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				showRightText: false,
				storeList: [],
				minHeight: '',
				value: 0,
				page: 1,
				size: "5",
				barCode: "",
				putOnDate: "",
				weight: 0,
				palletNumber: "",
				productCode: "",
				wmsWarehouseDetailIdName: "",
				wmsWarehouseId:'',
				updaterName: "",
				updateDateStart:'开始日期',
				updateDateEnd:"结束日期",
				putOnDateStart:"开始日期",
				putOnDateEnd:"结束日期",
				endYear: new Date(),
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
			wPicker
		},
		onLoad() {
			this.minHeight = uni.getStorageSync('height')
			this.loadData();
			console.log(this.minHeight)
		},
		methods: {
			choseDate(n) {
				this.current=n;
				this.$refs.date.show()
			},
			onConfirm(e) {
				console.log(e)
				let n=this.current;
				console.log(n)
				switch(n){
					case 0:
					this.putOnDateStart = e.result;
					break;
					case 1:
					this.putOnDateEnd=e.result;
					break;
					case 2:
					this.updateDateStart = e.result;
					break;
					case 3:
					this.updateDateEnd=e.result;
					break;
					
				}
			},
			changeNumber(e) {
				this.weight = e;
			},
			onClick(e) {
				if (e == 0) {
					uni.navigateBack()
				}
			},
			// 储位
			loadData() {
				let parmas = {
					state: ''
				};
				this.$REQ.get(parmas, "billPutOn/findWarehouseList").then(res => {
					console.log(res)
					res.result.forEach(item => {
						item.value = item.name;
						this.storeList.push(item)
					})
				}).catch(err => {})
			},
			choseHouse(e) {
				console.log(e)
				this.wmsWarehouseId = e.orignItem.id
			},
			findItem() {
				let parmas = {}
				if (this.barCode != '') {
					parmas.barCode = this.barCode
				}
				if (this.weight != '') {
					parmas.weight = this.weight
				}
				if (this.palletNumber != '') {
					parmas.palletNumber = this.palletNumber
				}
				if (this.productCode != '') {
					parmas.productCode = this.productCode
				}
				// wmsWarehouseId
				// wmsWarehouseDetailIdName
				if (this.wmsWarehouseId != '') {
					parmas.wmsWarehouseId = this.wmsWarehouseId
				}
				if (this.wmsWarehouseDetailIdName != '') {
					parmas.wmsWarehouseDetailIdName = this.wmsWarehouseDetailIdName
				}
				if (this.updateDateStart != '开始日期') {
					parmas.updateDateStart = this.updateDateStart
				}
				if (this.updaterName != '') {
					parmas.updaterName = this.updaterName
				}
				if (this.updateDateEnd != '结束日期') {
					parmas.updateDateEnd = this.updateDateEnd
				}
				if (this.putOnDateStart != '开始日期') {
					parmas.putOnDateStart = this.putOnDateStart
				}
				if (this.putOnDateEnd != '结束日期') {
					parmas.putOnDateEnd = this.putOnDateEnd
				}
				console.log(parmas)
				this.$api.navTo(`/pages/soldIn/soldInHistory?id=${JSON.stringify(parmas)}`)
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

	.flex-date {
		display: flex;
		align-items: center;
		justify-content: center;
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
