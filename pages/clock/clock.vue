<template>
		<view class="home">
			<ss-calendar 
			:checks="checks"
			@current-month-day="onSignIn"
			@prev-month-day
			@next-month-day>
			</ss-calendar>
			<u-popup v-model="show" mode="center" closeable border-radius="14" class='popup'>
				<view class="content">
					<view class="title">{{titlecontent}}</view>
					<view class="con">连续签到7天可增加3积分！</view>
					<view class="icon">
						<u-icon name="checkmark-circle" color="#2979ff" size="108"></u-icon>
					</view>
				</view>
			</u-popup>
			<button type="default" class="setbtncolor" @click="handleqd">立即签到</button>
		</view>
</template>

<script>
	import ssCalendar from '../../components/ss-calendar/ss-calendar.vue'
	
	export default {
		data() {
			return {
				show:false,
				checks:['1','2','3','4','5'],
				titlecontent:"签到成功"
			}
		},
		methods: {
			handleqd(){
				this.show = true
				let i = '6'
				if(this.checks.indexOf(i)!= -1){
					this.titlecontent ="今日已签到，无需重复签到"
				}else{
					this.checks.push(i)
				}
			},
			    onSignIn(payload) {
			      const { checked, year, month, day } = payload
			
			      !checked && this.checks.push(`${year}-${month}-${day}`)
			
			      console.log('onSignIn', payload)
			    }
		},
		components: {
		  ssCalendar
		}
	}
</script>

<style lang="scss">
@import './clock'
</style>
