<template>
<view>
		<food-manage 
		:list="list" 
		class="shopBox"  
		@refreshShopCar="refreshShopCar"
		></food-manage >
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return { 
				options:[],
				list: []
			}
		},
		methods:{
			refreshShopCar(e){
				this.list = e;
			}
		},
		onLoad() {
			if(!this.$u.utils.isLogin()) return
		},
		async onShow() {
			const res=await this.$u.api.getPlanFoodList()
			console.log(res)
			this.list=[]
			for(var i=0;i<res.length;i++){
				this.options[i]=res[i]
				this.list.push({"options":[this.options[i]]})
			}
		},
		computed:{},
		beforeDestroy() {},

	}
</script>

<style>
	.shopBox >>> .uni-swipe_button{
		border-radius: 16rpx 0 0 16rpx !important;
		background-color: rgb(255,58,49) !important;
	}
</style>
