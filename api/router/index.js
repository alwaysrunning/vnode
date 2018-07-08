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
    res.json({
        msg:'hello world',
        error:0,
    })
    return
    sql.query('select * from blog order by create_time DESC', function(err, rows){
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
    if(data.id){
        sql.query(`select * from blog where blog_id=${data.id}`, function(err, rows){
            if(err){
                res.json({
                    msg:'查找报错',
                    error:500,
                })
            }else{
                sql.query(`update blog set title='${data.title}', description='${data.description}', type='${data.type}', creative=${data.creative}, content='${data.content}' where blog_id=${data.id}`,function(err, rows){
                    if(err){
                        res.json({
                            msg:'更新报错',
                            error:500,
                        })
                    }else{
                        console.log(999)
                        if(rows){
                            res.json({
                                msg:'保存成功',
                                error:0,
                            })
                        }
                    }
                })
            }
        })
        return
    }
    sql.query(`insert into blog(title,description,type,creative,content) values('${data.title}','${data.description}','${data.type}',${data.creative},'${data.content}')`, function(err, rows){
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
    sql.query(`select * from blog where blog_id =${req.query.id}`, function(err, rows){
        if (err) {
            res.status(500)
            res.json({
                msg:'',
                error:500,
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

router.post('/delete', function(req, res, next){
    sql.query(`delete from blog where blog_id =${req.body.id}`, function(err, rows){
        if (err) {
            res.status(500)
            res.json({
                msg:'删除blog失败',
                error:500,
            })
        }else {
            res.json({
                msg:'成功删除blog',
                error:0,
            })
        }
    })
})

router.post('/login', function(req, res, next){
    sql.query(`select * from user where name = '${req.body.name}' and password = '${req.body.password}'`, function(err, rows){
        if(err){
            res.json({
                msg:'登录失败',
                error:-100
            })
        }else{
            res.json({
                msg:'登录成功',
                error:0
            })
        }
    })
})
module.exports = router