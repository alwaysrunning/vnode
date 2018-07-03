var mysql = require("mysql")
var fs = require("fs")
var path = require("path")
var dbData, sql, content;
if(process.env.NODE_ENV === 'production'){
    content = fs.readFileSync(path.join(__dirname,'./mysql_pro.json'))
}else{
    content = fs.readFileSync(path.join(__dirname,'./mysql.json'))
}
sql = mysql.createConnection(JSON.parse(content.toString()))
module.exports = sql
