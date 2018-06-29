<template>
<div class="form">
	<div class="title">{{title}}</div>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
		<el-form-item label="年龄" prop="name">
			<el-input v-model.number="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="pass">
			<el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
export default {
	data() {
		var checkName = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('用户名不能为空'));
			}
			callback()
		};
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			}
			callback()
		};
		return {
			title:'博客后台管理系统',
			ruleForm: {
				pass: '',
				name: ''
			},
			rules: {
				pass: [
					{ validator: validatePass, trigger: 'blur' }
				],
				name: [
					{ validator: checkName, trigger: 'blur' }
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
		async getList(){
			let res = await this.$ajax.get('/api/data')
			console.log(res)
			console.log(111)
		}
    },

	mounted(){
		this.getList()
	}
}
</script>


<style lang="scss" scoped>
.form{
	position: fixed; 
	top: 0; 
	left: 0; 
	bottom: 0; 
	right: 0;
	background: #65daff url("../../../assets/images/body-bg.png") repeat fixed top;
	.title{
		width: 100%;
		text-align: center;
		font-size: 40px;
		color: #fff;
		padding: 100px 0 0 0;
	}
	.ruleForm{
		position: absolute;
		background-color: #fff;
		border-radius: 5px;
		padding: 40px 50px 0 0;
		box-sizing: border-box;
		top:50%;
		left:50%;
		width:500px;
		height: 230px;
		transform:translate(-50%,-50%);
		text-align: center;
		
	}
}

</style>
