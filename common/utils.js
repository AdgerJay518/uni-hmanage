const install = (Vue , vm)=>{
	/**
	 * 是否登录
	 */
	const isLogin=()=>{
		const token=vm.vuex_token
		if(!token){
			//来自哪个页面
			const currentPage=getCurrentPages().pop()
			uni.setStorageSync('backUrl',currentPage.route)
			
			vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					type:'redirect',
					url: 'pages/auth/login'
				})
			}, 1500)
			return false
		}
		return true
	}
	
	/**
	 * 更新用户信息
	 */
	const updateUser= async()=>{
		//请求用户信息
		const userInfo=await vm.$u.api.getInfo()
		//缓存用户信息
		vm.$u.vuex('vuex_user',userInfo)
	}
	
	vm.$u.utils={
		isLogin	,
		updateUser
	}
}

export default{
	install
}