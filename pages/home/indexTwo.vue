<template>
	<view class="all">
		<view class="topnav">

		</view>
		<view class="uni-content">
			<block v-for="(v,k) in lang.home.options" :key="k" v-if="k>5">
				<view class="uni-item" :class="{'nomargin':k%2==1}" :hover-start-time="20" :hover-stay-time="70" hover-class="item-hover"
				 @click="choseItem(k)">
					<image :src="v.image" mode="" :style="{width: v.width+'px',height:v.height+'px'}"></image>
					<view class="" :style="{color:v.textcolor}">
						{{v.text}}
					</view>
				</view>
			</block>
		</view>
		<view class="uni-bottom">

		</view>
		<message ref="Message"></message>
		<view class="uni-bot" @click="loginOut">
		{{lang.home.loginOut}}
		</view>
	</view>

</template>

<script>
	import {mapState} from 'vuex'; 
	export default {
		data() {
			return {
				minHeight: '',
			}
		},
		components: {},
		computed:{
			...mapState([
				'lang'
			])
		},
		onLoad() {
		},
		onShow() {
			this.minHeight = uni.getStorageSync('height');
			console.log(uni.getStorageSync('height'))
		},
		methods: {
			loginOut() {
				this._reqw.get({}, "user/logout").then(res => {
					res.data.flag ? uni.reLaunch({
						url: '/pages/resgin/index'
					}) : this.$api.tip(res.data.errorCode)
				}).catch(err => {})
			},
			goto(n) {
				console.log(n)
				this.$api.navTo('/pages/history/history')
			},
			choseItem(k) {
				console.log(k)
				switch (k) {
					case 6:
						this.$api.navTo('/pages/soldIn/headSoldIn');
						break;
					case 7:
						this.$api.navTo("/pages/soldOut/headSoldOut")
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.all {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #f0f0f0;
	}

	.uni-content {
		display: flex;
		flex-wrap: wrap;
		height: 30%;
		box-sizing: border-box;
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

	.uni-bottom {
		width: 96%;
		margin: 10px auto 0 auto;
		background: #fff;
		height: 60%;
		box-sizing: border-box;
	}

	.uni-item image {
		margin-bottom: 10px;
	}

	.uni-bot {
		height: 80px;
		background: #fff;
		line-height: 80px;
		text-align: center;
		color: #ff8300;
		font-weight: bold;
		margin-top: 20px;
	}

	.item-hover {
		// backgroun
		opacity: .7;
	}
</style>

</style>
