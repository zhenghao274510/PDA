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
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.bass.goodsType}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.goodsType}}类货物
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.common.outputDate}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.outputDate}}
							</view>
						</view>
						<view class="uni-his-left-list" :class="{'uni-bor-bottom':v.showMore}">
							<view class="uni-his-left-list-one">
								{{lang.common.outStore}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.wmsWarehouseName}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.common.ladingNumber}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.ladingNumber}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.common.consignor}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.consignor}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.common.consignorPhone}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.consignorPhone}}
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
				showMore: false,
				page: 1,
				size: "10",
				totalPage: 1,
				status: 'loading',
				dataList: [],
				dataObj: {},
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
			options.id != undefined ? (this.dataObj = JSON.parse(options.id), this.search = true) : this.dataObj;
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
			}, 500)
		},
		onReachBottom() {
			this.status = "loading";
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 500)
		},
		methods: {
			change(k) {
				this.dataList.forEach((item, index) => {
					k == index ? (item.showMore = !item.showMore) : item.showMore = false
				})
			},
			loadData() {
				let parmas = {}
				if (this.search) {
					if (this.dataObj.barCode != undefined) {
						parmas.barCode = this.dataObj.barCode
					}
					if (this.dataObj.ladingNumber != undefined) {
						parmas.ladingNumber = this.dataObj.ladingNumber
					}
					if (this.dataObj.consignorPhone != undefined) {
						parmas.consignorPhone = this.dataObj.consignorPhone
					}
					if (this.dataObj.wmsWarehouseId != undefined) {
						parmas.wmsWarehouseId = this.dataObj.wmsWarehouseId
					}
					if (this.dataObj.goodsType != undefined) {
						parmas.goodsType = this.dataObj.goodsType
					}
					if (this.dataObj.goodsName != undefined) {
						parmas.goodsName = this.dataObj.goodsName
					}
					if (this.dataObj.outputDateStart != undefined) {
						parmas.outputDateStart = this.dataObj.outputDateStart
					}

					if (this.dataObj.outputDateEnd != undefined) {
						parmas.outputDateEnd = this.dataObj.outputDateEnd
					}
					if (this.dataObj.updaterName != undefined) {
						parmas.updaterName = this.dataObj.updaterName
					}
					if (this.dataObj.updateDateStart != undefined) {
						parmas.updateDateStart = this.dataObj.updateDateStart
					}
					if (this.dataObj.updateDateEnd != undefined) {
						parmas.updateDateEnd = this.dataObj.updateDateEnd
					}
				} else {

					parmas = JSON.stringify({
						page: this.page,
						size: this.size,
					})
				}

				console.log(parmas)
				this.$REQ.get(parmas, "billOutput/findBillOutputPage").then(res => {
					console.log(res)
					res.flag == true ? (this.totalPage = res.result.totalPages, res.result.content.length == 0 ? this.status =
						"noMore" : (res.result.content.forEach(item => {
							item.showMore = false;
							item.outputDate = this.$api.formatTime(item.outputDate);
							item.updateDate = this.$api.formatTime(item.updateDate)
							this.dataList.push(item)
						}), this.status = "more")) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(res => {})
			},
			gotoDetails(e) {
				this.$api.navTo('/pages/outStore/outStoreDetail?id=' + JSON.stringify(e))
			},
			onClick(e) {
				console.log(e)
				e == 0 ? uni.navigateBack() : this.$api.navTo("/pages/outStore/outStorechoose")
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
