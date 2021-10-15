<template>
	<view class="list">
		<view class="list_item" v-for="(item,index) in SubjectList" :key="item.id" @click="navigator(index)">
			<image :src="item.pic"></image>
			<view>
				<text class="name">{{item.categoryName}}</text>
			</view>
			<view>
				<text class="title">{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['SubjectList'],
		methods:{
			navigator(index){
				this.$emit('itemClick',index)
			}
		}
	}
</script>

<style lang="scss">

         .list{
				padding: 0 15rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.list_item{
					background: #FFFFFF;
					width: 720rpx;
					margin: 10rpx 0;
					padding: 15rpx;
					box-sizing: border-box;
					image{
						width: 100%;
						height: 150px;
					}
					.name{
						font-size: 40rpx;
						color: red;
						font-weight: bolder;
					}
					.title{
						font-size: 35rpx;
						padding-top: 20rpx;
					}
				}
			}
</style>
