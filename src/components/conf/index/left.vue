<template>
 <el-menu @select="handleSelect" :default-active="activeMenu" class="mod-left" :collapse="collapsed" :unique-opened="unique" router>
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
            activeMenu:''
		}
	},

	components:{
        items
    },

	mounted(){
        this.activeMenu=this.$route.path;
    },
    
	methods: {
        handleSelect(index){
            this.activeMenu = index
        },

        activation(){  // 激活左侧导航栏
            let path = this.$route.path
            let arr = path.split('/')
            this.activeMenu = `/${arr[1]}/list`
        }
    },
    
    watch:{
        $route(){
            this.activation()
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

