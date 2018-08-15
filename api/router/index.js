const express = require('express')
const router = express.Router();
const moment = require('moment');
const logger = require('../log4js/index').logger();
const sql = require('../../mysql/connect');
const jwt = require('jsonwebtoken')
const secret = 'YANGHAITAO'
const fs = require('fs')
const path = require('path')

// 处理时间戳
function handleTime(rows){
    rows.forEach(v=>{
        v.create_time = moment(v.create_time).format('YYYY-MM-DD HH:mm:ss')
    })
    return rows
}

// token 认证
function authToken(req, res, next){
    var Cookies = {};
    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
        var parts = Cookie.split('=');
        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
    });
    var token = Cookies.token
    if(token){
        jwt.verify(token, secret, (error, decoded)=>{
            if(error){
                return res.json({ success: false, message: 'token信息错误.' });
            }else{
                req.decoded = decoded
                next()
            }
        })
    }else{
        return res.status(403).send({
            success: false,
            message: '没有提供token！'
        })
    }
}


// router.get('/list', authToken, function(req, res, next){
//     sql.query('select * from blog order by create_time DESC', function(err, rows){
//         if(err){
//             console.log(err)
//             next(err)
//         }else{
//             res.json({
//                 msg:'',
//                 error:0,
//                 data:handleTime(rows)
//             })
//         }
//     })
// })

router.get('/list', function(req, res, next){
    let title = req.query.title
    let currentPage = parseInt(req.query.currentPage)
    let pageSize = parseInt(req.query.pageSize)
    let start = (currentPage-1)*pageSize
    sql.query(`select * from blog where title like '%${title}%' order by create_time DESC limit ${start}, ${pageSize}`, function(err, rows){
        if(err){
            console.log(err)
            next(err)
        }else{
            sql.query('select count(*) as total from blog', function(err, row){
                if(err){
                    console.log(err)
                    next(err)
                }else{
                    res.json({
                        msg:'',
                        error:0,
                        data:handleTime(rows),
                        pageSize:pageSize,
                        currentPage:currentPage,
                        total:row[0].total
                    })
                }
                
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
                sql.query(`update blog set pic='${data.imageUrl}', title='${data.title}', description='${data.description}', type='${data.type}', creative=${data.creative}, content='${data.content}' where blog_id=${data.id}`,function(err, rows){
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
    let querySql = `select * from user where name = '${req.body.name}' and password = '${req.body.password}'`
    //let querySql = `select * from user`
    sql.query(querySql, function(err, rows){
        if(err || rows.length==0){
            res.json({
                msg:'登录失败',
                error:-100
            })
        }else{
            var token = jwt.sign(Object.assign({},rows[0]), secret, {
                expiresIn:60*60*24  // 24小时
            })
            //res.cookie('token',token,{httpOnly: false})
            // cookie 必须在 json之前
            res.cookie('token', token);
            res.json({
                msg:'登录成功',
                error:0,
                token:token,
                row:rows[0]
            })
        }
    })
})

router.post('/upload', function(req, res, next){
    let imgData = req.body.img
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, ' ')
    let dataBuffer = new Buffer(base64Data, 'base64')
    let time = new Date().getTime()

    let frontPath =path.join(__dirname,'../../../../')
    if (!fs.existsSync(frontPath + '/images/')) {
        fs.mkdirSync(frontPath + '/images/');
    }
    if (!fs.existsSync(frontPath + '/images/upload/')) {
            fs.mkdirSync(frontPath + '/images/upload/');
    }
    fs.writeFile(frontPath + '/images/upload/' + time + '.png', dataBuffer, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.send({ error: 0, msg: '保存成功', data: 'http://116.85.25.126:8888/images/upload/' + time + '.png'})
        }
    })
})

// 获取本机ip地址
function getIp () {
    var os = require('os'),
        iptable = {},
        ifaces = os.networkInterfaces()
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details, alias) {
            if ((details.family == 'IPv4') && (details.internal == false)) {
            // iptable[dev+(alias?':'+alias:'')]=details.address
            iptable['localIP'] = details.address
            }
        })
    }
    return iptable.localIP
}
module.exports = router