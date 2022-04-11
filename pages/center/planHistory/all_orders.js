import app from "../../../App.vue"


	// 定义全局参数,控制数据加载
	var _self, page = 1,timer = null;

	export default {
		filters:{
			formateDate(date){
				const nDate=new Date(date)
				const year=nDate.getFullYear()
				const month=nDate.getMonth()+1
				const months=month.INT+1
				const day=nDate.getDate().toString().padStart(2,0)
				return year+'年'+'-'+month+'月'+'-'+day+'日'
			}
		},
		data() {
			return {
				flag:false,
				pageNum:1,
				loadingText: '',
				list_orders: [],
				page:1,//当前分页页码
				apiUrl:'',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage  
				del_id:'',//方便存在本地的locakStorage  
				current: 0,
				swiperCurrent: 0,
				list: [
					{
						name: '运动'
					},
					{
						name: '饮食'
					}
				],
			}
		},
		components:{

		},
		async onLoad(options) {
			this.getOrderList();
			
			_self = this;
			
			//检查是否登录参考代码,需要用的时候，可以把注释取掉
			//if(this.checkLogin()==false){
			//	return;
			//}
			
			//this.getLaction();//得到gps

			this.page=0;

			//检测有没有传入id参数
			if (options.id != null && options.id !=""){
				this.id=options.id;
			}   
			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");

		},
		onShow() {
			//if(this.checkLogin()==false){
			//	return;
			//}

			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.Refresh();
		},
		async onReachBottom() {
			if(this.list_orders.length<this.pageNum*10){
				this.flag=true
				return
			}
			this.pageNum++
			this.getOrderList()
		},
		methods: {
			reachBottom() {
				// 此tab为空数据
				/* if(this.current != 2) {
					this.loadStatus.splice(this.current,1,"loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				} */
			},
			change(index) {
				this.swiperCurrent = index;
				if(index==0){
					this.getOrderList(),
					console.log("11111")
				}
				if(index==1){
					console.log("22222")
				}
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			
			async getOrderList(){
				const res=await this.$u.api.getOrderList({status:1,pageNum:this.pageNum})
				this.list_orders=[...this.list_orders,...res.list]
				console.log(this.list_orders)
			},
			toDetail(index){
				this.$u.route({
					url:'pages/prescription_label/prescription_label',
					params:{
						list: JSON.stringify(this.list_orders[index])
					}
				})
			},
			/**
			* all_orders_6_6处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			all_orders_6_6_click:function(event){
			
			},
			
			/**
			* all_orders_8_8处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			all_orders_8_8_click:function(event){
			
			},
			
			/**
			* all_orders_10_10处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			all_orders_10_10_click:function(event){
			
			},
			
			/**
			* all_orders_12_12处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			all_orders_12_12_click:function(event){
			
			},
			
			

			//刷新数据
			Refresh:function(_action) {
			
				uni.showLoading();
				
				//提交到服务器
				var that = this
				var url=that.apiUrl+'{server_code_file_path}';
				console.log(url);
				uni.request({
				url: url,//后端接口地址，需要改成自己的接口地址
				data: {
					action: _action,//上传动作，如按钮点击会产生click动作，分页也会产生，在后端根据具体的动作来判断事件
					uid: that.getUid(),//上传用户id,在登录中获得
					//上传页面中的变量
					//定义变量---start
					
					//定义变量---end
					id: that.id,//上传id值，后端可以根据此值来操作当前id
					del_id: that.del_id,//在列表中删除按钮选中时，上传到有后端，进行删除操作
					page:that.page
				},
				method: 'GET',
				success: function (res) {//后端返回数据

					// 隐藏导航栏加载框  
					uni.hideNavigationBarLoading();
					// 停止下拉动作  
					uni.stopPullDownRefresh();  

					// 隐藏加载框  
					uni.hideLoading();  

					var tmp = res.data;

					//初始化，对页面上的控件进行赋值操作
					if(_action=="init"){

					}

{deal_listpages}

					that.address_from=tmp.address_from;
					that.address_to=tmp.address_to;
					that.orderNo=tmp.orderNo;
					


					//如果后端有返回消息，则弹出消息提示
					if (tmp.message != null && tmp.message != "") {
						uni.showToast({
						title: tmp.message,
						icon: 'none',
						duration: 2000
						})
					}



					//如果后端有返回页码，则更改当前页码
					if(tmp.page!=null && tmp.page!=""){
						page=tmp.page;
					}					

				},
				fail: function (res) {
					uni.showToast({
						title: "服务器访问失败",
						icon: 'none',
						duration: 2000
					})
					console.log(res.data);
					console.log('is failed')
				}
				})
			},
		}
	}
