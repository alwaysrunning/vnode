var mysql = require("mysql")
var fs = require("fs")
var path = require("path")
var dbData, sql, content;

content = fs.readFileSync(path.join(__dirname,'./mysql_pro.json'))
//content = fs.readFileSync(path.join(__dirname,'./mysql.json'))
sql = mysql.createConnection(JSON.parse(content.toString()))
module.exports = sql
