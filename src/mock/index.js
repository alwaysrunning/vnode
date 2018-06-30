import Mock from 'mockjs'

Mock.mock(/\/api\/data/, 'get', (req, res) => {
    return {
        error:0,
        msg:'请求成功',
        data: [
            {
				id:1,
				title:'webpack构建方案',
				description:'webpack构建方案具体操作',
				type:'技术',
				time:'2018-12-22 12:12:12',
				url:'www.baidu.com'
            },
            {
				id:1,
				title:'webpack构建方案',
				description:'webpack构建方案具体操作',
				type:'技术',
				time:'2018-12-22 12:12:12',
				url:'www.baidu.com'
            },
            {
				id:1,
				title:'webpack构建方案',
				description:'webpack构建方案具体操作',
				type:'技术',
				time:'2018-12-22 12:12:12',
				url:'www.baidu.com'
			}
        ]
    }
})