<template>
    <el-row class="mod-index">
		<!-- <hd :bus="bus"></hd> -->
        <el-col :span="24" class="index-bd">
			<!-- <left :bus="bus"></left> -->
			<el-col :span="24">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</el-col>
			<!-- <ft></ft> -->
        </el-col>
    </el-row>
</template>
<script>
// import hd from './hd.vue'
// import ft from './ft.vue'
// import left from './left.vue'
// import Vue from 'vue'
// var bus = new Vue();
export default
{
	data(){
		return {
			//bus
		}
	}
}
</script>
<style scope="scope" lang="scss">
	.fade-enter-active, .fade-leave-active {
		transition: opacity .15s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>

