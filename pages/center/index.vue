<template>
	<view>
		<view class="u-flex user-box u-p-t-30 u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 avatar-body">
				
				<oss-upload :id="id"></oss-upload>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.nickname}}</view>
				<view class="u-font-14 u-tips-color">手机号:{{vuex_user.phone}}</view>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="个人信息" @click="toBaseInfo"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="order" title="历史计划" @click="toPlanHistory"></u-cell-item>
				<u-cell-item icon="hourglass" title="正在进行" @click="toWaiting"></u-cell-item>
				<u-cell-item icon="photo" title="相册"></u-cell-item>
				<u-cell-item icon="coupon" title="卡券"></u-cell-item>
				<u-cell-item icon="heart" title="关注"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="reload" title="退出登录" @click="logOut"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				pic:'https://uviewui.com/common/logo.png',
				show:true
			}
		},
		onLoad() {
			if(!this.$u.utils.isLogin()) return
			this.id=this.vuex_user.id
		},
		methods: {
			toBaseInfo(){
				this.$u.route({
					url:'pages/center/baseInfo'
				})
			},
			toPlanHistory(){
				this.$u.route({
					url:'pages/center/planHistory/planHistory'
				})
			},
			toWaiting(){
				this.$u.route({
					url:'pages/waiting_for_restaurant_order/waiting_for_restaurant_order'
				})
			},
			async logOut(){
				await this.$u.api.logout()
				
				this.$u.toast('退出成功')
				
				setTimeout(()=>{
					//清除token和用户信息缓存
					this.$u.vuex('vuex_token',null)
					this.$u.vuex('vuex_user',{})
					
					this.$u.route({
						type:'reLaunch',
						url:'pages/index/index'
					})
				},1500)
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
.avatar-body{
	height: 70px;
	width: 70px;
}
</style>