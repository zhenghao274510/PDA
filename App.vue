<script>
	export default {
		globalData: {
			height: '',
			goodsType: [{
					label: 'A',
					value: 'A类货物'
				},
				{
					label: 'B',
					value: 'B类货物'
				},
				{
					label: 'C',
					value: 'C类货物'
				}
			],
			

		},
		onLaunch: function() {
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					uni.setStorageSync('height', res.screenHeight);
					// res.screenHeight > res.screenWidth ? (uni.setStorageSync("height", res.screenHeight), plus.screen.lockOrientation(
					// 	"portrait-primary")) : (uni.setStorageSync(
					// 	"height", res.screenWidth), plus.screen.lockOrientation('landscape-primary'));
				}
			})
		},
		onShow: function() {
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/uni.css";
	@import url("/static/iconfont.css");

	html,
	body {
		width: 100%;
		height: 100%;
	}

	* {
		padding: 0;
		margin: 0;
	}

	.flex-date {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.time {
		flex: 1;
		text-align: center;
	}

	.line {
		width: 30px;
		height: 1px;
		background: #000000;
	}

	.uni-his-left-list-one {
		font-weight: 600;
		color: #222222;
	}

	.uni-his-left-list-two {
		font-weight: 500;
		color: #808080;
	}

	page {
		height: 100%;
	}

	.page-top-padding {
		padding: 180px 0 30px 0;
	}

	/* 底部 */
	.page-share-title {
		text-align: center;
		font-size: 30upx;
		color: #ff8300;
		background: #FFFFFF;
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 10px solid #F0F0F0;
		z-index: 99;
	}

	.page-foot {
		display: flex;
		align-items: center;
	}

	.page-bottom-item {
		flex: 1;
		height: 88upx;
		text-align: center;
		line-height: 88upx;
		color: #808080;
	}

	.uni-scroll-view {
		background: #FFFFFF;
		z-index: 999 !important;
	}

	.borderno {
		border: none;
	}

	/* 底部完 */

	/* hover效果 */
	.uni-grid-item-hover {
		background-color: #f1f1f1
	}

	.hover {
		background: rgba(0, 0, 0, 0.1);
	}

	.btn-hover {
		opacity: .6;
	}

	.input-hover {
		border: 1 solid #409eff;
	}

	.topnav {
		height: 50px;
		background: #FFFFFF;

	}

	.myInput {
		line-height: 50px;
	}

	/* pagehead */
	.uni-page-head {
		background: #F0F0F0;
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		z-index: 999999 !important;
	}

	.uni-page-head-con {
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 88upx;
		box-sizing: border-box;
		padding: 0 5%;
		margin: 10px 0;
	}

	.uni-page-head-left {
		display: flex;
		align-items: center;
	}

	.uni-page-head-title {
		font-size: 30upx;
		line-height: 88upx;
		color: #000;
		font-weight: bold;
		margin-left: 15px;
	}

	.uni-page-head-right {
		font-size: 30upx;
		line-height: 88upx;
		color: #ff8300;
		font-weight: bold;
	}

	.uni-input-input {
		font-size: 28px;
	}

	.uni-popup-hide {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 9999;
	}

	.uni-content-hide {
		width: 80%;
		height: 300px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		border-radius: 20px;
		background: #FFFFFF;
	}

	.uni-content-hide-top {
		height: 250px;
		padding: 10px;
		border-bottom: 7px solid #f0f0f0;
		text-indent: 10px;

	}

	/* 弹出层 */
	.uni-content-hide-bottom {
		display: flex;
		align-items: center;
		height: 80px;
	}

	.uni-content-left,
	.uni-content-right {
		flex: 1;
		height: 60px;
		line-height: 60px;
		text-align: center;
	}

	.uni-content-right {
		border-left: 2px solid #f0f0f0;
	}
</style>
