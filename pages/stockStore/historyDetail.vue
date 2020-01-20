<template>
	<view class="uni-his-details all">
		<page-heade :title="lang.common.historyDetails" :showRightText="showRightText" @click="onClick"></page-heade>
		<view class="his-chose-con page-top-padding">
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.Warehouse}}
				</view>
				<view class="uni-his-left-list-two" v-for="(v,k) in storeList" :key="k">
				<text v-if="dataObj.wmsWarehouseId==v.id">{{v.name}}</text>	
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.startDateStart}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.startDate}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.endDateEnd}}
				</view>
				<view class="uni-his-left-list-two" v-if="dataObj.endDate!=undefined">
					{{dataObj.endDate}}
				</view>
				<view class="uni-his-left-list-two" v-else>
					-
				</view>

			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.common.state}}
				</view>

				<view class="uni-his-left-list-two" v-if="dataObj.state==1">
					{{lang.bass.Ininventory}}
				</view>
				<view class="uni-his-left-list-two" v-if="dataObj.state==2">
					{{lang.bass.Endinventory}}
				</view>
				<view class="uni-his-left-list-two" v-if="dataObj.state==3">
					{{lang.bass.invalid}}

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				showRightText: false,
				dataObj: {},
				storeList:[]
			}
		},
		components: {
			pageHeade,

		},
		computed:{
			...mapState([
				'lang'
			])
		},
		onLoad(options) {
			this.getStore()
			this.dataObj = JSON.parse(options.id)
		},
		methods: {
			getStore(){
				let parmas = {
					state: ''
				};
				this.$REQ.get(parmas, "billStockCheck/findWarehouseList").then(res => {
					console.log(res)
					res.flag ?(this.storeList= res.result) : this.$api.tip(res.errorCode)
				}).catch(err => {})
			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack(1) : this.$api.navTo('/pages/history/history')
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.his-chose-con {
		width: 90%;
		margin: 0 auto;
	}

	.his-chose-con-list {
		border-bottom: 2px solid #ebebeb;
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

	.page-foot {
		display: flex;
		align-items: center;
	}

	.page-bottom-item {
		flex: 1;
		height: 88upx;
		text-align: center;
		line-height: 88upx;
		color: #808080;
	}
</style>
