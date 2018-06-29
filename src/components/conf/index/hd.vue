<template>
<div class="mod-header">
	<el-row :span="24">
		<el-col class="logo">
			<div class="logo-inner">{{sysUserName}}</div>
		</el-col>
		<el-col :span="2" class="userinfo">
			<el-dropdown trigger="hover">
				<span class="el-dropdown-link userinfo-inner">
					<img src="../../../assets/images/user-img.png" />
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="modifyPwd">修改密码</el-dropdown-item>
					<el-dropdown-item divided @click.native="logout">退出账号</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
	</el-row>
</div>
</template>
<script>

export default
{
	data(){
		return {
			sysUserName:'后台博客管理'
		}
	},
	methods: {
		modifyPwd(){
		},

		logout(){
		}

	},
	props: ['bus'],
	mounted(){

	},
	watch:{
        $route(){
            //this.activeName='/'+location.pathname.split('/')[1]
        }
    }
}
</script>
<style scoped lang="scss">
.mod-header{
	width: 100%;
	height: 60px;
	background: #fff;
	box-shadow: 0px 1px 4px rgba(0,0,0, 0.3);
	overflow: hidden;
	.logo {
		float: left;
		width:201px;
		height: 60px;
		font-size: 20px;
		border-right: 1px solid rgba(238, 241, 146, 0.3);
		padding-left:38px;
		background:url('../../../assets/images/logo_bg.png') repeat-x;
		box-shadow:5px 0px 20px #ccc;
		.logo-inner{
			padding-top: 20px;
			color: #fff;
		}
	}
	.userinfo {
		text-align: right;
		padding-right: 20px;
		float: right;
		.userinfo-inner {
			cursor: pointer;
			color: #333;
			line-height:normal;
			font-size:14px;
			img {
				width: 32px;
				height: 32px;
				border-radius: 20px;
				margin: 13px 0px 13px 10px;
				float: right;
				border:2px solid #adbec5;
			}
		}
	}
}

</style>
