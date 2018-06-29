<template>
<div class="mod-block">	
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
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			<el-button @click="resetForm()">取消</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
export default {
    data() {
		return {
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
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
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
	.ruleForm{
		width: 500px
	}
}
</style>
