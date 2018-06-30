<template>
<div class="mod-block" >	
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
		<el-form-item label="标题" prop="title">
			<el-input v-model="ruleForm.title"></el-input>
		</el-form-item>
		<el-form-item label="描述">
			<el-input v-model="ruleForm.description"></el-input>
		</el-form-item>
		<el-form-item label="文章类型" prop="type">
			<el-select v-model="ruleForm.type" placeholder="请选择博客类型">
				<el-option label="技术" value="1"></el-option>
				<el-option label="文学" value="2"></el-option>
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
			isShowRichTextEditor:false,
			editorOption:{},
			ruleForm: {
				title: '',
				description: '',
				type: '1',
				creative: false,
				content: ''
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
		getRichTextGoodsInfo:function(result){
            this.ruleForm.content=result.content;
            
        },

		submitForm(formName) {
			if(!this.ruleForm.content){
				this.$message.error("大爷，您还没写博客呢")
				return
			}
			this.$refs[formName].validate((valid) => {
				console.log(this.ruleForm)
			if (valid) {
				alert('submit!');
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
