<template>
<div class="mod-block" >	
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
		<el-form-item label="标题" prop="title">
			<el-input v-model="ruleForm.title"></el-input>
		</el-form-item>
		<el-form-item label="描述">
			<el-input v-model="ruleForm.description"></el-input>
		</el-form-item>
		<el-form-item label="图片">
			<el-col :span="5">
				<el-upload
				class="avatar-uploader"
				:http-request="uploadSectionFile"
				action="http://localhost:8082/api/upload"
  				:show-file-list="false">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-col>
			<el-col :span="3">
				<div class="changePic">点击图片可替换</div>
			</el-col>
		</el-form-item>
		<!-- <el-form-item label="图片" prop="picture">
			<input @change='add_img'  type="file">
        </el-form-item> -->
		<el-form-item label="文章类型" prop="type">
			<el-select v-model="ruleForm.type" placeholder="请选择博客类型">
				<el-option label="技术" value="技术"></el-option>
				<el-option label="文学" value="文学"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="是否原创">
			<el-switch v-model="ruleForm.creative"></el-switch>
		</el-form-item>
		<el-col :span="22" :offset="1">
			<custom-quill-editor v-if="isShowRichTextEditor" :defaultContent="ruleForm.content" id="pcGoodsInfoId" v-on:passTextContent="getRichTextGoodsInfo">
                            </custom-quill-editor>
		</el-col>
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
import customQuillEditor from '@/components/common/Quilleditor'
export default {
	components:{
		customQuillEditor
	},
    data() {
		return {
			id:this.$route.query.id || '',
			isShowRichTextEditor:false,
			editorOption:{},
			ruleForm: {
				title: '',
				description: '',
				type: '技术',
				creative: false,
				content: ''
			},
			imageUrl:'',
			fileParams:{
                security:true
            },
			rules: {
				title: [
					{ required: true, message: '请输入标题', trigger: 'blur' },
				],
				type: [
					{ required: true, message: '请选择博客类型', trigger: 'change' }
				]
			}
		};
	},
	methods: {
		getRichTextGoodsInfo(result){
            this.ruleForm.content=result.content;
            
		},
		
		uploadSectionFile(param){
			let self = this
			let reader = new FileReader();
			let file = param.file
			let isLt1M = file.size / 1024 < 100;
            if (!isLt1M) {
				this.$message.error('上传图片大小不能超过 100kb!');
				return isLt1M;
            }
			reader.readAsDataURL(file)
			reader.onloadend = function(){
				self.upload(reader.result)
			}
		},

		async upload(result){
			let res = await this.$ajax.post("/api/upload",{img:result})
			if(res.error==0){
				this.$message.success(res.msg)
				this.imageUrl = res.data
				//this.imageUrl = "http://116.85.25.126:8888/images/upload/1533609865180.png"
				
				console.log(this.imageUrl, " 获取图片路径") // 获取图片路径
			}
		},

		async save(){
			let params = Object.assign({
				imageUrl:this.imageUrl,
				id:this.id
			},this.ruleForm)

			let res = await this.$ajax.post("/api/save",params)
			if(res.error==0){
				this.$message.success(res.msg)
				this.$router.push({name:'我的博客'});
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
			this.$router.push({name:'我的博客', params:{}});
		}
	},
	mounted(){
		if(this.id){
			this.getInfo(this.id)
			return
		}
		this.isShowRichTextEditor = true
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