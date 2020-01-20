<template>
	<view>
		<page-heade :title="lang.title.inventoryDetails" @click="onClick" :showRightText="showRightText"></page-heade>
		<view class="uni-his-swiper page-top-padding">
			<view class="uni-his-item" v-for="(v,k) in dataList">
				<view class="uni-his-left">
					<view class="uni-his-left-list uni-bor-bottom">
						<view class="uni-his-left-list-one">
							{{lang.bass.barCode}}
						</view>
						<view class="uni-his-left-list-two ">
							{{v.barCode}}
						</view>
					</view>
					<view class="uni-his-left-list uni-bor-bottom">
						<view class="uni-his-left-list-one">
							{{lang.bass.Warehouse}}
						</view>
						<view class="uni-his-left-list-two">
							{{WarehouseName}}
						</view>
					</view>
					<view class="uni-his-left-list">
						<view class="uni-his-left-list-one">
							{{lang.common.wmsWarehouseDetailName}}
						</view>
						<view class="uni-his-left-list-two" v-for="(item,index) in chuweiList" :key="index">
							<text v-if="v.wmsWarehouseDetailId==item.id">{{item.code}}</text>
						</view>
					</view>
				</view>
				<!-- 删除按钮 -->
				<!-- <view class="uni-his-right uni-bor-left" @click="showDel=true" v-if="state">
					<view class="iconfont icon-del">

					</view>
				</view> -->
			</view>
		</view>
		<message ref="Message"></message>
		<!-- <view class="page-share-title page-foot" v-if="state==1">
			<view class="page-change page-bottom-item" hover-class="hover" @click="changeInfo(0)">
				{{lang.common.saveDrafts}}
			</view>
			<view class="page-del page-bottom-item uni-bor-left" hover-class="hover" @click="changeInfo(1)">
				{{lang.common.Completeinventory}}
			</view>
		</view> -->

		<!-- <poup-hide v-if="showDel" @click="isDel"></poup-hide> -->
	</view>

</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import poupHide from "@/components/poup-hide.vue"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				showRightText: false,
				righTxt: '',
				showDel: false,
				barCode: "",
				wmsWarehouseId: '',
				wmsWarehouseDetailId: '',
				choseGoodType: '',
				state: 0,
				id: '',
				version: '',
				dataList: [],
				chuweiList: [],
				wmsWarehouseId: '',
				WarehouseName: ''
			}
		},
		components: {
			pageHeade,
			pageFoot,
			poupHide
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		onLoad(options) {
			this.id = options.id //  盘点单id
			this.wmsWarehouseId = options.wmsWarehouseId
			this.loadData()
			this.getCuwei()
		},
		methods: {
			loadData() {
				let parmas = {
					wmsBillStockCheckId: this.id
				};
				this.$REQ.get(parmas, 'billStockCheck/findBillStockCheckDetailList').then(res => {
					console.log(res)
					res.flag ? (res.result.forEach(item => {
						this.dataList.push(item)
					})) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				})
			},
			onClick(e) {
				// this.$api.tip('点击返回')
				e == 0 ? uni.navigateBack() : this.$api.navTo(`/pages/stockStore/newStock?id=${this.wmsWarehouseId}`);
			},
			changeInfo(n) {
				n == 0 ? this.save() : this.finished()
			},
			//删除
			delItem() {
				let parmas = {
					Id: this.id,
					version: this.version
				};
				this.$REQ.post(parmas, "billStockCheck/deleteBillStockCheck").then(res => {
					res.flag ? this.$api.tip(this.lang.tip.success) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			getCuwei() {
				let parmas = {
					wmsWarehouseId: this.wmsWarehouseId,
					state: '1'
				}
				this.$REQ.get(parmas, 'warehouseDetail/findWarehouseDetailList').then(res => {
					this.chuweiList = res.result;
					this.WarehouseName = res.result[0].wmsWarehouseModel.name
					console.log(res)
				}).catch(err => {})
			}
		}

	}
</script>

<style lang="scss">
	@charset "UTF-8";

	.uni-his-swiper {
		width: 90%;
		margin: 0 auto;
	}

	.uni-his-item {
		background: $uni-bg-color;
		border-radius: $uni-border-radius-lg;
		box-shadow: 0 0 4px 4px rgb(238, 237, 237);
		display: flex;
		margin-bottom: 25px;
		transition: all 1s;
	}

	.uni-his-left {
		flex: 1;
		padding: 0 25px;
	}

	.uni-his-right {
		padding: 0 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.uni-his-right-top {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
