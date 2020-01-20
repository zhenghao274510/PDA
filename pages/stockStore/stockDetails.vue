<template>
	<view>
		<page-heade :title="lang.title.inventoryDetails" @click="onClick" :rightTxt="rightText"></page-heade>
		<view class="uni-his-swiper page-top-padding">

			<!-- //  手工录入 -->

			<!-- <view class="uni-his-item"> -->
			<view class="uni-his-left">
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.barCode}}
					</view>
					<view class="myInput">
						<input type="text" value="" v-model="barCode" class="input" />
					</view>

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.bass.Warehouse}}
					</view>
					<view class="myInput input">
						{{WarehouseName}}
					</view>
					

				</view>
				<view class="uni-add-list">
					<view class="uni-add-list-one">
						{{lang.common.wmsWarehouseDetailName}}
					</view>
					<store-select :list="chuweiList" :clearable="false" :listShow="false" :isCanInput="false" :placeholder="'placeholder'"
					 :initValue="lang.common.initValue" :listTop="40" :selectHideType="'hideAll'" @click="changeStore">
					</store-select>
				</view>
			</view>

			<!-- </view> -->
		</view>
		<message ref="Message"></message>
		<view class="page-share-title page-foot">
			<view class="page-change page-bottom-item" hover-class="hover" @click="changeInfo(0)">
				{{lang.common.saveDrafts}}
			</view>
			<view class="page-del page-bottom-item uni-bor-left" hover-class="hover" @click="changeInfo(1)">
				{{lang.common.Completeinventory}}
			</view>
		</view>

		<poup-hide v-if="showDel" @click="isDel"></poup-hide>
	</view>

</template>

<script>
	import pageHeade from "@/components/page-head.vue"
	import pageFoot from "@/components/page-foot.vue"
	import poupHide from "@/components/poup-hide.vue"
	import storeSelect from '@/components/xfl-select/store-select.vue'
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				showRightText: false,
				rightText: '新增',
				showDel: false,
				barCode: "",
				wmsWarehouseId: '',
				wmsWarehouseDetailsId: '',
				WarehouseName: '',
				id: '',
				version: '',
				dataList: [],
				storeList: [],
				list: [],
				type: 1,
				chuweiList: [],
				disabled: true
			}
		},
		components: {
			pageHeade,
			pageFoot,
			poupHide,
			storeSelect
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		onLoad(options) {
			this.id = options.id //  盘点单id
			this.wmsWarehouseId=options.wmsWarehouseId
			this.getCuwei()
		},
		watch: {

		},
		methods: {
			onClick(e) {
				// this.$api.tip('点击返回')
				e == 0 ? uni.navigateBack() : uni.redirectTo({
					url: `/pages/stockStore/newStock?id=${this.wmsWarehouseId}`
				});
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
					res.result.forEach(item => {
						item.value = item.code,
							this.chuweiList.push(item)
					});
					this.WarehouseName = res.result[0].wmsWarehouseModel.name
					console.log(res)
				}).catch(err => {})
			},
			//  保存草稿
			save() {
				let detail = {
					barCode: this.barCode,
					wmsWarehouseId: this.wmsWarehouseId,
					wmsWarehouseDetailId: this.wmsWarehouseDetailsId
				}
				let parmas = {
					Id: this.id, //盘点单ID
					version: this.version, //	版本号
					detail:JSON.stringify(detail)  //	盘点单明细数据
				};
				console.log(parmas)
				this.$REQ.post(JSON.stringify(parmas) , "billStockCheck/updateBillStockCheckTemp").then(res => {
					res.flag ? this.$api.tip(this.lang.tip.success) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			changeStore(e){
				console.log(e)
					this.wmsWarehouseDetailsId = e.id,
					this.version=e.version;
			},
			//  完成
			finished() {
				let detail = {
					barCode: this.barCode,
					wmsWarehouseId: this.wmsWarehouseId,
					wmsWarehouseDetailId: this.wmsWarehouseDetailsId
				}
				let parmas = {
					Id: this.id, //盘点单ID
					version: this.version, //	版本号
					detail:JSON.stringify(detail)  //	盘点单明细数据
				};
				console.log(JSON.stringify(parmas))
				this.$REQ.post(parmas, "billStockCheck/updateBillStockCheckOver").then(res => {
					res.flag ? this.$api.tip(this.lang.tip.success) : this.$refs.Message.error({
						content: this.$api.getError(res.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			isDel(e) {
				if (e == 0 || e == 2) {
					this.showDel = false
				} else if (e == 1) {
					this.delItem()
				}
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

	.myInput {
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		border-radius: 5px;
		border: 1px solid #c0c4cc;
		padding-left: 15px;
          .input{
			  height: 50px;
			  line-height: 50px;
			  padding-left: 15px;
			  font-size: 28upx;
		  }
		input {
			height: 50px;
			line-height: 50px;
			padding-left: 15px;
		}
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
