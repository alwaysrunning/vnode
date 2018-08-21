export default [
    {
        path: '/classify',
        redirect:'/classify/list',
        name: '分类',
        iconCls:'el-icon-document',
        component: resolve => require(['@/components/conf/index/index.vue'], resolve),
        children:[{
            path:"add",
            name:"添加分类",
            component: resolve => require(['@/components/conf/classify/add.vue'], resolve),
            hidden:true
        },{
            path:"list",
            name:"分类列表",
            component: resolve => require(['@/components/conf/classify/index.vue'], resolve)
        }]
    }
]