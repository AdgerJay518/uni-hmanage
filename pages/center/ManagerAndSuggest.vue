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
				var ingestion=0;
				if(res.length==0){
					this.suggest="今天还没有进行运动,也没有摄入营养哦，赶快动起来吧!"
					this.totalCalorie=0;
					this.calorie=0;
					return
				}
				this.suggest=""
				for(var i=0;i<res.length;i++){
					comsume+=res[i].totalCalorie
					ingestion+=res[i].ingestionCalorie
				}
				this.totalCalorie=comsume
				this.calorie=ingestion
				var sum=ingestion-comsume
				console.log(ingestion)
				if(ingestion==0){
					this.suggest="可不能不吃东西哦，就算要减肥，不吃东西也有害身体健康"
				}
				else if(ingestion<1500){
					this.suggest="您的每日所需热量未达标，为了保持您的身体健康，请再吃点东西吧"
				}
				else if(sum<0){
					this.suggest="保持的非常好，坚持今天的计划，很快就可以瘦下来了!!!"
				}
				else if(sum<500){
					this.suggest="良好的运动计划与饮食习惯，坚持下去可以保持您现在的身材"
				}
				else if(sum>500){
					this.suggest="适量运动可以保持身体健康哦，建议再出去活动活动吧"
				}
			},
		}
		
		}
	
</script>
<style lang="scss" scoped>
	.u-demo {
		
	}
</style>
