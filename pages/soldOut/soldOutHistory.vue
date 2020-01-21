<template>
	<view>
		<page-heade :title="lang.common.history" @click="onClick" :rightTxt="lang.common.screening"></page-heade>
		<view class="uni-his-swiper page-top-padding">
			<block v-for="(v,k) in dataList" :key="k">
				<view class="uni-his-item">
					<view class="uni-his-left ">
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.bass.barCode}}
							</view>
							<view class="uni-his-left-list-two ">
								{{v.barCode}}
							</view>
						</view>
						<view class="uni-his-left-list " :class="{'uni-bor-bottom':v.showMore}">
							<view class="uni-his-left-list-one">
								{{lang.bass.putOffDate}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.putOffDate}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one ">
								{{lang.common.productCode}} </view>
							<view class="uni-his-left-list-two">
								{{v.productCode}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.bass.goodsName}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.goodsName}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.common.workName}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.updaterName}}
							</view>
						</view>
						<view class="uni-his-left-list" v-if="v.showMore">
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
							<view class="iconfont icon-zhedie">
							</view>
						</view>
						<view class="uni-his-right-top uni-bor-top" @click="change(k)">
							<view class="iconfont icon-haofangtuo400iconfontshaixuanzhedieguanbi" v-if="v.showMore" style="font-size: 30px;">
							</view>
							<view class="iconfont icon-haofangtuo400iconfontshaixuanzhedie" style="font-size: 30px;" v-else>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<uni-load-more :status="status" :contentText="lang.com"></uni-load-more>
		<message ref="Message"></message>
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
				showMore: false,
				dataList: [],
				page: 1,
				size: "10",
				totalPage: '',
				status: "loading",
				search: false
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
			if (options.id) {
				this.dataObj = JSON.parse(options.id);
				this.search = true
			}

			this.loadData()
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
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMOre"
			}, 500)
		},
		methods: {
			change(k) {
				this.dataList.forEach((item, index) => {
					k == index ? (item.showMore = !item.showMore) : item.showMore = false
				})
			},
			gotoDetails(e) {
				this.$api.navTo('/pages/soldOut/soldOutHistoryDetail?id=' + JSON.stringify(e))
			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo("/pages/soldOut/jiluchoose")
			},
			loadData() {
				let parmas = {}
				if (this.search) {
					if (this.dataObj.barCode != undefined) {
						parmas.barCode = this.dataObj.barCode
					}
				
					if (this.dataObj.weight != undefined) {
						parmas.weight = this.dataObj.weight
					}
					if (this.dataObj.productCode != undefined) {
						parmas.productCode = this.dataObj.productCode
					}
					if (this.dataObj.wmsWarehouseId != undefined) {
						parmas.wmsWarehouseId = this.dataObj.wmsWarehouseId
					}
					if (this.dataObj.wmsWarehouseDetailIdName != undefined) {
						parmas.wmsWarehouseDetailIdName = this.dataObj.wmsWarehouseDetailIdName
					}
					if (this.dataObj.putOffDateStart != undefined) {
						parmas.putOffDateStart = this.dataObj.putOffDateStart
					}
					
					if (this.dataObj.putOffDateEnd != undefined) {
						parmas.putOffDateEnd = this.dataObj.putOffDateEnd
					}
					if (this.dataObj.updateDateStart != undefined) {
						parmas.updateDateStart = this.dataObj.updateDateStart
					}
					if (this.dataObj.updateDateEnd != undefined) {
						parmas.updateDateEnd = this.dataObj.updateDateEnd
					}
					if (this.dataObj.updaterName != undefined) {
						parmas.updaterName = this.dataObj.updaterName
					}
				} else {
					parmas = {
						page: this.page,
						size: this.size
					}
				}
				console.log(parmas)
				this.$REQ.get(parmas, "billPutOff/findBillPutOffPage").then(res => {
					console.log(res)
					res.flag == true ? (this.totalPage = res.result.totalPages, res.result.content.length == 0 ? this.status =
						"noMore" : (res.result.content.forEach(item => {
							item.showMore = false;
							item.putOffDate = this.$api.formatTime(item.putOffDate);
							item.updateDate=this.$api.formatTime(item.updateDate);
							this.dataList.push(item);
						}), this.status = "more")) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			changeShow(k) {
				this.dataList[k].showMore = !this.dataList[k].showMore;
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
		height: 50%;
	}
</style>
