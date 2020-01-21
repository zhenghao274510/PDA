<template>
	<view>
		<page-heade :title="lang.common.history" :rightTxt="lang.common.screening" @click="onClick"></page-heade>
		<view class="uni-his-swiper page-top-padding">
			<block v-for="(v,k) in dataList" :key="k">
				<view class="uni-his-item" v-if="v.state!=1">
					<view class="uni-his-left ">
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.bass.Warehouse}}
							</view>
							<view class="uni-his-left-list-two " v-for="(item,index) in storeList" :key="index">
								 <text v-if="v.wmsWarehouseId==item.id">{{item.name}}</text>
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.bass.startDateStart}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.startDate}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.bass.endDateEnd}}
							</view>
							<view class="uni-his-left-list-two" v-if="v.endDate!=undefined">
								{{v.endDate}}
							</view>
							<view class="uni-his-left-list-two" v-else>
								-
							</view>
						</view>
						<view class="uni-his-left-list">
							<view class="uni-his-left-list-one">
								{{lang.bass.state}}
							</view>
							<view class="uni-his-left-list-two" v-if="v.state==1">
								{{lang.bass.Ininventory}}
							</view>
							<view class="uni-his-left-list-two" v-if="v.state==2">
								{{lang.bass.Endinventory}}
							</view>
							<view class="uni-his-left-list-two" v-if="v.state==3">
								{{lang.bass.invalid}}
							</view>
						</view>
					</view>
					<view class="uni-his-right uni-bor-left">
						<view class="uni-his-right-top" @tap="gotoDetails(v)">
							<view class="iconfont icon-zhedie">
							</view>
						</view>
						<view class="uni-his-right-top uni-bor-top">

							<view class="iconfont icon-haofangtuo400iconfontshaixuanzhedie" style="font-size: 28px;color: #CCCCCC;">
							</view>

						</view>
					</view>
				</view>
			</block>
		</view>
		<message ref="Message"></message>
		<uni-load-more :status="status" :contentText="lang.com"></uni-load-more>
	</view>
</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				dataList: [],
				page: 1,
				size: '10',
				totalPage: '',
				wmsWarehouseId: '',
				status: 'loading',
				dataObj:{},
				search:false,
				storeList:[]
			}
		},
		components: {
			pageHeade,
			uniLoadMore
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		onLoad(options) {
			options.id != undefined ?(this.dataObj=JSON.parse(options.id),this.search=true): this.wmsWarehouseId = "";
			console.log(this.wmsWarehouseId)
			this.loadData()
			this.getStore()
		},
		onPullDownRefresh() {
			this.status = "loading";
			uni.startPullDownRefresh({
				success() {
					this.loadData()
				}
			});
			setTimeout(() => {
				this.status = "more";
			}, 1000)
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMOre"
			}, 500)
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
			gotoDetails(e) {
				this.$api.navTo('/pages/stockStore/historyDetail?id=' + JSON.stringify(e))
			},
			onClick(e) {
				// this.$api.tip('点击返回')
				e == 0 ? uni.navigateBack() : this.$api.navTo("/pages/stockStore/stockchoose")
			},
			loadData() {
				let parmas = {}
				if (this.search) {
					if (this.dataObj.wmsWarehouseId != undefined) {
						parmas.wmsWarehouseId = this.dataObj.wmsWarehouseId
					}
					if (this.dataObj.state != undefined) {
						parmas.state = this.dataObj.state
					}
					if (this.dataObj.startDateStart != undefined) {
						parmas.startDateStart = this.dataObj.startDateStart
					}
					if (this.dataObj.updaterName != undefined) {
						parmas.updaterName = this.dataObj.updaterName
					}
					if (this.dataObj.startDateEnd != undefined) {
						parmas.startDateEnd = this.dataObj.startDateEnd
					}
					if (this.dataObj.endDateStart != undefined) {
						parmas.endDateStart = this.dataObj.endDateStart
					}
					if (this.dataObj.endDateEnd != undefined) {
						parmas.endDateEnd = this.dataObj.endDateEnd
					}
					if (this.dataObj.updateDateStart != undefined) {
						parmas.updateDateStart = this.dataObj.updateDateStart
					}
					if (this.dataObj.updateDateEnd != undefined) {
						parmas.updateDateEnd = this.dataObj.updateDateEnd
					}
				} else {
					parmas = {
						page: this.page,
						size: this.size,
					}
				}
				console.log(parmas)
				this.$REQ.get(parmas, "billStockCheck/findBillStockCheckPage").then(res => {
					console.log(res)
					res.flag == true ? (this.totalPage = res.result.totalPages, res.result.content.length == 0 ? this.status =
						"noMore" : (res.result.content.forEach(item => {
							item.showMore = false;
							item.startDate = this.$api.formatTime(item.startDate);
							item.endDate = this.$api.formatTime(item.endDate);
							this.dataList.push(item);
						}), this.status = "more")) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
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
