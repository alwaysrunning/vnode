const express = require('express')
const router = express.Router();
const moment = require('moment');

var sql = require('../../mysql/connect')

// 处理时间戳
function handleTime(rows){
    rows.forEach(v=>{
        v.create_time = moment(v.create_time).format('YYYY-MM-DD HH:mm:ss')
    })
    return rows
}

router.get('/list', function(req, res, next){
    sql.query('select * from blog', function(err, rows){
        if(err){
            console.log(err)
            next(err)
        }else{
            res.json({
                msg:'',
                error:0,
                data:handleTime(rows)
            })
        }
    })
})

router.post('/save', function(req, res, next){
    let data = req.body
    sql.query('insert into blog set ?',{title:data.title,description:data.description,type:data.type,creative:data.creative,content:data.content}, function(err, rows){
        if (err) {
            res.json({
                msg:'创建blog失败',
                error:-100,
            })
        }else {
            res.json({
                msg:'新建blog成功',
                error:0,
            })
        }
    })
})

router.get('/getInfo', function(req, res, next){
    sql.query(`select * from blog where id =${req.query.id}`, function(err, rows){
        if (err) {
            res.json({
                msg:'',
                error:-100,
            })
        }else {
            res.json({
                msg:'新建blog成功',
                error:0,
                data:rows[0]
            })
        }
    })
})



module.exports = router