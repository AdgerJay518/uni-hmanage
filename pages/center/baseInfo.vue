<template>
	<view class="u-p-l-40 u-p-r-40">
		<view>
			<u-form :model="form" :error-type="errorType" ref="uForm">
				<u-form-item label="昵称" prop="nickname" required>
					<u-input v-model="form.nickname" />
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
					nickname:null
				},
				rules: {
					nickname: [
						{ 
							required: true, 
							message: '请输入昵称', 
							// 可以单个或者同时写两个触发验证方式 
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
			this.form.id=this.vuex_user.id
		}
	}
</script>

<style>

</style>
