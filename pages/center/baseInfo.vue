<template>
	<view class="u-p-l-40 u-p-r-40">
		<view>
			<u-form :model="form" :error-type="errorType" ref="uForm">
				<u-form-item label="昵称" prop="nickname" required>
					：<u-input v-model="form.nickname" />
				</u-form-item>
				<u-form-item label="手机号" prop="phone" required>
					：<u-input v-model="form.phone" />
				</u-form-item>
				<u-form-item label="身高" prop="height" required>
					：<u-input v-model="other.height" />cm
				</u-form-item>
				<u-form-item label="体重" prop="weight" required>
					：<u-input v-model="other.weight" />kg
				</u-form-item>
			</u-form>
			<u-button @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				errorType:[''],
				form:{
					id:'',
					username:null,
					password:null,
					nickname:null,
					phone:null
				},
				other:{
					memberId:null,
					height:null,
					weight:null
				},
				rules: {
					nickname: [
						{ 
							required: true, 
							message: '请输入昵称', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
                    phone: [
						{ 
							required: true, 
							message: '请输入手机号', 
							trigger: ['change','blur'],
						}
					]
				}
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(async(valid) => {
					if (valid) {
						await this.$u.api.update(this.form)
						await this.$u.api.updateExtends(this.other)
						this.$u.utils.updateUser()
						this.$u.toast('更新成功')
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.form.nickname=this.vuex_user.nickname
			this.form.phone=this.vuex_user.phone
			this.form.id=this.vuex_user.id
			this.other.memberId=this.vuex_user_extends.memberId
			this.other.weight=this.vuex_user_extends.weight
			this.other.height=this.vuex_user_extends.height
		}
	}
</script>

<style>

</style>
