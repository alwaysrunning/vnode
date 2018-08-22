<template>
<div>
	<section class="mod-search">
		<el-row :span="24" class="mod-toolbar" :gutter="20">
			<el-col :span="3">
				<el-button type="primary" @click="onAdd">添加分类类型</el-button>
			</el-col>
		</el-row>
	</section>
	<section class="ui-table">
		<el-table
			ref="multipleTable"
			:data="list"
			tooltip-effect="dark"
			style="width: 40%"
			v-loading="listLoading"
			@selection-change="handleSelectionChange">
			<el-table-column width="55" type="selection"></el-table-column>
			<el-table-column prop="type_name" label="文章类型" show-overflow-tooltip></el-table-column>
			<el-table-column label="操作" fixed="right" min-width="120">
				<template slot-scope="scope">
					<span class="operate cursor edit" @click="onEdit(scope.row.type_id)">编辑</span>
					<span class="operate del cursor" @click="onDelete(scope.row.type_id)" >删除</span>
				</template>
			</el-table-column>
		</el-table>
	</section>
</div>
</template>

<script>
import _ from 'lodash'
export default {
	data() {
		return {
			list:[{
				id:1,
				type:'技术',

			}],
			multipleSelection:[],
			listLoading:false,
		};
	},
    methods: {
		onAdd(){
			this.$router.push('/classify/add');
		},
		onEdit(id){
			this.$router.push('/classify/add?id='+id);
		},

		async onDelete(id){
			let res = await this.$ajax.post("/api/delete",{id:id})
			if(res.error==0){
				this.$message.success(res.msg)
				this.getList()
			}
		},

		onBatchDeletion(){
			if(this.multipleSelection.length==0){
				this.$message.error('请至少选择一篇博客')
			}
		},

		handleSelectionChange(val) {
			this.multipleSelection = val;
		},

		async getList(val){
			let params = Object.assign({},{
				pageSize: this.pageSize,
				currentPage:val||this.currentPage
			},this.searchs)
			let res = await this.$ajax.get("/api/list",params)
			this.list = res.data
			this.pageSize = res.pageSize
			this.currentPage = res.currentPage
			this.total = res.total
		},

		handleCurrentChange: _.debounce(function(v){
            this.currentPage = v
			this.getList(v)
        },200),
    },

	mounted(){
		this.getList()
	}
}
</script>


<style lang="scss" scoped>
.ui-table{
	margin-top:20px;
	.mod-footer{
		width: 100%;
		background: #fff;
		padding: 10px;
		margin-top: 20px
	}
}
.operate {
    color: #409EFF;
    margin-right: 20px;
    &.release {
        color: #33bbab;
    }
    &.del {
        color: #f57575;
    }
    &.edit{
        color: #30b9a5;
    }
}
.cursor {
    cursor: pointer;
}
</style>
