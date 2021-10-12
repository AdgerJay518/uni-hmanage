//本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm
import app from "../../App.vue"


	// 定义全局参数,控制数据加载
	var _self, page = 1,timer = null;

	export default {
		data() {
			return {
				list:[],
				totalCalorie:'',
				totalTime:'',
				hour:'',
				minute:'',
				loadingText: '',
				page:0,//当前分页页码
				//apiUrl:'https://www.ymznkf.com/wx_server',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage 
				ids:[],
				del_id:''//方便存在本地的locakStorage  
			}
		},
		components:{

		},
		mounted(){
			var a = document.getElementsByClassName('uni-page-head-hd')[0]
			a.style.display = 'none';
		},
		onLoad(options) {
			if(this.list=null&&options.list==null) return
			else if(options.list!=null){
				const item = JSON.parse(options.list);
				this.list=item
				//console.log(item)
				this.totalCalorie=options.totalCalorie
				this.totalTime=options.totalTime
				this.hour=parseInt(this.totalTime)
				this.minute=60*(this.totalTime-parseInt(this.totalTime))
				this.ids=[]
				for(var i=0;i<item.length;i++){
					//this.id=item[i].options[0].id
					this.ids.push(item[i].options[0].id)
				}
			}
			
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
		methods: {
			back(){
				uni.navigateBack()
			},
			/**
			* waiting_for_restaurant_order_3_3处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			waiting_for_restaurant_order_3_3_click:function(event){
			
			},
			
			/**
			* waiting_for_restaurant_order_6_6处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			waiting_for_restaurant_order_6_6_click:async function(event){
				//console.log(this.list)
				const params={
					planIds:this.ids,
					totalCalorie:this.totalCalorie,
					totalTime:this.totalTime
				}
				await this.$u.api.generateOrder(params)
				this.$u.route({
					url:'pages/center/planHistory/planHistory'
				})
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
