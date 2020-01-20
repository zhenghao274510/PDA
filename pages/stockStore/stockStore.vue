<template>
	<view>
		<page-heade :title="lang.title.stockTaking" @click="onClick"></page-heade>
		<view class="uni-his-swiper page-top-padding">
			<block v-for="(v,k) in dataList" :key="k">
				<view class="uni-his-item">
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
							<view class="uni-his-left-list-two">
								{{v.endDate}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.bass.state}}
							</view>
							<view class="uni-his-left-list-two">
								{{lang.bass.Ininventory}}
							</view>
							
						</view>
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.common.workName}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.updaterName}}
							</view>
						</view>
						<view class="uni-his-left-list ">
							<view class="uni-his-left-list-one">
								{{lang.common.workTime}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.updateDate}}
							</view>
						</view>
					</view>
					<view class="uni-his-right uni-bor-left">

						<view class="uni-his-right-top" @tap="gotoDetails(v)">
							<view class="iconfont icon-zhedie" v-if="v.state!=1">
							</view>
							<view class="icon-img" v-else>
								<image src="/static/image/2.png" mode="" class="icon-img"></image>
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
				page: 1,
				size: '10',
				totalPage: '',
				status: 'loading',
				dataList: [],
				showDel: false,
				storeList: [],
				wmsWarehouseId: ''
			}
		},
		components: {
			pageHeade,
			uniLoadMore
		},
		onLoad() {
			this.loadData();
			this.getStore();
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		onPullDownRefresh() {
			this.status = "loading";
			uni.startPullDownRefresh({
				success() {
					console.log("刷新")
				}
			});
			setTimeout(() => {
				this.status = "more";
			}, 1000)
		},
		methods: {
			gotoDetails(e) {
				console.log(e)
				e.state == 1 ? this.$api.navTo(
						`/pages/stockStore/newStockStoreDetails?id=${e.id}&wmsWarehouseId=${e.wmsWarehouseId}&type=0}`) :
					this.$api.navTo(`/pages/stockStore/stockStoreDetails?id=${e.id}&wmsWarehouseId=${e.wmsWarehouseId}`)
			},
			onClick(e) {
				// this.$api.tip('点击返回')
				e == 0 ? uni.navigateBack() : this.$api.navTo("/pages/stockStore/historyStockStore")
			},
			getStore() {
				let parmas = {
					state: ''
				};
				this.$REQ.get(parmas, "billPutOn/findWarehouseList").then(res => {
					// console.log(res)
					this.storeList = res.result
				}).catch(err => {})
			},
			loadData() {
				let parmas = {
					page: this.page,
					size: this.size,
					state:'1'
				}
				this.$REQ.get(parmas, "billStockCheck/findBillStockCheckPage").then(res => {
					console.log(res)
					res.flag ? (this.totalPage = res.totalPages, res.result
						.content.length == 0 ? this.status = "noMore" : (
							res.result.content.forEach(item => {
								item.showMore = false;
								item.startDate = this.$api.formatTime(item.startDate);
								item.endDate = this.$api.formatTime(item.endDate);
								item.updateDate = this.$api.formatTime(item.updateDate);
								this.dataList.push(item)
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

	.icon-img {
		width: 40px;
		height: 41px;
	}
</style>
