import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
		{
			path: '/',
			redirect: '/index'
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/components/conf/login/index.vue'], resolve)
		},
		{
			path: '/index',
			redirect:'/index/blog',
			name: 'index',
			component: resolve => require(['@/components/conf/index/index.vue'], resolve),
			children:[{
				path:"blog",
				name:"博客",
				component: resolve => require(['@/components/conf/blog/index.vue'], resolve)
			}]
		}
    ]
})
