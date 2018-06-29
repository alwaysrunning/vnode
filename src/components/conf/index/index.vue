<template>
    <el-row class="mod-index">
		<hd :bus="bus"></hd>
        <el-col :span="24" class="index-bd">
			<left :bus="bus"></left>
			<el-col :span="24">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</el-col>
        </el-col>
    </el-row>
</template>
<script>
import hd from './hd.vue'
import left from './left.vue'
import Vue from 'vue'
let bus = new Vue();
export default
{
	data(){
		return {
			bus
		}
	},
	components:{
		hd,left
	}
}
</script>
<style scope="scope" lang="scss">
.mod-index{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	.index-bd{
		width: 100%;
		height: 100%;
	}
}
.fade-enter-active, .fade-leave-active {
	transition: opacity .15s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>

