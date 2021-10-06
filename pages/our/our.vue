<template>
	<view class="contact">
		<image class="img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.hebeituolian.com%2FUpload%2Fcommon%2F4D7861138AA5AAB610E4AFE79A8473BF.jpg&refer=http%3A%2F%2Fwww.hebeituolian.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635402998&t=78c1e04156cf09bb1b7eca950f398b1d"></image>
		<view class="info">
			<view @click="call">联系电话 : 000-000-000 ( 点击拨打 )</view>
			<view>联系地址 : 江苏省南京市淳化街道南京工程学院</view>
		</view>
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude:118.888211,
				latitude:31.933499,
				markers:[{
					longitude:118.888211,
					latitude:31.933499,
					iconPath:'../../static/didian.png',
					width:30,
					height:30
				}]
			}
		},
		methods: {
			call(){
				uni.makePhoneCall({
					phoneNumber:'000-000-000'
				})
			}
		}
	}
</script>

<style lang="scss">
@import './our'
</style>
