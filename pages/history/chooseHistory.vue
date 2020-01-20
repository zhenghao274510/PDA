<template>
	<view class="all" :style="{height:minHeight}">
		<page-heade :title="lang.common.filter" @click="onClick" :showRightText="showRightText"></page-heade>
		<view class="uni-add-swiper page-top-padding">
			<view class="uni-add-item">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						AWB
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="awb"  />
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.flightName}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="flightName" />
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
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.wmsWarehouse}}
					</view>
					<house-select :list="categoryList" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changeHouse">
					</house-select>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.goodsType}}
					</view>
					<good-type-select :list="goodsType" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @change="changeGoods">
					</good-type-select>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.departure}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="departureStation" />
					</view>
					<!-- <xfl-select :list="list" :clearable="false"  :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'">
					</xfl-select> -->
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						
						{{lang.common.destinationStation}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="destinationStation" />
					</view>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.registerNumber}}
					</view>
					<x-input :value.sync="number" @click="chengNumber" :type="1"></x-input>
				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.productCode}}
					</view>
					<view class="myInput">
						<input type="text" v-model="productCode" />
					</view>
				</view>
			</view>
		</view>
		<page-foot :footTxt="lang.common.Query" @click="getInfo"></page-foot>
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
	import shopSelect from '@/components/xfl-select/shop-select.vue'
	import test from "@/components/xfl-select/test.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				goodsType: getApp().globalData.goodsType,
				flightName: '', //  航单
				goodsName: '', //  货品名称
				categoryList: [], //分拣登记点
				minHeight: '',
				showRightText: false,
				awb: '',
				number: 0, //  登记件数
				productCode: '', //  商品代号
				destinationStation: '', //  目的地站
				departureStation: '' ,//  始发站
				house:'',
				goodsType:getApp().globalData.goodsType,
				goods:'',
				wmsWarehouseId:''
			}
		},
		components: {
			pageHeade,
			pageFoot,
			xflSelect,
			xInput,
			shopSelect,
			houseSelect,
			goodTypeSelect,
			goodNameSelect,
			flightSelect,
			test

		},
		computed: {
			...mapState([
				'lang'
			])
		},
		onLoad() {
			// this.awb = "AWB_004"
			this.minHeight = uni.getStorageSync('height')
			// this.searchAwb()
			console.log(this.minHeight)
			this.loadData()
		},
		methods: {
			changeGoods(e){
				this.goods=e.newVal;
				console.log(e)
			},
			changeHouse(e){
				console.log(e)
				this.wmsWarehouseId=e.orignItem.id

			},
			chengNumber(e) {
				console.log(e)
				this.number = e;
			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo('/pages/history/history')
			},
			loadData() {
				let parmas = {
					status: ''
				};
				this.$REQ.get(parmas, "sortingRegister/findWarehouseList").then(res => {
					console.log(res.data)
					res.flag ? (res.result.forEach(item => {
						item.value = item.name
					}), this.categoryList = res.result) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			getInfo() {
				let parmas={};
				if(this.awb!=''){
					parmas.awb=this.awb
				}
				if(this.flightName!=''){
					parmas.flightName=this.flightName
				}
				if(this.goodsName!=''){
					parmas.goodsName=this.goodsName
				}
				if(this.number!=0){
					parmas.registerNumber=this.number
				}
				if(this.departureStation!=''){
					parmas.departureStation=this.departureStation
				}
				if(this.destinationStation!=''){
					parmas.destinationStation=this.destinationStation
				}
				if(this.wmsWarehouseId!=''){
					parmas.wmsWarehouseId=this.wmsWarehouseId
				}
				if(this.goods!=''){
					parmas.goodsType=this.goodsType
				}
				if(this.productCode!=''){
					parmas.productCode=this.productCode
				}
					this.$api.navTo(`/pages/history/history?id=${JSON.stringify(parmas)}`)
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
