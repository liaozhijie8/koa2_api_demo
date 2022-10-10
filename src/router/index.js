const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
fs.readdirSync(__dirname).forEach(file=>{
  if(file !== 'index.js'){
    let r = require('./'+file)//导出对象
    router.use(r.routes())//注册路由
  }
})

module.exports = router

