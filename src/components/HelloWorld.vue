<template>
<div class="hello">
	<h1>{{ msg }}</h1>
	<ul>
		<li>
			<a
				href="http://router.vuejs.org/"
				target="_blank"
			>
			vuex<i class="icon iconfont">&#xe60c;</i>
			</a>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data () {
		return {
		msg: 'Welcome to Your Vue.js App'
		}
	},
	mounted(){
		this.getList()
	},
	methods:{
		async getList(){
			let res = await this.$ajax.get('/api/data')
			console.log(res)
			console.log(111)
		}
	}
}
</script>


<style lang="scss" scoped>
h1, h2 {
  	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
	li {
		display: inline-block;
		margin: 0 10px;
		a {
			color: #f00;
		}
	}
}


</style>
