<template>
	<view class="content">
		<subject :SubjectList="SubjectList" @itemClick="goDetail"></subject>
		<view class="isOver">-----没有更多了-----</view>
	</view>
	
</template>

<script>
	import subject from '../../components/subject-list.vue'
	export default{
		data(){
			return{
				cateId:'',
				SubjectList:[]
			}
		},
		components:{"subject":subject},
		async onLoad() {
			const res=await this.$u.api.subjectList({cateId:this.cateId})
			this.SubjectList=res
		},
		methods:{
			goDetail(id){
				this.$u.route({
					url:'/pages/subject-detail/subject-detail',
					params:{
						list: JSON.stringify(this.SubjectList[id])
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./subject";
</style>
