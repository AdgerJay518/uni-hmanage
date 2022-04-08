<template>
	<view class="u-p-l-40 u-p-r-40">
		<view>
			<u-form :model="form"  ref="uForm">
				<u-form-item label="日期" prop="">
					：
					<view class="u-demo-area">
						<u-calendar v-model="show" ref="calendar" @change="change" :mode="mode"
							:start-text="startText" :end-text="endText" :range-color="rangeColor"
							:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
						>
						</u-calendar>
						<u-subsection :current="showBtnStatus" :list="['请选择日期']" @change="showChange"></u-subsection>
						<text>{{result}}</text>
					</view>
				</u-form-item>
				<u-form-item label="消耗" prop="">
					：<text>{{totalCalorie}}卡</text>
				</u-form-item>
				<u-form-item label="摄取" prop="">
					：<text>{{calorie}}卡</text>
				</u-form-item>
				<u-form-item label="建议" prop="">
					：<text style="color: #CC3347;">{{suggest}}</text>
				</u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				show: false,
				mode: 'date',
				result: "",
				totalCalorie:"",
				calorie:"",
				suggest:"",
				startText: '开始',
				endText: '结束',
				rangeColor: '#2979ff',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#2979ff',
				btnType: 'primary',
				form:{
					id:'',
					username:null,
					password:null,
					nickname:null,
					phone:null
				},
			}
		},
		computed: {
			showBtnStatus() {
				return this.show ? 0 : 1;
			}
		},
		methods: {
			showChange(index) {
				this.show = !index;
			},
			customChange(index) {
				if(index == 0) {
					this.icon1 = 'map';
					this.icon2 = 'photo';
					this.arrow = true;
				} else {
					this.icon1 = '';
					this.icon2 = '';
					this.arrow = false;
				}
			},
			textareaChange(index) {
				this.type = index == 0 ? 'textarea' : 'text';
			},
			change(e) {
				if (this.mode == 'range') {
					this.result = e.startDate + " - " + e.endDate;
				} else {
					this.result = e.result;
				}
				console.log(this.result)
				//const res=await this.$u.api.manage({date:this.result})
				this.manage(this.result)
			},
			async manage(date){
				const res=await this.$u.api.manage({date:date}).catch((e) => {console.log(e)})
				var comsume=0;
				if(res.length==0){
					this.suggest="今天还没有进行运动,也没有摄入营养哦，赶快动起来吧!"
					this.totalCalorie=0;
					this.calorie=0;
					return
				}
				this.suggest=""
				for(var i=0;i<res.length;i++){
					comsume+=res[i].totalCalorie
				}
				this.totalCalorie=comsume
			},
		}
		
		}
	
</script>
<style lang="scss" scoped>
	.u-demo {
		
	}
</style>
