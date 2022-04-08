import Vue from 'vue'
import App from './App'


Vue.filter('formatDate',(date)=>{
	const nDate=new Date(date)
	const year=nDate.getFullYear()
	const month=nDate.getMonth().toString().padStart(2,0)
	const day=nDate.getDay().toString().padStart(2,0)
	return year+'-'+month+'-'+day
})

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

//import uView2 from 'uni_modules/uview-ui'
//Vue.use(uView2);

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

//引入vuex
import store from '@/store';

// 将store放入Vue对象创建中
const app = new Vue({
	store,
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

//自定义工具
import utils from '@/common/utils.js'
Vue.use(utils, app)

app.$mount()
