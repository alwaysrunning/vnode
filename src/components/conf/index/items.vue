<template>
	<div class="memu-item">
		<template v-if="nonChildren">
			<el-menu-item :index="path" :key="model.path">
				<i :class="model.iconCls"></i>
				{{ model.name }}
			</el-menu-item>
		</template>
		<template v-else>
			<el-submenu :index="path" >
				<template slot="title">
					<i :class="model.iconCls"></i>
					<span >{{ model.name }}</span>
				</template>
				<items v-if="model.children&&!child.hidden" v-for='child in model.children' :model='child' :key="child.path" :parentItem="model"></items>
			</el-submenu>
		</template>
	 </div>
 </template>
<script type="text/javascript">
	import Vue from 'vue'
    export default {
        name: 'items',
        props: ['model', 'parentItem'],
        data() {
            return {
            }
        },
        computed: {
			nonChildren(){
				let item = this.model;
				let children=item.children;
				if(!children){
					return true
				}
				let count=0;
				if(children.length>0){
					children.forEach(function(value,index){
						if(!value.hidden||value.hidden==false){
							count++;
						}
					})
				}
				if(count>0){
					return false
				}else{
					return true;
				}
			},
			path(){
				let item = this.model;
				let parentItem = this.parentItem;
				let lastPath = item.path
				if(!item.children && parentItem){
					lastPath = parentItem.path+'/'+item.path
				}
				return lastPath;
			}
        }
    }
</script>
<style>
.el-menu-item{
	background-color:#ffffff;
}

.el-submenu__icon-arrow{
	margin-top: -5px
}
</style>
