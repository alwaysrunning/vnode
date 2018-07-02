import Vue from 'vue'
import Router from 'vue-router'
import blog from './blog'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
		{
			path: '/',
			redirect: '/login',
			hidden:true
		},
		{
			path: '/login',
			name: '登录',
			iconCls:'el-icon-menu',
			component: resolve => require(['@/components/conf/login/index.vue'], resolve),
			hidden:true
		},
		...blog
    ]
})
