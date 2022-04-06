<template>
	<view class="home">
		<u-swiper :list="list" name="pic" height="320"></u-swiper>
		
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="click(item.path)">
				<image :src="item.icon"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		
		<view class="recommend">
			<view class="tit">推荐专题</view>
			<subject-list :SubjectList="subjectList" @itemClick="goDetail"></subject-list>
			<view class="isOver" v-if="flag">-----没有更多了-----</view>
		</view>
	</view>
</template>
<script>
	import subjectList from '../../components/subject-list.vue'
	export default {
		components:{"subjectList":subjectList},
		data(){
			return{
				list:[],
				subjectList:[],
				flag:true,
				pageNum:1,
				navs:[
					{
						icon:'../../static/icon/huati.png',
						title:'专题',
						path:'/pages/subject/subject'
					},
					{
						icon:'../../static/icon/lianxi.png',
						title:'联系我们',
						path:'/pages/our/our'
					},
					{
						icon:'../../static/icon/daka.png',
						title:'打卡',
						path:'/pages/clock/clock'
					}
				]
			}
		},
		async onLoad(){
			const res=await this.$u.api.homeContent()
			this.list=res.advertiseList
			console.log(this.list)
			this.subjectList=res.subjectList
		},
		methods:{
			click(url){
				uni.navigateTo({
					url
				})
			},
			goDetail(id){
				this.$u.route({
					url:'/pages/subject-detail/subject-detail',
					params:{
						list: JSON.stringify(this.subjectList[id])
					}
				})
			}
		}
		
	}
</script>
<style lang="scss">
@import './index'
</style>
