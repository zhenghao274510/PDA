<template>
	<view class="uni-his-details all">
		<page-heade :title="lang.common.historyDetails" :showRightText="showRightText" @click="onClick"></page-heade>
		<view class="his-chose-con page-top-padding">
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.barCode}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.barCode}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
				{{lang.common.outputDate}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.outputDate}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.common.ladingNumber}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.ladingNumber}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
				{{lang.common.consignor}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.consignor}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.common.consignorPhone}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.consignorPhone}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.goodsType}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.goodsType}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
						{{lang.common.outStore}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.wmsWarehouseName}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.common.productCode}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.productCode}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.goodsName}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.goodsName}}
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
				footTxt: '',
				dataObj: {}
			}
		},
		components: {
			pageHeade
		},
		computed:{
			...mapState([
				'lang'
			])
		},
		onLoad(options) {
			this.dataObj = JSON.parse(options.id)
		},
		methods: {
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
