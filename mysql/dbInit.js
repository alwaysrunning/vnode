const sql = require("./connect")
const NAME = 'root'
const PASSWORD = '123456'
const RANK = 1

const user = `CREATE TABLE IF NOT EXISTS user(
    id smallint(6) unsigned NOT NULL auto_increment,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    rankval smallint(6) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`

  //ENGINE=InnoDB DEFAULT CHARSET=gbk
const blog = `CREATE TABLE IF NOT EXISTS blog (
    blog_id mediumint(8) unsigned NOT NULL auto_increment,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL COMMENT '博客描述',
    content longtext NOT NULL,
    type varchar(36) NOT NULL,
    pic longtext,
    creative mediumint(6) NOT NULL,
    create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (blog_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`


const classify = `CREATE TABLE IF NOT EXISTS classify (
    type_id mediumint(8) unsigned NOT NULL auto_increment,
    type_name varchar(255) NOT NULL,
    create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (type_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`


var init = function(){
    sql.connect(function(err){
        if(err){
            console.log('数据库链接失败')
        }else{
            console.log('成功链接数据库')
            sql.query(classify, function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log('classify表创建成功')
                }
            })

            sql.query(user, function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log('user表创建成功')
                }
            })
            sql.query(blog, function (err) {
                if(err){
                    console.log(err)
                }else{
                    console.log('blog表创建成功')
                }
            })
            sql.query('insert into user set ?',{name:NAME, password:PASSWORD, rankval:RANK}, function (err) {
                if(err){
                    console.log(err)
                }else{
                    console.log('用户表初始化成功')
                }
            })

            // sql.query('insert into blog(title, description, content, type, url) VALUES(?,?,?,?,?)',['title','description','content','技术','www'], function (err) {
            //     if(err){
            //         console.log(err)
            //     }else{
            //         console.log('初始化博客')
            //     }   
            // })

        }
    })
}

init()