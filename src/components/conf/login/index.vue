<template>
<div class="form">
	<div class="title">{{title}}</div>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
		<el-form-item label="管理员" prop="name">
			<el-input v-model.number="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">hello</el-button>
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
				password: '',
				name: ''
			},
			rules: {
				password: [
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
					this.login()
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},

		async login(){
			let params = Object.assign({},this.ruleForm)
			let res = await this.$ajax.post('/api/login', params)
			if(res.error==0){
				this.$router.push({name:'我的博客', params:{}});
			}else{
				this.$message.error(res.msg)
			}
		}
    },

	mounted(){

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
