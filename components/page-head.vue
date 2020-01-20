<template name="page-head">
		<view class="uni-page-head">
			<view class="topnav">
				
			</view>
			<view class="uni-page-head-con">
				<view class="uni-page-head-left">
					<view class="iconfont icon-back-m"  @click="onClick(0)">
					</view>
					<view class="uni-page-head-title">{{title}}</view>
				</view>
				<view class="uni-page-head-right" v-if="showRightText" @click="onClick(1)">
					<view v-if="rightTxt!=''"  class="uni-page-head-right" >
						{{rightTxt}}
					</view>
					<view class="iconfont icon-lishijilu" style="color: #000;" v-else>
					</view>
				</view>
			</view>
		</view>
	
</template>
<script>
	export default {
		name: "page-head",
		props: {
			title: {
				type: String,
				default: ""
			},
			newcolor:{
				type:String,
				default:''
			},
			rightTxt:{
				type:String,
				default:""
			},
			showRightText:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			onClick(n){
				this.$emit("click",n)
			},
		
		}
	}
</script>
<style>
	
</style>

