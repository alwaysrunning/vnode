var express = require("express");
var path = require("path");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var router = require('./router/index');
var app = express()
var log4js = require('./log4js/index');

app.all('*', function(req,res,next){
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    next()
})
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

app.use(compression()); 

log4js.use(app)

app.use('/api', router)

app.use(function(req,res,next){
    res.status(404);
    res.json({
        msg:'没找到资源',
        status:404,
        data:''
    })
})

module.exports = app

var server = app.listen(49999, function(){
    var host = server.address().address
    var port = server.address().port
})