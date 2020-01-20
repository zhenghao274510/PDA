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
			<view class="uni-list-con-item padding-default">
				<view class="iconfont icon-zhanghao">
				</view>
				<input class="bottom-border" name="input" type="text" :placeholder="lang.login.placeholderCount" v-model="acount" />
			</view>
			<view class="uni-list-con-item padding-default">
				<view class="iconfont icon-mima">
				</view>
				<input class="bottom-border" name="input" type="password" :placeholder="lang.login.placeholderPsw" v-model="pwd" />
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
				<view class="uni-list-chose-item " @click="choseitem(1)">
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

		<view type="middle-list" class="uni-popup-hide" position="middle" mode="fixed" v-if="first">
			<view class="uni-list-con uni-center center-box">
				<view class="uni-list-con-item padding-hide">
					<view class="iconfont icon-mima">
					</view>
					<input class="bottom-border" name="input" type="password" :placeholder="lang.login.oldPwd" v-model="oldPwd" />
				</view>
				<view class="uni-list-con-item padding-hide">
					<view class="iconfont icon-mima">
					</view>
					<input class="bottom-border" name="input" type="password" :maxlength="maxlength" :minlength='minlength'
					 :placeholder="lang.login.newPwd" v-model="newPwd" />
				</view>
				<view class="uni-list-con-item padding-hide">
					<view class="iconfont icon-mima">
					</view>
					<input class="bottom-border" name="input" type="password" :maxlength="maxlength" :minlength='minlength'
					 :placeholder="lang.login.newPwd" v-model="renewPwd" />
				</view>
				<view class="footer-btn">
					<view class="footer-change-btn border-right" @click="changePwd">
						{{lang.common.confirm}}
					</view>
					<view class="footer-change-btn" @click="first=false">
						{{lang.common.Cancel}}
					</view>
				</view>
				<img style='width: 142px;margin-right:-9px;cursor:pointer' slot="suffix" :src='captchaContent' @click='getKaptcha'
				 v-if="YZM" />
			</view>
		</view>
		<view class="uni-copy">
			{{lang.login.copyrighty}}
		</view>
		<message ref="Message"></message>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import crypto from '@/common/js/crypto.js'
	export default {
		data() {
			return {
				pwd: '',
				check: [{
						checked: true
					},
					{
						checked: false
					}
				],
				minHeight: '',
				acount: '',
				newPwd: "",
				renewPwd: '',
				oldPwd: '',
				captchaContent: "",
				captcha: [], //  验证码
				captchaCode: '',
				captchaToken: '',
				maxlength: '',
				minlength: '',
				containsUppercaseLetters: 0,
				containsLowercaseLetters: 0,
				containsDigitalNumber: 0,
				containsSpecialCharacters: 0,
				YZM: false,
				first: false
			};
		},
		computed: {
			...mapState([
				'lang'
			])
		},
		//监听属性 类似于data概念
		onLoad() {
			Promise.all([this.getKaptcha(), this.getPasswordRule()]).catch(err => {
				console.log('err', err)
			})
		},
		onShow() {},
		//方法集合
		methods: {
			...mapMutations(['changeLang']),
			changePwd() {
				let parmas = {
					loginStr: crypto.encryptByDES(this.acount, this.newPwd, this.oldPwd)
				};
				this._reqw.post('parmas', 'user/changepassword').then(res => {
					res.data.flag ? (this.first = false, this.$refs.Message.success({
						content: this.$api.getError(res.data.errorCode),
						duration: 2000,
						background: false
					})) : this.$refs.Message.error({
						content: this.$api.getError(res.data.errorCode),
						duration: 2000,
						background: false
					})
				}).catch(err => {})
			},
			choseitem(n) {
				this.check.forEach((item, index) => {
					n == index ? item.checked = true : item.checked = !item.checked
				})
			},
			getPasswordRule() {
				this._reqw.get({}, "user/initPwdRule").then(res => {
					res.data.flag ? (console.log(res), this.maxlength = res.result.minLength, this.minlength = res.result.minLength,
							this
							.containsUppercaseLetters = res.result.containsUppercaseLetters, this.containsLowercaseLetters = res.result.containsLowercaseLetters,
							this.containsDigitalNumber = res.result.containsDigitalNumber, this.containsSpecialCharacters = res.result
							.containsSpecialCharacters
						) :
						this.$refs.Message.error({
							content: this.$api.getError(res.data.errorCode),
							duration: 2000,
							background: false
						})
					console.log(res)
				}).catch(err => {})
			},
			regTest(res) {
				let REG;
				// 非0 校验    0 不校验 

				if (this.containsUppercaseLetters == 0) {
					// let reg1=/A-Z/

				}
				if (this.containsLowercaseLetters == 0) {

				}
				if (this.containsDigitalNumber == 0) {

				}
				if (this.containsSpecialCharacters == 0) {

				}

			},
			getKaptcha() { // 获取验证码
				this._reqw.post({}, 'kaptcha/captcha').then(res => {
					if (res.flag) {
						if (res.data.result === null) {
							this.yzm = false
							this.captcha = []
						} else {
							this.yzm = true
							this.captchaContent = `data:image/jpeg;base64,${res.data.result.captchaContent}`
							this.captchaToken = res.result.captchaToken
							this.captchaLength = res.result.captchaLength
							this.captcha = [{
									required: true,
									message: this.$t('upms.login.useryzm'),
									trigger: 'blur'
								},
								{
									max: this.captchaLength,
									min: this.captchaLength,
									message: this.$t('upms.login.yzmError'),
									trigger: 'blur'
								}
							]
						}
					}
				}).catch(() => {})
			},
			subLogin() {
				// uni.navigateTo({
				// 	url: '/pages/home/index'
				// })
				uni.showLoading({
					title: '加载中....'
				})
				let parmas = {
					loginStr: crypto.encryptByDES(this.acount, this.pwd)
				};
				console.log(parmas)
				this._reqw.post(parmas, 'user/login').then(res => {
					console.log(res)
					uni.hideLoading();
					if (res.data.flag) {
						uni.setStorageSync('Xcsrftoken', res.header['x-csrf-token']);
						uni.setStorageSync('account', res.data.result.account);
						uni.setStorageSync('userName', res.data.result.userName);
						uni.setStorageSync('userId', res.data.result.userId);
						if (this.check[0].checked) {
							uni.navigateTo({
								url: '/pages/home/index'
							})
						} else {
							uni.navigateTo({
								url: '/pages/home/indexTwo'
							})
						}
					} else if (!res.data.flag && res.data.errorCode) {
						if (res.data.errorCode === 'I010104') {
							this.first = true
						} else if(res.data.errorCode==='I010117') {
							this.$refs.Message.error({
								content: res.result.leftTimes,
								duration: 2000,
								background: false
							})

						}
					}
					if (!res.data.flag) {
						this.getKaptcha();
					}


				}).catch(err => {})
			},
			// getisLogon() {
			// 	this._reqw.get({}, "user/isLogon").then(res => {
			// 		!res.flag ? (this.first = true) : this.first = false
			// 	}).catch(err => {})
			// }
		}
	}
</script>
<style scoped lang="scss">
	.footer-btn {
		display: flex;
		align-items: center;
		border-top: 5px solid #CCCCCC;
		height: 80px;
	}

	.padding-hide {
		padding: 5px 0;
	}

	.padding-default {
		padding: 30px 0;
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
		height: 332px;
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
