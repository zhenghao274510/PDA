<template>
	<view class='uni-logo-content'>
		<view class="uni-logo-top">
			<image src="/static/image/logo.png" class="logo-img"></image>
			<view class="uni-pos" @click="changeLang">
				<image :src="lang.login.img" mode="scaleToFill"></image>
				<!-- <image src="/static/image/en.png" mode="scaleToFill" v-if="type==1" @click="showChose=true"></image> -->
				<!-- <image src="/static/image/es.png" mode="scaleToFill" v-if="type==2"></image> -->
			</view>
		</view>
		<view class="uni-list-con">
			<view class="uni-list-con-item">
				<view class="iconfont icon-zhanghao">
				</view>
				<input class="bottom-border" name="input" type="text" :placeholder="lang.login.placeholderCount" v-model="acount" />
			</view>
			<view class="uni-list-con-item">
				<view class="iconfont icon-mima">
				</view>
				<input class="bottom-border" name="input" type="password" :maxlength="maxlength" :minlength='minlength'
				 :placeholder="lang.login.placeholderPsw" v-model="pwd" />
			</view>
			<view class="uni-logo-bottom">
				<view class="uni-but" hover-class="btn-hover" @click="subLogin">{{lang.login.submit}}</view>
			</view>
			<view class="uni-list-chose">
				<view class="uni-list-chose-item" @click="choseitem(0)">
					<view class="iconfont icon-xuanzhong " v-if="check[0].checked">
					</view>
					<view class="iconfont icon-duoxuan_weixuanzhong" v-else>
					</view>
					<view class="uni-list-chose-title">
						{{lang.login.name1}}
					</view>
				</view>
				<view class="uni-list-chose-item" @click="choseitem(1)">
					<view class="iconfont icon-xuanzhong " v-if="check[1].checked">
					</view>
					<view class="iconfont icon-duoxuan_weixuanzhong" v-else>
					</view>
					<view class="uni-list-chose-title">
						{{lang.login.name2}}
					</view>
				</view>
			</view>
		</view>
		<!-- 初次进入需要修改默认密码 -->
	
		<view type="middle-list" class="uni-popup-hide"  position="middle" mode="fixed" v-if="first">
			<view class="uni-list-con uni-center center-box">
				<view class="uni-list-con-item ">
					<view class="iconfont icon-mima">
					</view>
					<input class="bottom-border" name="input" type="password" :placeholder="lang.login.oldPwd" v-model="oldPwd" />
				</view>
				<view class="uni-list-con-item">
					<view class="iconfont icon-mima">
					</view>
					<input class="bottom-border" name="input" type="password" :maxlength="maxlength" :minlength='minlength'
					 :placeholder="lang.login.newPwd" v-model="newPwd" />
				</view>
				<view class="uni-list-con-item">
					<view class="iconfont icon-mima">
					</view>
					<input class="bottom-border" name="input" type="password" :maxlength="maxlength" :minlength='minlength'
					 :placeholder="lang.login.newPwd" v-model="newPwd" />
				</view>
				<view class="footer-btn">
					<view class="footer-change-btn border-right" @click="changePwd">
						{{lang.common.confirm}}
					</view>
					<view class="footer-change-btn" @click="YZM=false">
						{{lang.common.Cancel}}
					</view>
				</view>
				<img style='width: 142px;margin-right:-9px;cursor:pointer'
				     slot="suffix"
				     :src='captchaContent'
				     @click='getKaptcha' v-if="YZM" />
			</view>
		</view>
		<view class="uni-copy">
			{{lang.login.copyrighty}}
		</view>
		<message ref="Message"></message>
		<!-- <cryp></cryp> -->
	</view>
</template>

<script>
</script>

<style scoped>
	.footer-btn {
		display: flex;
		align-items: center;
		border-top: 5px solid #CCCCCC;
		height: 80px;
	}
	
	.border-right {
		border-right: 1px solid #CCCCCC;
	}
	
	.footer-change-btn {
		flex: 1;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 50px;
	}
	
	.uni-center {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #FFFFFF;
		width: 60%;
		height: 350px;
		border-radius: 10px;
	}
	
	page {
		max-width: 750px;
		height: 100%;
		margin: 0 auto;
	}
	
	.icon-duoxuan_weixuanzhong,
	.icon-xuanzhong {
		font-size: 34px;
		margin-right: 10px;
		color: #666666;
	}
	
	.uni-logo-content {
		padding: 100px 0 50px 0;
		box-sizing: border-box;
		width: 80%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin: 0 auto;
	}
	
	.uni-logo-bottom {
		text-align: center;
		margin: 0 auto;
	}
	
	.uni-logo-top {
		text-align: center;
	}
	
	.uni-logo-top .logo-img {
		width: 250px;
		height: 250px;
	}
	
	.uni-list-con {
		width: 90%;
		text-align: center;
		margin: 0 auto;
	}
	
	.uni-pos {
		position: fixed;
		top: 100px;
		right: 100px;
	
		image {
			width: 38px;
			height: 38px;
		}
	}
	
	.uni-list-con-item {
		display: flex;
		width: 85%;
		margin: 0 auto;
		padding: 30px 0;
		align-items: center;
	
		input {
			flex: 1;
			height: 60px;
			line-height: 60px;
			border-bottom: 2px solid #d8d8d8;
			padding-left: 15px;
			margin-left: 15px;
			text-align: left;
			font-size: 30px;
		}
	}
	
	.uni-but {
		width: 100%;
		border-radius: 50px;
		height: 50px;
		line-height: 50px;
		padding: 10px 0;
		background: #ff8300;
		color: #fff;
		margin: 30px 0;
	}
	
	.uni-list-chose {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.uni-list-chose-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.uni-copy {
		margin-top: 30px;
		font-size: 12px;
		color: #999999;
	}
	
	.model {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}
	
	.selectlanguage {
		width: 393upx;
		height: 400upx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		background: #fff;
		z-index: 99;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 50upx 0;
		border-radius: 20upx;
	}
	
	.selectlanguage view {
		height: 100upx;
		line-height: 100upx;
		color: #EABB76;
	}
</style>
