<template>
	<u-upload 
	ref="upload"
	:action="action" 
	:max-size="5 * 1024 * 1024" 
	max-count="1"
	:before-upload="beforeUpload"
	:custom-btn="true"
	:show-progress="false"
	:form-data="formData"
	:multiple="false"
	:deletable="false"
	:show-upload-list="true"
	width="0"
	height="0"
	@on-success="onSuccess"
	>
	
	<u-avatar slot="addBtn" :src="vuex_user.icon" size="140"></u-avatar>
	
	</u-upload>
</template>

<script>
	let _this={}
	export default {
		name:"oss-upload",
		props:['id'],
		data() {
			return {
				action: 'http://adger-oss.oss-cn-beijing.aliyuncs.com',
				formData:{
					        policy: '',
					        signature: '',
					        key: '',
					        ossaccessKeyId: '',
					        dir: '',
					        host: '',
				},
				fileName:''
			};
		},
		created(){
			_this=this
		},
		methods:{
			/**
			 * 上传前的钩子
			 * 注意：在小程序中，this可能会丢失
			 */
			async beforeUpload(index, list) {
				const {file}=list[0]
				const fileName=file.name
				
				_this.fileName=fileName
				
				//请求API，获取oss token
				const ossToken=await _this.$u.api.ossToken()
				
				
				//额外的上传参数
				_this.formData={
					'key':ossToken.dir+'/${filename}',//上传后的文件名
					'policy':ossToken.policy,
					'ossaccessKeyId':ossToken.accessKeyId,
					'signature':ossToken.signature,
					'dir':ossToken.dir,
					'host':ossToken.host
				}
				return true;
			},
			 async onSuccess(){
				 this.$refs.upload.remove(0)
				 
				 let url=_this.formData.host+ '/' +_this.formData.dir+ '/'+this.fileName
				 console.log(url)
				await this.$u.api.update({id:this.id,icon:url})
				this.$u.utils.updateUser()
				this.$u.toast('更新成功')
			}
		}
	}
</script>

<style>

</style>
