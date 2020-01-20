<template>
	<view class="all" :height="minHeight">
		<view class="topnav">

		</view>
		<view class="uni-content">
			<block v-for="(v,k) in lang.home.options" :key="k" v-if="k<=4">
				<view class="uni-item" :class="{'nomargin':k%2==1}" :hover-start-time="20" :hover-stay-time="70" hover-class="item-hover"
				 @click="choseItem(k)">
					<image :src="v.image" mode="" :style="{width: v.width+'px',height:v.height+'px'}"></image>
					<view class="text" :style="{color:v.textcolor}">
						{{v.text}}
					</view>
				</view>
			</block>

		</view>
		<message ref="Message"></message>
		<view class="uni-bot" @click="loginOut">
			{{lang.home.loginOut}}
		</view>
	</view>

</template>

<script>
	import navTop from "@/components/nav-top.vue"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				top: getApp().globalData.top,
				minHeight: ''
			}
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		components: {
			navTop
		},
		onLoad() {
			// this.formData()
		},
		onShow() {
			this.minHeight = uni.getStorageSync('height');
			console.log(uni.getStorageSync('height'))
		},
		methods: {
			loginOut() {
				this._reqw.get({}, "user/logout").then(res => {
					console.log(res)
					res.data.flag ? uni.reLaunch({
						url: '/pages/resgin/index'
					}) : this.$refs.Message.error(this.$api.getError(res.data.errorCode))
				}).catch(err => {})
			},
			goto(n) {
				console.log(n)
				this.$api.navTo('/pages/history/history')
			},
			choseItem(k) {
				switch (k) {
					case 0:
						this.$api.navTo('/pages/history/newAdd');
						break;
					case 1:
						this.$api.navTo('/pages/inStore/inStoreGood');
						break;
					case 2:
						this.$api.navTo('/pages/outStore/outStoreGood');
						break;
					case 3:
						this.$api.navTo('/pages/InventoryQuery/queryInventory');
						break;
					case 4:
						this.$api.navTo('/pages/stockStore/stockStore');
						break;
					case 5:
						this.$api.navTo('/pages/home/indexTwo')
						break;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	@media screen {}

	.all {
		height: 100%;
		background: #f0f0f0;
	}

	.uni-content {
		display: flex;
		flex-wrap: wrap;
		height: calc(100% - 150px);
		box-sizing: border-box;
	}

	.topnav {
		margin-bottom: 0;
	}

	.uni-item {
		width: 47%;
		margin: 2% 2% 0 2%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-radius: 5px;
	}

	.nomargin {
		margin: 2% 2% 0 0;
	}

	.uni-item image {
		margin-bottom: 10px;
	}

	.text {
		text-align: center;
	}

	.uni-bot {
		height: 80px;
		line-height: 80px;
		background: #fff;
		color: #ff8300;
		text-align: center;
		font-weight: bold;
		margin-top: 20px;
	}

	.item-hover {
		// backgroun
		opacity: .7;
	}
</style>
