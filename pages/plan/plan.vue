<template>
	<view>
		<bbh-shopcar :list="list" class="shopBox"  @refreshShopCar="refreshShopCar"></bbh-shopcar>
	</view>
</template>
<script>
	export default {
		data(){
			return { 
				options:[],
				list: [											//按这种格式写，不需要改变官方自带的滑动插件
					// {
					// 	options: [
					// 		{
					// 			ID: 0,									//产品ID
					// 			name:"苹果",							//产品名称
					// 			text: '删除',							//删除按钮，文字
					// 			price:14,								//价格
					// 			count:1,								//数量
					// 			stock:5,								//库存
					// 			check:false,							//是否选中
					// 			style: {								//删除按钮背景色，也可以通过css修改 -- 底部有 .shopBox >>> .uni-swipe_button
					// 				backgroundColor: 'rgb(255,58,49)'	
					// 			}
					// 		}
					// 	]
					// },
					// {
					// 	options: [
					// 		{
					// 			ID: 1,
					// 			name:"香蕉",
					// 			text: '删除',
					// 			price:15,
					// 			count:1,
					// 			stock:3,
					// 			check:false,
					// 			style: {
					// 				backgroundColor: 'rgb(255,58,49)'
					// 			}
					// 		}
					// 	]
					// }, 
					// {
					// 	options: [
					// 		{
					// 			ID: 2,
					// 			name:"葡萄",
					// 			text: '删除',
					// 			price:20,
					// 			count:1,
					// 			stock:10,
					// 			check:false,
					// 			style: {
					// 				backgroundColor: 'rgb(255,58,49)'
					// 			}
					// 		}
					// 	]
					// },
					// {
					// 	options: [
					// 		{
					// 			ID: 3,
					// 			name:"橘子",
					// 			text: '删除',
					// 			price:25,
					// 			count:1,
					// 			stock:2,
					// 			check:false,
					// 			style: {
					// 				backgroundColor: 'rgb(255,58,49)'
					// 			}
					// 		}
					// 	]
					// }
				]
			}
		},
		methods:{
			refreshShopCar(e){
				this.list = e;
			}
		},
		async onLoad(){
			const res=await this.$u.api.getPlanList()
			for(var i=0;i<res.length;i++){
				this.options[i]=res[i]
				this.list.push({"options":[this.options[i]]})
			}
		}
	}
</script>
<style scoped>
	/* css自定义改变滑动按钮样式 */
	.shopBox >>> .uni-swipe_button{
		border-radius: 16rpx 0 0 16rpx !important;
		background-color: rgb(255,58,49) !important;
	}
</style>
