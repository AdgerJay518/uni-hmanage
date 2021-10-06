<template>
	<view class="detail">
		<view v-if="message == null">
			暂无数据
		</view>
		<view class="show" v-if="message != null">
			<view>
				<u-image width="100%" height="500rpx" 
				:src="message.pic"
				mode="widthFix"
				></u-image>
			</view>
			<view class="box1">
				<view class="price">
					<text>卡路里：{{message.calorie}}</text>
					<text>{{message.unit}}</text>
				</view>
				<view class="name">
					{{message.name}}
				</view>
			</view>
			<view class="line"></view>
			<view class="box2">
				<view>运动号：{{message.sportSn}}</view>
			</view>
			<view class="line"></view>
			<view class="box3">
				<view class="tit">{{message.keywords}}</view>
				<view class="content">
					<rich-text :nodes="message.description"></rich-text>
				</view>
			</view>
			<view class="nav">
				<uni-goods-nav 
				:fill="true"  
				:options="options" 
				:buttonGroup="buttonGroup"  
				@click="onClick" 
				@buttonClick="buttonClick" 
				:list="message"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {uniGoodsNav},
		data() {
			return {
				id:0,
				message:[],
				list:[],
				        options: [{
				            icon: 'star',
				            text: '收藏'
				        }, {
				            icon: 'list',
				            text: '计划列表',
				            info: 0
				        }],
				        buttonGroup: [{
				          text: '加入计划',
				          backgroundColor: '#ff0000',
				          color: '#fff'
				        }
				        ]
			}
		},
		methods: {
			async getDetail(){
				const res=await this.$u.api.getDetail(this.id)
				this.message=res.sport
				console.log(res.sport)
			},
			      onClick (e) {
			        this.$u.route({
						type:'switchTab',
						url:'pages/plan/plan'
					})
			      },
			      buttonClick (e) {
			        console.log(e)
			        this.options[1].info++
			      }
		},
		onLoad(option) {
			this.id=option.id
			this.getDetail()
		}
	}
</script>

<style lang="scss">
	@import './sf-detail'
</style>
