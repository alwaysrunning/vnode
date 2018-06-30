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







module.exports = router