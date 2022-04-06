<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item  class="swipeItem" v-for="(obj,index) in list" :options="obj.options" :key="obj.options[0].id" v-if="obj.options[0].deleteStatus==0" @click="swipeClick($event,index)">
				<!-- 自定义布局根据自己的设计稿来 -->
				<view class="contBox">
					<view class="circleBox" @click.stop="inp(obj.options[0].id)">
						<image src="../../static/bbh-shopcar/icon/circleCachee.png"  class="circle"  v-if="!obj.options[0].check"></image>
						<image src="../../static/bbh-shopcar/icon/circleCacheef.png" class="circle"  v-if="obj.options[0].check"></image>
					</view>
					<view class="goodBox">
						<view>{{obj.options[0].sfName}}-<text>{{obj.options[0].calorie}}</text>（卡/半小时）</view>
						<view class="countBox">
							<view class="sign" @click="signCount(obj.options[0].id)">
								<image src="/static/bbh-shopcar/icon/signf.png"  v-if="obj.options[0].quantity>1"></image>
								<image src="/static/bbh-shopcar/icon/signe.png"  v-if="obj.options[0].quantity==1"></image>
							</view>
							<view class="count">{{obj.options[0].quantity}}</view>
							<view class="add" @click="addCount(obj.options[0].id)">
								<image src="/static/bbh-shopcar/icon/addf.png"   v-if="obj.options[0].quantity<5"></image>
								<image src="/static/bbh-shopcar/icon/adde.png"   v-if="obj.options[0].quantity==5"></image>
							</view>
						</view>
					</view>
				</view>
				<!-- 自定义布局结束-->
			</uni-swipe-action-item>
		</uni-swipe-action>	
		<!-- 底部结算模块 -->
		<view class="allBox">
			<view>
				<view @click="all()">
					<image src="/static/bbh-shopcar/icon/circleCacheef.png"  v-if="flag"></image>
					<image src="/static/bbh-shopcar/icon/circleCachee.png"   v-if="!flag"></image>
					<text>全选</text>
				</view>
				<text class="total">{{money}}卡-{{time}}小时</text>
			</view>
			<view @click="goPay()">开始</view>
		</view>
	</view>
</template>
<script>
	// hbuilderX新版本不需要引入组件uni-swipe-action，很方便
	export default {
		props: {
			list : Array
		},
		data(){
			return { 
				check : 0,
				flag  : false,				//判断是否全选
				money : 0,					//总金额
				num   : 0, 					//删除数据后，用来判断是否全选
				time  : 0,
				half  : 0.5
			}
		},
		methods:{
			swipeClick(e, index) {
				this.removeM(e.content.id);
			},
			all(index) { //全选
				this.flag = !this.flag;
				if (this.flag) {
					for (var i = 0; i < this.list.length; i++) {
						this.list[i].options[0].check = true;
					}
					this.num = this.list.length;
					this.total();
				} else {
					for (var i = 0; i < this.list.length; i++) {
						this.list[i].options[0].check = false;
					}
					this.num = 0;
					this.money = 0;
					this.time=0;
				}
				this.$emit('refreshShopCar',this.list);
			},
			async signCount(id) { //减少商品
				for (var i = 0; i < this.list.length; i++) {
					var obj = this.list[i].options[0];
					if (obj.id == id) {
						if (obj.quantity > 1) {
							obj.quantity--;
							const params={
								id:obj.id,
								quantity:obj.quantity
							}
							await this.$u.api.getQuantity(params)
							this.$emit('refreshShopCar',this.list);
						}
						break;
					}
				}
				this.total();
			},
			async addCount(id) { //增加商品
				for (var i = 0; i < this.list.length; i++) {
					var obj = this.list[i].options[0];
					if (obj.id == id) {
						if (obj.quantity < 5) {
							obj.quantity++;
							const params={
								id:obj.id,
								quantity:obj.quantity
							}
							await this.$u.api.getQuantity(params)
							this.$emit('refreshShopCar',this.list);
						} else {
							uni.showToast({
								title: "请适量锻炼!"
							});
						}
						break;
					}
				}
				this.total();
			},
			inp(index) { //商品选择
				for (var i = 0; i < this.list.length; i++) {
					var obj = this.list[i].options[0];
					if (obj.id == index) {
						obj.check = !obj.check;
						if (obj.check == false) {	  		 //如果有条数据没选择，就取消全选
							this.flag = false;
							this.num -= 1;
							this.money -= obj.calorie * obj.quantity;
							this.time-= obj.quantity * this.half
						} else {
							this.num += 1;
							this.money += obj.calorie * obj.quantity;
							this.time+= obj.quantity * this.half
							if (this.num == this.list.length) {		//如果全部选中了
								this.flag = true;
							}
						}
					}
				}
				this.$emit('refreshShopCar',this.list);
			},
			removeM(id) { //商品删除
				var _this = this;
				for(var i = 0; i < this.list.length; i++) {
					var obj = this.list[i].options[0];
					if (obj.id == id) {
						uni.showModal({
							title: '',
							content: '确定删除吗',
							confirmText: '确定',
							success: async function(res) {
								const params={
									id:obj.id
								}
								await _this.$u.api.deletePlan(params)
								if (res.confirm) {
									_this.list.splice(i, 1);
									_this.$emit('refreshShopCar',_this.list);
									if (obj.check) {			//如果选中状态下删除
										_this.num--;
										_this.total();
									}
									if (_this.num == 0) {		//删除后还需要判断下当前的num是否跟当前的数据长度相同，是否显示全选
										_this.flag = false;
									} else {
										if (_this.num == _this.list.length) {
											_this.flag = true;
										}
									}
								}
							}
						});
						break;
					}
				}
			},
			total() { //计算总价---只计算选中的；
				this.money = 0;
				this.time=0;
				for (var i = 0; i < this.list.length; i++) {
					if (this.list[i].options[0].check == true) {
						this.money += this.list[i].options[0].calorie * this.list[i].options[0].quantity;
						this.time +=this.list[i].options[0].quantity * this.half
					}
				}
			},
			goPay() { //去结算
				const arry = this.list.filter(function(item) { //结算过选中的数据，arry这个数组就是最后你要提交的数据
					return item.options[0].check === true;
				})
				if (arry.length == 0) {
					uni.showToast({
						title: "您还没有选中要结算的商品",
						icon: "none"
					});
					return
				}
				this.$u.route({
					url:'pages/waiting_for_restaurant_order/waiting_for_restaurant_order',
					params:{
						list: JSON.stringify(arry),
						totalCalorie:this.money,
						totalTime:this.time
					}
				})
			}
		}
	}
</script>
<style>
	/* 自定义购物车内容模块的布局样式，自己根据设计稿来 */
	.swipeItem{
		margin-top: 40rpx;
		border: 1rpx solid white;
	}
	.contBox{
		width: 100%;
		height: 160rpx;
		position: relative;
		z-index: 1;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		border-radius:16rpx;
	}
	.circleBox{
		width:88rpx;
		height: 100%;
		display: flex;
		align-items: center;
		position: absolute;
		top: 0rpx;
		left: 80rpx;
		z-index: 2;
	}
	.circle{
		width: 48rpx;
		height:48rpx;
	} 
	.goodBox{
		width: 670rpx;
		height: 160rpx;
		padding-left: 112rpx;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #f5f5f5;
		margin: 0 auto;
		border-radius: 16rpx;
	}
	/* 加减模块 */
	.countBox{
		width:200rpx;
		height:80rpx;
		display: flex;
		align-items: center;
		margin-right: 32rpx;
	}
	.countBox image{
		width: 48rpx;
		height: 48rpx;
	}
	.sign,.add{
		width: 80rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.count{
		width:40px;
		text-align: center;
		font-size: 28rpx;
	}
	/* 底部样式 */
	.allBox {
		width: 100%;
		height: 98upx;
		position: fixed;
		bottom: 98upx;
		left: 0upx;
		display: flex;
		z-index: 1001;
		border: 1rpx solid #e0e0e0;
	}
	.allBox image {
		width: 44upx;
		height: 44upx;
		margin-right:12upx;
		vertical-align: middle;
		margin-top: -8upx;
	}
	.allBox>view:nth-of-type(1) {
		flex-grow: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		font-weight: 300;
		color: rgba(20, 23, 30, 1);
		padding: 0upx 46upx 0upx 42upx;
		background: white;
	}
	.allBox>view:nth-of-type(2) {
		width: 260upx;
		height: 100%;
		line-height: 98upx;
		text-align: center;
		color: white;
		font-size: 32upx;
		font-weight: bold;
		background: #CC3347;
	}
	.total {
		font-weight: bold !important;
		color: #cc3374 !important;
	}
	/* 购物车内容结束 */
</style>
