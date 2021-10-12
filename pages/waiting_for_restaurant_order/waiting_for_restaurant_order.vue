<template>
	<view class="YmContent">
		<view v-if="this.list==null"class="waiting_for_restaurant_order_1">
			<view class="waiting_for_restaurant_order_2">
				<image v-on:click="waiting_for_restaurant_order_3_3_click()"  src="/static/waiting_for_restaurant_order/images/waiting_for_restaurant_order_3_3.jpg" mode="scaleToFill" border="0"    class="waiting_for_restaurant_order_3"></image>
					<text decode="true" class="waiting_for_restaurant_order_4">暂时没有进行中的计划</text>
				
			</view>
			</view>
			<view v-if="this.list!=null"class="waiting_for_restaurant_order_1">
				<view class="waiting_for_restaurant_order_2">
					<image v-on:click="waiting_for_restaurant_order_3_3_click()"  src="/static/waiting_for_restaurant_order/images/waiting_for_restaurant_order_3_3.jpg" mode="scaleToFill" border="0"    class="waiting_for_restaurant_order_3"></image>
					<text decode="true" class="waiting_for_restaurant_order_4">计划正在进行中</text>
					<text decode="true" class="waiting_for_restaurant_order_5">预计时长{{totalTime}}小时 消耗{{totalCalorie}}卡</text>
					<uni-countdown class="waiting_for_restaurant_order_5" color="#FFFFFF" background-color="#d63335" border-color="#d63335" :hour="this.hour" :minute="this.minute" :second="0"></uni-countdown>
					<button v-on:click="waiting_for_restaurant_order_6_6_click()" class="waiting_for_restaurant_order_6">结束
					</button>
				</view>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
import waiting_for_restaurant_order from "./waiting_for_restaurant_order.js";
export default waiting_for_restaurant_order;
</script>

<style lang="scss" scoped>
   @import './waiting_for_restaurant_order.scss'
</style>