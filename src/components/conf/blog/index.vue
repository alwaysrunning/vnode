<template>
<div>
	<section class="mod-search">
		<el-row :span="24" class="mod-toolbar" :gutter="20">
			<el-col :span="4">
				<el-select v-model="searchs.type" placeholder="请选择">
					<el-option
						v-for="(item,index) in channelList"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-input v-model="searchs.title" placeholder="请输入题目"></el-input>                  
			</el-col>
			<el-col :span="2">
				<el-button @click="onSearch" type="primary">搜索</el-button>
			</el-col>
			<el-col :span="3">
				<el-button type="primary" @click="onAdd">开始写博客</el-button>
			</el-col>
			<el-col :span="3">
				<el-button type="danger" @click="onBatchDeletion">批量删除</el-button>
			</el-col>
		</el-row>
	</section>
	<section class="ui-table">
		<el-table
			ref="multipleTable"
			:data="list"
			tooltip-effect="dark"
			style="width: 100%"
			v-loading="listLoading"
			@selection-change="handleSelectionChange">
			<el-table-column width="55" type="selection"></el-table-column>
			<el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
			<el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
			<el-table-column prop="type" label="类型" show-overflow-tooltip></el-table-column>
			<el-table-column prop="time" label="发布时间" show-overflow-tooltip></el-table-column>
			<el-table-column prop="url" label="跳转链接" show-overflow-tooltip>
				<template slot-scope="scope">
					<a v-text="scope.row.url" :href="scope.row.url" target="_blank"></a>
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" min-width="120">
				<template slot-scope="scope">
					<span class="operate cursor edit" @click="onEdit(scope.row.id)">编辑</span>
					<span class="operate del cursor" @click="onDelete(scope.row.id)" >删除</span>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="mod-footer">
			<el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
					:total="total" style="float:right;" :current-page="currentPage">
			</el-pagination>
		</el-col>
	</section>
</div>
</template>

<script>
import _ from 'lodash'
export default {
	data() {
		return {
			channelList:[],
            searchs:{
				type:'',
				title:'',
			},
			list:[{
				id:1,
				title:'webpack构建方案',
				description:'webpack构建方案具体操作',
				type:'技术',
				time:'2018-12-22 12:12:12',
				url:'www.baidu.com'
			}],
			multipleSelection:[],
			listLoading:false,
			pageSize:10,
			currentPage:1,
			total:0
		};
	},
    methods: {
		onSearch(){
			this.getList()
		},
		onAdd(){
			this.$router.push('/index/add');
		},
		onEdit(id){
			this.$router.push('/index/add?id='+id);
		},
		onDelete(id){},

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
			let res = await this.$ajax.get("/api/data",params)
			this.list = res.data
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
.mod-search{
	background: #fff;
	padding: 20px
}
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
