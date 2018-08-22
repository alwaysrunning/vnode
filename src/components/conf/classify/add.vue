<template>
<div class="mod-block" >	
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
		<el-form-item label="博客分类" prop="type">
			<el-input v-model="ruleForm.type_name"></el-input>
		</el-form-item>
		<el-col :span="18" style="margin-top:20px" >
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm()">取消</el-button>
			</el-form-item>
		</el-col>
	</el-form>
</div>
</template>

<script>
import {url} from '@/config'
import customQuillEditor from '@/components/common/Quilleditor'
export default {
	components:{
		customQuillEditor
	},
	computed:{
		uploadImg: function(){
			return url + '/api/upload'
		}
	},
    data() {
		return {
			id:this.$route.query.id || '',
			isShowRichTextEditor:false,
			editorOption:{},
			ruleForm: {
				type_name: ''
			},
			rules: {
				type: [
					{ required: true, message: '请选择博客类型', trigger: 'change' }
				]
			}
		};
	},
	methods: {
		async save(){
			let params = Object.assign({
				imageUrl:this.imageUrl,
				id:this.id
			},this.ruleForm)

			let res = await this.$ajax.post("/api/save",params)
			if(res.error==0){
				this.$message.success(res.msg)
				this.$router.push({name:'分类列表'});
			}
		},
		
		async getInfo(id){
			let params = Object.assign({},{id:id})
			let res = await this.$ajax.get("/api/getInfo",params)
			if(res.error==0){
				this.isShowRichTextEditor = true
				this.ruleForm = res.data
				this.imageUrl = res.data.pic
				if(this.ruleForm.creative == 1){
					this.ruleForm.creative = true
				}else{
					this.ruleForm.creative = false
				}
			}
		},

		submitForm(formName) {
			if(!this.ruleForm.content){
				this.$message.error("大爷，您还没写博客呢")
				return
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.save()
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm() {
			this.$router.push({name:'分类列表', params:{}});
		}
	},
	mounted(){
		if(this.id){
			this.getInfo(this.id)
			return
		}
	}
}
</script>


<style lang="scss" scoped>
.mod-block{
    width: 100%;
    background: #fff;
    padding:20px 0;
    box-sizing: border-box;
	border-radius: 5px;
	overflow: hidden;
	.ruleForm{
		width: 100%
	}
	.el-input{
		width: 500px
	}
	.el-input__inner{
		width: 217px
	}
}
</style>
<style lang="scss">
.avatar-uploader{
	.el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 178px;
		height: 178px;
		img{
			display:block;
			width:100%;
			height:100%;
			border:none;
		}
	}
	.el-upload:hover {
		border-color: #409EFF;
	}
} 

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px!important;
    text-align: center;
}
</style>