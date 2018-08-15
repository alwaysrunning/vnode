var mysql = require("mysql")
var fs = require("fs")
var path = require("path")
var dbData, sql, content;

var env = process.env.NODE_ENV || 'production'
if(env=="development"){
    content = fs.readFileSync(path.join(__dirname,'./mysql.json'))
}else{
    content = fs.readFileSync(path.join(__dirname,'./mysql_pro.json'))
}

sql = mysql.createConnection(JSON.parse(content.toString()))
module.exports = sql
