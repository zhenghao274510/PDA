<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.common.filter" :showRightText="showRightText" @click="back"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-item">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
							{{lang.bass.barCode}}
					</view>
					<view class="myInput">
						<input type="number" v-model="barCode" />
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						AWB
					</view>
					<view class="myInput">
						<input type="number" v-model="awb" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsType}}
					</view>
					<xfl-select :list="goodType" :clearable="false"  :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changeGoodDate">
					</xfl-select >
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsName}}
					</view>
					<view class="myInput" hover-class="input-hover">
						<input type="text" value="" v-model="goodsName" />
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
					<store-select :list="storeList" :clearable="false"  :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changeStoreDate">
					</store-select>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.wmsWarehouseDetailName}}
					</view>
					<view class="myInput">
						<input type="number" value="" v-model="wmsWarehouseDetailName" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
					{{lang.common.state}}
					</view>
					<xfl-select :list="lang.bass.storeState" :clearable="false"  :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changeStoreState">
					</xfl-select>
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
				
				<!-- 出库时间 -->
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.outputDate}}
					</view>
					<view class="myInput flex-date">
						<view class="time" @click="choseDate(2)">
							{{outputDateStart}}
						</view>
						<text class="line"></text>
						<view class="time" @click="choseDate(3)">
							{{outputDateStart}}
						</view>
					</view>
				</view>
				<!-- inStockDayStart: '在库天数（最小天数）',
				inStockDayEnd: '在库天数（最大天数）',
				updaterId: '最后操作员姓名',
				updateDate: '最后操作时间' -->
				<!-- 在库天数 -->
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.inStockDayStart}}
					</view>
					<x-input :value="inStockDayStart" @click="changeNumberStart" :type="1"></x-input>
				</view>
				
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.inStockDayEnd}}
					</view>
					<x-input :value="inStockDayEnd" @click="changeNumberEnd" :type="1"></x-input>
				</view>
				
				<!-- 操作员 -->
				
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.updaterId}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="updaterName" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.updateDate}}
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
		<message ref="Message"></message>
		<page-foot :footTxt="lang.common.Query" @click="chose"></page-foot>
		<w-picker mode="date" startYear="2000" :endYear="endYear" :current="true" @confirm="onConfirm" ref="date"
		 themeColor="#f00">
		</w-picker>

	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import xflSelect from "@/components/xfl-select/xfl-select.vue"
	import storeSelect from "@/components/xfl-select/store-select.vue"
	import wPicker from "@/components/w-picker/w-picker.vue"
	import xInput from "@/components/x-input/x-input.vue"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				list: [],
				storeState: getApp().globalData.storeState,
				goodType: getApp().globalData.goodsType,
				minHeight: '',
				showRightText: false,
				inputDateStart: '开始日期',
				inputDateEnd: "结束日期",
				outputDateStart:'开始日期',
				outputDateEnd:'结束日期',
				updaterName:'',
				updateDateStart:'开始日期',
				updateDateEnd:'结束日期',
				inStockDayStart:0,
				inStockDayEnd:0,
				storeList: [],
				endYear: new Date(),
				barCode: '',
				awb: '',
				productCode: "",
				goods: '',
				goodsName:'',
				wmsWarehouseDetailName: '',
				choseStoreState: '',
				wmsWarehouseId:'',
				current:0
				


			}
		},
		components: {
			pageHeade,
			pageFoot,
			xflSelect,
			wPicker,
			storeSelect,
			xInput
		},
		computed:{
			...mapState([
				'lang'
			])
		},
		onLoad() {
			this.starDate=this.lang.bass.startDate;
			this.endDate=this.lang.bass.endDate;
			this.minHeight = uni.getStorageSync('height')
			this.loadData()
			console.log(this.minHeight)
		},
		methods: {
			back(){
				uni.navigateBack();
			},
			changeNumberStart(e){
				this.inStockDayStart=e
			},
			changeNumberEnd(e){
				this.inStockDayEnd=e
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
					}) : this.$refs.Message.error({
					content: this.$api.getError(res.errorCode),
					duration: 2000,
					background: false
				})
				}).catch(err => {})
			},
			// inputDateStart
			// inputDateEnd
			// outputDateStart
			// outputDateEnd
			// inStockDayStart
			// inStockDayEnd
			// updaterName
			// updateDateStart
			// updateDateEnd
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
					this.outputDateStart = e.result;
					break;
					case 3:
					this.outputDateEnd=e.result;
					break;
					case 4:
					this.updateDateStart = e.result;
					break;
					case 5:
					this.updateDateEnd=e.result;
					break;
					
				}
				console.log(e)
			},
			choseDate(n) {
				this.current=n;
				this.$refs.date.show()
			},
			changeGoodDate(e) {
				this.goods=e.orignItem.label;
				console.log(e)
			},
			changeStoreDate(e) {
				this.wmsWarehouseId=e.orignItem.id;
				console.log(e)
			},
			changeStoreState(e) {
				this.choseStoreState=e.orignItem.label;
				console.log(e)
			},
			//查询
			chose() {
				let parmas={}
				
				if(this.barCode!=''){
					parmas.barCode=this.barCode
				}
				if(this.awb!=''){
					parmas.awb=this.awb
				}
				if(this.goodsName!=''){
					parmas.goodsName=this.goodsName
				}
				if(this.wmsWarehouseId!=''){
					parmas.wmsWarehouseId=this.wmsWarehouseId
				}
				if(this.goods!=''){
					parmas.goodsType=this.goods
				}
				if(this.wmsWarehouseDetailName!=''){
					parmas.wmsWarehouseDetailName=this.wmsWarehouseDetailName
				}
			
				if(this.inputDateStart!='开始日期'){
					parmas.inputDateStart=this.inputDateStart
				}
				if(this.inputDateEnd!='结束日期'){
					parmas.inputDateEnd=this.inputDateEnd
				}
				if(this.updaterName!=''){
					parmas.updaterName=this.updaterName
				}
				if(this.outputDateStart!='开始日期'){
					parmas.outputDateStart=this.outputDateStart
				}
				if(this.outputDateEnd!='结束日期'){
					parmas.outputDateEnd=this.outputDateEnd
				}
				if(this.stockState!=''){
					parmas.stockState=this.choseStoreState
				}
				if(this.updateDateStart!='开始日期'){
					parmas.updateDateStart=this.updateDateStart
				}
				if(this.updateDateEnd!='结束日期'){
					parmas.updateDateEnd=this.updateDateEnd
				}
				if(this.inStockDayStart!=''){
					parmas.inStockDayStart=this.inStockDayStart
				}
				if(this.inStockDayEnd!=''){
					parmas.inStockDayEnd=this.inStockDayEnd
				}
				console.log(parmas)
				this.$api.navTo(`/pages/InventoryQuery/queryInventory?id=${JSON.stringify(parmas)}`)
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

	.flex-date {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.time {
		flex: 1;
		text-align: center;
	}

	.line {
		width: 30px;
		height: 1px;
		background: #000000;
	}
</style>
