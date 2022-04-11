<template>
	<view class="YmContent">
		
		<view class="u-tabs-box">
			<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view class="all_orders_1">
						<text decode="true" class="all_orders_2">全部记录</text>
				<view class="orders">
					<view v-for="(item_orders, index) in list_orders" :key="index" class="item">
						<view class="all_orders_5" @click="toDetail(index)">
							<view class="all_orders_7">
								<image v-on:click="all_orders_8_8_click(item_orders)"  src="/static/all_orders/images/all_orders_8_8.jpg" mode="scaleToFill" border="0"    class="all_orders_8"></image>
								<text decode="true" class="address_from">开始时间：{{item_orders.startTime | formateDate}}</text>
							</view>
							<image v-on:click="all_orders_10_10_click(item_orders)"  src="/static/all_orders/images/all_orders_10_10.jpg" mode="scaleToFill" border="0"    class="all_orders_10"></image>
							<view class="all_orders_11">
								<image v-on:click="all_orders_12_12_click(item_orders)"  src="/static/all_orders/images/all_orders_12_12.jpg" mode="scaleToFill" border="0"    class="all_orders_12"></image>
								<text decode="true" class="address_to">执行情况：消耗{{item_orders.totalCalorie}}卡-运动{{item_orders.totalTime}}小时</text>
							</view>
							<view class="all_orders_14">
								<text decode="true" class="all_orders_15">计划编号</text>
								<text decode="true" class="orderNo">{{item_orders.planSn}}</text>
							</view>
						</view>
						<image v-on:click="all_orders_6_6_click(item_orders)"  src="/static/all_orders/images/all_orders_6_6.jpg" mode="scaleToFill" border="0"    class="all_orders_6"></image>
					</view>
				</view>
				<view style="width: 100%;
				height: 50px;
				line-height: 50px;
				text-align: center;
				font-size: 28rpx;" 
				v-if="flag">
				-----没有更多了-----
				</view>
				</view>
				</scroll-view>
				</swiper-item>
			
		</swiper>

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
import all_orders from "./all_orders.js";
export default all_orders;
</script>

<style lang="scss" scoped>
   @import './all_orders.scss'
</style>