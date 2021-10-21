<template>
	<view class="content">
		<subject :SubjectList="SubjectList" @itemClick="goDetail"></subject>
		<view class="isOver" v-if="flag">-----没有更多了-----</view>
	</view>
	
</template>

<script>
	import subject from '../../components/subject-list.vue'
	export default{
		data(){
			return{
				cateId:'',
				pageNum:1,
				flag:false,
				SubjectList:[]
			}
		},
		components:{"subject":subject},
		async onLoad() {
			this.getList()
		},
		async onReachBottom() {
			if(this.SubjectList.length<this.pageNum*4){
				this.flag=true
				return
			}
			this.pageNum++
			this.getList()
		},
		methods:{
			async getList(){
				const res=await this.$u.api.subjectList({cateId:this.cateId,pageNum:this.pageNum})
				this.SubjectList=[...this.SubjectList,...res]
			},
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
