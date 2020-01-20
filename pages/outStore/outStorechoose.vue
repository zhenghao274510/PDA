<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.common.filter" :showRightText="showRightText" @click="onClick"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-item">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.barCode}}
					</view>
					<view class="myInput" >
						<input type="text" value="" v-model="barCode" />
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.outputDate}}
					</view>
					<view class="myInput flex-date">
						<view class="time" @click="choseDate(0)">
							{{outputDateStart}}
						</view>
						<text class="line"></text>
						<view class="time" @click="choseDate(1)">
							{{outputDateEnd}}
						</view>
					</view>
					
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.ladingNumber}}
					</view>
					<view class="myInput" hover-class="input-hover">
						<input type="text" value="" v-model="ladingNumber" maxlength="50" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.consignor}}
					</view>
					<view class="myInput" hover-class="input-hover">
						<input type="text" value="" v-model="consignor" maxlength="50" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.consignorPhone}}
					</view>
					<view class="myInput">
						<input type="number" value="" v-model="consignorPhone" maxlength="50" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsType}}
					</view>
					<good-select :list="goodType" :clearable="false"  :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="choseGoods">
					</good-select>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.outStore}}
					</view>
					<store-select :list="storeList" :clearable="false"  :listShow="false" :isCanInput="false"
					 :placeholder="'placeholder'" :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="choseHouse">
					</store-select>
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
		<page-foot :footTxt="lang.common.Query" @click="choseHistory"></page-foot>
		<w-picker mode="date" startYear="2000" :endYear="endYear" :defaultVal="endYear" :current="true" @confirm="onConfirm"
		 :disabledAfter="true" ref="date" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import storeSelect from "@/components/xfl-select/store-select.vue"
	import goodSelect from "@/components/xfl-select/goodType-select.vue"
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				goodType: getApp().globalData.goodsType,
				storeList: [],
				minHeight: '',
				showRightText: false,
				barCode: '',
				ladingNumber: "",
				consignor: "",
				consignorPhone: "",
				goods: "",
				goodsName: "",
				outputDate: "",
				endYear: new Date(),
				outputDateStart:'开始日期',
				outputDateEnd:'结束日期',
				updaterName:'',
				updateDateStart:'开始日期',
				updateDateEnd:'结束日期',
				current:0


			}
		},
		components: {
			pageHeade,
			pageFoot,
			storeSelect,
			goodSelect,
			wPicker
		},
		computed:{
			...mapState([
				'lang'
			])
		},
		onLoad() {
			this.minHeight = uni.getStorageSync('height')
			this.loadState()
			console.log(this.minHeight)
		},
		methods: {
			loadState() {
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
			choseDate(n) {
				this.current=n;
				this.$refs.date.show()
			},
			onConfirm(e) {
				let n=this.current;
				switch(n){
					case 0:
					this.outputDateStart = e.result;
					break;
					case 1:
					this.outputDateEnd=e.result;
					break;
					case 2:
					this.updateDateStart = e.result;
					break;
					case 3:
					this.updateDateEnd=e.result;
					break;
					
				}
			},
			onClick(e) {
				uni.navigateBack();
			},
			choseGoods(e){
				this.goods=e.newVal
			},
			choseHouse(e){
				this.wmsWarehouseId=e.orignItem.id
			},
			choseHistory() {
				let parmas={}
				if(this.barCode!=''){
					parmas.barCode=this.barCode
				}
				if(this.ladingNumber!=''){
					parmas.ladingNumber=this.ladingNumber
				}
				if(this.consignorPhone!=''){
					parmas.consignorPhone=this.consignorPhone
				}
				if(this.wmsWarehouseId!=''){
					parmas.wmsWarehouseId=this.wmsWarehouseId
				}
				if(this.goods!=''){
					parmas.goodsType=this.goods
				}
				if(this.goodsName!=''){
					parmas.goodsName=this.goodsName
				}
				if(this.outputDateStart!='开始日期'){
					parmas.outputDateStart=this.outputDateStart
				}
				if(this.outputDateEnd!='结束日期'){
					parmas.outputDateEnd=this.outputDateEnd
				}
				if(this.updateDateStart!='开始日期'){
					parmas.updateDateStart=this.updateDateStart
				}
				if(this.updateDateEnd!='结束日期'){
					parmas.updateDateEnd=this.updateDateEnd
				}
				if(this.updaterName!=''){
					parmas.updaterName=this.updaterName
				}
				this.$api.navTo(`/pages/outStore/historyoutStore?id=${JSON.stringify(parmas)}`)
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
		padding-left: 10px;

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
