<template>
	<view class="uni-popup-hide" @click="onClick(0)">
		<view class="uni-content-hide">
			<view class="uni-content-hide-top">
				{{lang.common.confirmCancel}}
			</view>
			<view class="uni-content-hide-bottom">
				<view class="uni-content-left" @click="onClick(1)">
					{{lang.common.confirm}}
				</view>
				<view class="uni-content-right" @click="onClick(2)">
					{{lang.common.Cancel}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default{
		methods:{
			onClick(n){
				this.$emit('click',n)
			}
		},
		computed:{
			...mapState([
				'lang'
			])
		},
	}
</script>

<style scoped>
	.uni-popup-hide{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.5);
	}
	.uni-content-hide{
		width: 85%;
		height: 300px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-direction: column;
		border-radius: 20px;
		padding: 10px 0;
		background: #FFFFFF;
	}
	.uni-content-hide-top{
		height: 250px;
		padding-top:10px ;
		border-bottom: 7px solid #f0f0f0;
		text-align: center;
		
	}
	.uni-content-hide-bottom{
		display: flex;
		align-items: center;
		height: 80px;
	}
	.uni-content-left,.uni-content-right{
		flex: 1;
		height: 60px;
		line-height: 60px;
		text-align: center;
	}
	.uni-content-right{
		border-left: 2px solid #f0f0f0;
	}
</style>
