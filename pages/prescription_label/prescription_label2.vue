<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="YmContent" :animation="animationData">
			<view class="prescription_label_1">
				<text decode="true" class="prescription_label_2">饮食情况明细</text>
				<text decode="true" class="No">NO.{{list.planSn}}</text>
				<view class="prescription_label_4">
					<view class="prescription_label_12">
						<text decode="true" class="prescription_label_15">摄取:</text>
						<text decode="true" class="RealName">{{list.ingestionCalorie}}卡</text>
						<text decode="true" class="prescription_label_17">食量</text>
						<text decode="true" class="payType">{{list.totalK}}克</text>
					</view>
					<view class="prescription_label_13">
						<text decode="true" class="prescription_label_15">状态:</text>
						<view class="age">
							<view v-if="list.status==0">待执行</view>
							<view v-if="list.status==1">正在执行</view>
							<view v-if="list.status==2">已完成</view>
							<view v-if="list.status==3">已关闭</view>
							<view v-if="list.status==4">无效计划</view>
						</view>
						<text decode="true" class="prescription_label_17">来源:</text>
						<text decode="true" class="sex">
							<view v-if="list.sourceType==0">PC</view>
							<view v-if="list.sourceType==1">APP</view>
						</text>
					</view>
					<view class="prescription_label_14">
						<text decode="true" class="prescription_label_15">用户账号</text>
						<view class="result">
							{{list.memberUsername}}
						</view>
					</view>
				</view>
				<text decode="true" class="prescription_label_5"> Rp</text>
				<view class="prescription_label_7">
					<view v-for="(item, index) in list.orderFoodItemList" :key="index" class="prescription_label_27">
						<view class="prescription_label_28">
							<text decode="true" class="xh">{{index+1}}</text>
							<text decode="true" class="DrugName">{{item.foodName}}</text>
							<text decode="true" class="amount">{{item.foodQuantity}}g</text>
							<text decode="true" class="price">{{item.foodQuantity*item.foodCalorie}}卡</text>
						</view>
						<text decode="true" class="used">{{item.foodSn}}</text>
						<image v-on:click="prescription_label_30_30_click(item_7)"  src="/static/my/prescription_label/images/prescription_label_30_30.jpg" mode="scaleToFill" border="0"    class="prescription_label_30"></image>
						<text decode="true" class="prescription_label_31">食品编号</text>
					</view>
				</view>
				<view class="prescription_label_8">
					<text decode="true" class="prescription_label_10">总共摄取</text>
					<text decode="true" class="Total">{{list.ingestionCalorie}}卡</text>
				</view>
				<text decode="true" class="fromInfo">该数据由健康管理平台提供</text>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
import prescription_label from "./prescription_label.js";
export default prescription_label;
</script>

<style lang="scss" scoped>
   //@import url("/animate.min.css");
   @import './prescription_label.scss'
</style>