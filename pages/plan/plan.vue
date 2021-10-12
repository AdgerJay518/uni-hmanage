<template>
	<view>
		<bbh-shopcar 
		:list="list" 
		class="shopBox"  
		@refreshShopCar="refreshShopCar"
		></bbh-shopcar>
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
		// async onLoad(){
		// 	//this.refreshShopCar()
		// 	const res=await this.$u.api.getPlanList()
		// 	for(var i=0;i<res.length;i++){
		// 		this.options[i]=res[i]
		// 		this.list.push({"options":[this.options[i]]})
		// 	}
		// },
		async onShow() {
			if(!this.getUpdatePlan) return false
			const res=await this.$u.api.getPlanList()
			this.list=[]
			for(var i=0;i<res.length;i++){
				this.options[i]=res[i]
				this.list.push({"options":[this.options[i]]})
			}
			this.$store.commit('plan/setUpdatePlan', false)
		},
		computed:{
			...mapGetters('plan',['getUpdatePlan'])
		},
		// loadData(){
		// 	this.$store.commit('plan/setUpdatePlan', false)
		// },
		beforeDestroy() {
			this.$store.commit('plan/setUpdatePlan', true)
		},

	}
</script>
<style scoped>
	/* css自定义改变滑动按钮样式 */
	.shopBox >>> .uni-swipe_button{
		border-radius: 16rpx 0 0 16rpx !important;
		background-color: rgb(255,58,49) !important;
	}
</style>
