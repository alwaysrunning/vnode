var log4js = require("log4js")

var levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
};


log4js.configure({
    appenders:[
        {
            type:"console"
        },
        {
            type:"dateFile",
            filename:"logs/",
            pattern:"yyyy-MM-dd.log",
            alwaysIncludePattern:true,
            maxLoginSize:1024,
            backups:4,
            category:'console'
        }
    ],

    replaceConsole:true,
})
//优先级别
// DEBUG
// INFO
// WARN
// ERROR

exports.logger = function(){
    var logger = log4js.getLogger('console')
    logger.setLevel("INFO")
    return logger
}

exports.use = function(app, level){   // 前端发起请求时，把该请求记录在日志中
    var logger = log4js.getLogger('console')
    logger.setLevel(levels[level]||levels['INFO'])
    app.use(log4js.connectLogger(logger))
}




// console.info('console.info'); ===logger.info('console.info')
// console.warn('console.warn'); ===logger.warn('console.warn')
// console.error("console.error"); ===logger.error("console.error")