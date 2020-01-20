<template name="page-foot">
	<view class="page-share-title" :class="{hover:show}" @click="submit" hover-class="hover">
		<text v-if="footTxt!=''">{{footTxt}}</text>
	</view>
</template>

<script>
	export default {
		name: "page-foot",
		props: {
			footTxt: {
				type: String,
				default: ""
			}
		},
		data(){
			return {
				show:false
			}
		},
		methods: {
			submit() {
				this.$emit("click")
				// this.show=true;
				// setTimeout(()=>{
				// 	this.show=false;
				// },50)
			}
		}
	}
</script>

