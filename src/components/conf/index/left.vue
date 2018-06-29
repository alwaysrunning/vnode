<template>
 <el-menu @select="handleSelect" :default-active="acitiveMenu" class="mod-left" :collapse="collapsed" :unique-opened="unique" router>
	 <items  :model='item' v-if="!item.hidden" v-for='item in $router.options.routes' :key="item.path"></items>
</el-menu>
</template>
<script>
import items from './items.vue';
export default {
	data(){
		return {
            unique:true,
			collapsed:false,
            acitiveMenu:''
		}
	},

	components:{
        items
    },

	mounted(){
        this.acitiveMenu=this.$route.path;
    },
    
	methods: {
        handleSelect(index){
            this.acitiveMenu = index
        }
	}
}
</script>
<style scoped lang="scss">
.mod-left{
    width: 200px;
    height: 100%;
    background-color:#ffffff;
    overflow-y:auto;
    overflow-x:hidden;
    .el-menu {
        height: 100%;
    }
    .collapsed {
        width: 60px;
        .item {
            position: relative;
        }
        .submenu {
            position: absolute;
            top: 0px;
            left: 60px;
            z-index: 99999;
            height: auto;
            display: none;
        }
    }
}
.menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
}
.menu-expanded {
    flex: 0 0 180px;
    width: 180px;
}
</style>

