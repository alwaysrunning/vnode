import Mock from 'mockjs'

Mock.mock(/\/api\/data/, 'get', (req, res) => {
    return {
        data: 'hello world'
    }
})