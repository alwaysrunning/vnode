<template>
	<div class="clearfix mod-hd">

		<el-col :span="24" class="mod-header">
			<el-col :span="2" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img src="../../../assets/images/conf/user-img.png" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="modifyPwd">修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出账号</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>

		</el-col>

	</div>
</template>
<script>

export default
{
	data(){
		return {
			
		}
	},
	methods: {
		modifyPwd(){
			this.$router.push({name:'找回密码'})
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
	.mod-shadow {
		position:absolute;
		top:60px;
		left:0px;
		width:100%;
		box-shadow: 0px 5px 18px rgba(0,0,0, 0.69);
		height:1px;
		overflow:hidden;
		z-index:1;
		background:#dfdfdf;
	}
	.mod-header {
		height: 60px;
		line-height: 60px;
		background: #fff;
		color: #fff;
		position:relative;
		//z-index: 3000;
		.userinfo {
			span.shopName{
				color:#999999;
				text-align:right;
				height:20px;
				vertical-align:middle;
				line-height:20px;
				display:inline-block;
				width:100%;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap
			}
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


	.permission-dailog li{
		height:30px;
		line-height:30px;
		text-align:left;
		width:50%;
		display:inline-block;
	}
</style>
<style lang="scss">
	.mod-hor-nav {
		padding-left:40px;
		.el-tabs__item{
			padding:0 12px;
		}
	}
</style>
