<template>
	<view class="input-swiper">
		<view class="input-cont">
			<input type="number" v-model="num" class="input" @blur="change" />
			<view class="input-right">
				<view class="iconfont icon-haofangtuo400iconfontshaixuanzhedieguanbi" @click="onClick(0)">
				</view>
				<view class="iconfont icon-haofangtuo400iconfontshaixuanzhedie" @click="onClick(1)">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [Number, String],
				default: 0
			},
			type: {
				type: [String,Number],
				default: 0
			}
		},
		data() {
			return {
				num: parseInt(this.value)
			}
		},
		methods: {
			onClick(e) {
				let n = this.num - 0
				e == 1 ? n += 1 : (e == 0 && n > 1 ? n -= 1 : n = 1)
				this.type == 0 ? this.num = this.$api.parsePrice(n) : this.num = n;
				this.$emit("click", this.num);
			},
			change(){
				let n = this.num - 0
				this.type == 0 ? this.num = this.$api.parsePrice(n) : this.num = n;
				this.$emit("click", this.num);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.input-swiper {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		justify-content: center;

		.input-cont {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			border: 1px solid #cccccc;
			border-radius: 5px;

			.input {
				flex: 1;
				border: none;
				height: 100%;
				line-height: 100%;
				padding-left: 10px;
				font-size: 28upx;
			}

			.input-right {
				width: 60px;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #cccccc;

				.icon-haofangtuo400iconfontshaixuanzhedieguanbi,
				.icon-haofangtuo400iconfontshaixuanzhedie {
					font-size: 40px;
					line-height: .5;
					color: #cccccc;
					width: 100%;
					text-align: center;
				}

				.icon-haofangtuo400iconfontshaixuanzhedieguanbi {
					border-bottom: 1px solid #cccccc;
				}
			}

		}
	}
</style>
