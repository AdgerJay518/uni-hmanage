<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录健康平台</view>
			<input class="u-border-bottom" v-model="username" placeholder="请输入账号" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: '2284233647',
			password:'123456'
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.username && this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		async submit() {
			if(!this.username || !this.password) return
			
			const params={
				username:this.username,
				password:this.password
			}
			//执行登录
			console.log(params)
			const loginRes=await this.$u.api.login(params)
			
			//缓存token
			this.$u.vuex('vuex_token',loginRes.token)
			this.$u.toast('登陆成功')
			//请求用户信息
			const userInfo=await this.$u.api.getInfo()
			const userExtendsInfo=await this.$u.api.getExtendsInfo({id:userInfo.id})
			//const healthLevel=await this.$u.api.healthLevel(userExtendsInfo)
			const healthLevel=await this.$u.api.healthLevel({height:userExtendsInfo.height,weight:userExtendsInfo.weight})
			console.log(healthLevel)
			//缓存用户信息
			this.$u.vuex('vuex_user',userInfo)
			this.$u.vuex('level',healthLevel)
			this.$u.vuex('vuex_user_extends',userExtendsInfo)
			//登陆之后，跳转到来源页
			const backUrl=uni.getStorageSync('backUrl') || 'pages/index/index'
			setTimeout(()=>{
				this.$u.route({
					type:'reLaunch',
					url: backUrl
				})
			},1500)
		}
	}
};
</script>

<style lang="scss" scoped>
	.u-border-bottom{
		margin-bottom: 40rpx !important;
	}
	
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
}
</style>
