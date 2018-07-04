<template>
    <el-row class="mod-index">
		<hd :bus="bus"></hd>
        <el-col :span="24" class="index-bd">
			<left :bus="bus"></left>
			<section class="mod-section">
				<el-col :span="24">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
            </section>
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
<style scoped lang="scss">
.mod-index{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	.index-bd{
		position: absolute;
		top: 60px;
		bottom: 0;
		width: 100%;
		display: flex;
		overflow:hidden;
		.mod-section{
			flex: 1;
			padding: 20px 30px;
			border-radius: 5px;
			overflow-y:scroll;
		}
	}
}
.fade-enter-active, .fade-leave-active {
	transition: opacity .15s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>

