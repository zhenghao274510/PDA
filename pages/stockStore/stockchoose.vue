<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.common.filter" :showRightText="showRightText" @click="back"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-item">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.Warehouse}}
					</view>
					<store-select :list="list" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @click="changChoose">
					</store-select>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.startDateStart}}
					</view>
					<view class="myInput flex-date">
						<view class="time" @click="choseDate(0)">
							{{startDateStart}}
						</view>
						<text class="line"></text>
						<view class="time" @click="choseDate(1)">
							{{startDateEnd}}
						</view>
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.endDateEnd}}
					</view>
					<view class="myInput flex-date">
						<view class="time" @click="choseDate(2)">
							{{endDateStart}}
						</view>
						<text class="line"></text>
						<view class="time" @click="choseDate(3)">
							{{endDateEnd}}
						</view>
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.state}}
					</view>
					<xfl-select :list="lang.common.stockState" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changeStoreState">
					</xfl-select>
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
						<view class="time" @click="choseDate(4)">
							{{updateDateStart}}
						</view>
						<text class="line"></text>
						<view class="time" @click="choseDate(5)">
							{{updateDateEnd}}
						</view>
					</view>
				</view>


			</view>

		</view>
		<w-picker mode="date" startYear="2000" :endYear="endYear" :defaultVal="endYear" :current="true" @confirm="onConfirm"
		 :disabledAfter="true" ref="date" themeColor="#f00"></w-picker>
		<page-foot :footTxt="lang.common.Query" @click="choose"></page-foot>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import storeSelect from "@/components/xfl-select/store-select.vue"
	import xflSelect from "@/components/xfl-select/xfl-select.vue"
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				list: [],
				minHeight: '',
				showRightText: false,
				id: '',
				startDateStart: '开始日期',
				startDateEnd: "结束日期",
				endDateStart: '开始日期',
				endDateEnd: '结束日期',
				wmsWarehouseId: '',
				state: '',
				updaterName: '',
				updateDateStart: '开始日期',
				updateDateEnd: '结束日期',
				current: 0,
				endYear: new Date()

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
			storeSelect,
			xflSelect,
			wPicker
		},
		onLoad() {
			// this.minHeight = uni.getStorageSync('height')
			this.loadData()
		},
		methods: {
			changeStoreState(e){
				console.log(e)
				this.state=e.orignItem.label
			},
			choseDate(n) {
				this.current = n;
				this.$refs.date.show();
			},
			onConfirm(e) {
				console.log(e)
				let n = this.current;
					switch (n) {
						case 0:
							this.startDateStart = e.result;
							break;
						case 1:
							this.startDateEnd = e.result;
							break;
						case 2:
							this.endDateStart = e.result;
							break;
						case 3:
							this.endDateEnd = e.result;
							break;
						case 4:
							this.updateDateStart = e.result;
							break;
						case 5:
							this.updateDateEnd = e.result;
							break;

					}
			},
			back() {
				uni.navigateBack();
			},
			loadData() {
				let parmas = {
					status: ''
				};
				this.$REQ.get(parmas, "billOutput/findWarehouseList").then(res => {
					console.log(res)
					res.flag ? (res.result.forEach(item => {
						item.value = item.name;
					}), this.list = res.result, console.log(this.list)) : this.$api.tip(res.errorCode)
				}).catch(err => {});
			},
			choose() {
				let parmas={}
				if (this.wmsWarehouseId != '') {
					parmas.wmsWarehouseId = this.wmsWarehouseId
				}
				if (this.state != '') {
					parmas.state = this.state
				}
				if (this.startDateStart !='开始日期') {
					parmas.startDateStart = this.startDateStart
				}
				if (this.updaterName != '') {
					parmas.updaterName = this.updaterName
				}
				if (this.startDateEnd !='结束日期') {
					parmas.startDateEnd = this.startDateEnd
				}
				if (this.endDateStart !='开始日期') {
					parmas.endDateStart = this.endDateStart
				}
				if (this.endDateEnd != '结束日期') {
					parmas.endDateEnd = this.endDateEnd
				}
				if (this.updateDateStart !='开始日期') {
					parmas.updateDateStart = this.updateDateStart
				}
				if (this.updateDateEnd !='结束日期') {
					parmas.updateDateEnd = this.updateDateEnd
				}
				console.log(parmas)
				this.$api.navTo('/pages/stockStore/historyStockStore?id=' + JSON.stringify(parmas))
			},
			changChoose(e) {
				console.log(e)
				this.wmsWarehouseId=e.id;
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

		input {
			height: 50px;
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
