export default [
    {
        path: '/index',
        redirect:'/index/list',
        name: '博客',
        iconCls:'el-icon-document',
        component: resolve => require(['@/components/conf/index/index.vue'], resolve),
        children:[{
            path:"add",
            name:"添加博客",
            component: resolve => require(['@/components/conf/blog/add.vue'], resolve),
            hidden:true
        },{
            path:"list",
            name:"我的博客",
            component: resolve => require(['@/components/conf/blog/index.vue'], resolve)
        }]
    }
]