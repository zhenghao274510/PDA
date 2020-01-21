<template>
	<view>
		<page-heade :title="lang.title.storeText" :rightTxt="lang.common.screening" @click="onClick"></page-heade>
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
								{{lang.common.productCode}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.wmsWarehouseName}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom">
							<view class="uni-his-left-list-one">
								{{lang.common.wmsWarehouseDetailName}}
							</view>
							<view class="uni-his-left-list-two" v-if="v.wmsWarehouseDetailName">
								{{v.wmsWarehouseDetailName}}
							</view>
							<view class="uni-his-left-list-two" v-else>
								-
							</view>
						</view>
						<view class="uni-his-left-list" :class="{'uni-bor-bottom':v.showMore}">
							<view class="uni-his-left-list-one">
								{{lang.common.inStockDay}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.inStockDay}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								AWB
							</view>
							<view class="uni-his-left-list-two">
								{{v.awb}}
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
								{{lang.common.productCode}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.productCode}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.common.state}}
							</view>
							<!-- {{v.stockState}} -->
							<view class="uni-his-left-list-two" v-if="v.stockState==0">
								{{lang.bass.library}}
							</view>
							<view class="uni-his-left-list-two" v-if="v.stockState==1">
								{{lang.bass.outbound}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.common.inputDate}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.inputDate}}
							</view>
						</view>
						<view class="uni-his-left-list uni-bor-bottom" v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.common.outputDate}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.outputDate}}
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
						<view class="uni-his-left-list " v-if="v.showMore">
							<view class="uni-his-left-list-one">
								{{lang.common.workTime}}
							</view>
							<view class="uni-his-left-list-two">
								{{v.outputDate}}
							</view>
						</view>
					</view>
					<view class="uni-his-right uni-bor-left">
						<view class="uni-his-right-top" @click="chang(k)">
							<view class="iconfont icon-haofangtuo400iconfontshaixuanzhedieguanbi" style="font-size:28px;" v-if="v.showMore">
							</view>
							<view class="iconfont icon-haofangtuo400iconfontshaixuanzhedie" v-else style="font-size: 28px;">
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
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
				size: 10,
				totalPage: 1,
				dataList: [],
				status: 'loading',
				barCode: '',
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
			options.id != undefined ? (this.dataObj = JSON.parse(options.id), this.search = true) : this.barCode = ''
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
			console.log(this.totalPage, this.page)
			this.totalPage > this.page ? (this.page += 1, this.loadData()) : setTimeout(() => {
				this.status = "noMore"
			}, 500)
		},
		methods: {
			chang(k) {
				this.dataList.forEach((item, index) => {
					k == index ? (item.showMore = !item.showMore) : item.showMore = false
				})
			},
			onClick(e) {
				// this.$api.tip('点击返回')
				e == 0 ? uni.navigateBack() : this.$api.navTo("/pages/InventoryQuery/jiluchoose")
			},
			loadData() {
				let parmas = {
				}
				if (this.search) {
					if (this.dataObj.barCode != undefined) {
						parmas.barCode = this.dataObj.barCode
					}
					if (this.dataObj.awb != undefined) {
						parmas.awb = this.dataObj.awb
					}
					if (this.dataObj.goodsName != undefined) {
						parmas.goodsName = this.dataObj.goodsName
					}
					if (this.dataObj.wmsWarehouseId != undefined) {
						parmas.wmsWarehouseId = this.dataObj.wmsWarehouseId
					}
					if (this.dataObj.goodsType != undefined) {
						parmas.goodsType = this.dataObj.goodsType
					}
					if (this.dataObj.wmsWarehouseDetailName != undefined) {
						parmas.wmsWarehouseDetailName = this.dataObj.wmsWarehouseDetailName
					}

					if (this.dataObj.inputDateStart != undefined) {
						parmas.inputDateStart = this.dataObj.inputDateStart
					}
					if (this.dataObj.inputDateEnd != undefined) {
						parmas.inputDateEnd = this.dataObj.inputDateEnd
					}
					if (this.dataObj.stockState != undefined) {
						parmas.stockState = this.dataObj.stockState
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
					if (this.dataObj.inStockDayStart != undefined) {
						parmas.inStockDayStart = this.dataObj.inStockDayStart
					}
					if (this.dataObj.inStockDayEnd != undefined) {
						parmas.inStockDayEnd = this.dataObj.inStockDayEnd
					}
					if(this.dataObj.productCode!=''){
						parmas.productCode=this.dataObj.productCode
					}
				} else {
					parmas = {
						page: this.page,
						size: this.size
					}
				}
				this.$REQ.get(parmas, "stock/findStockPage").then(res => {
					console.log(res)
					res.result.content.length == 0 ? this.status = "noMore" : this.status = "more";
					res.flag == true ? (this.totalPage = res.result.totalPages, res.result.content.forEach(item => {
						item.showMore = false;
						item.inputDate = this.$api.formatTime(item.inputDate);
						item.outputDate = this.$api.formatTime(item.outputDate);
						item.updateDate = this.$api.formatTime(item.updateDate);
						this.dataList.push(item);
					})) : this.$refs.Message.error({
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
