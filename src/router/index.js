import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
		{
			path: '/',
			redirect: '/index',
			hidden:true
		},
		{
			path: '/login',
			name: '登录',
			iconCls:'el-icon-menu',
			component: resolve => require(['@/components/conf/login/index.vue'], resolve),
			hidden:true
		},
		{
			path: '/index',
			redirect:'/index/blog',
			name: '博客',
			iconCls:'el-icon-document',
			component: resolve => require(['@/components/conf/index/index.vue'], resolve),
			children:[{
				path:"blog",
				name:"写博客",
				component: resolve => require(['@/components/conf/blog/index.vue'], resolve)
			},{
				path:"list",
				name:"博客列表",
				component: resolve => require(['@/components/conf/blog/index.vue'], resolve)
			}]
		}
    ]
})
