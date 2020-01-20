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
				{{lang.common.putOnDate}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.putOnDate}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
				{{lang.bass.Warehouse}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.wmsWarehouseIdName}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.weight}}(kg)
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.weight}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.palletNumber}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.palletNumber}}
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
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.length}}(mm)
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.length}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.width}}(mm)
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.width}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.bass.height}}(mm)
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.height}}
				</view>
			</view>
			<view class="his-chose-con-list">
				<view class="uni-his-left-list-one">
					{{lang.common.wmsWarehouseDetailName}}
				</view>
				<view class="uni-his-left-list-two">
					{{dataObj.wmsWarehouseDetailIdName}}
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
				dataObj: {}
			}
		},
		components: {
			pageHeade
		},
		onLoad(options) {
			this.dataObj = JSON.parse(options.id);
		},
		computed:{
			...mapState([
				'lang'
			])
		},
		methods: {
			changeInfo(type) {},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo('/pages/history/history')
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
