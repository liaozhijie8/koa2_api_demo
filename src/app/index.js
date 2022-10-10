const path = require('path')
const Koa =require('koa')
const koaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
const app = new Koa()
const router = require('../router')
const errHandler = require('./errHandler')
app.use(koaBody(
  /* 上传文件配置 */
  {
    multipart:true,
    formidable:{
      uploadDir:path.join(__dirname,'../upload'),
      keepExtensions:true
    },
    // 选择哪种请求挂载在request.body
    parsedMethods:['PUT','POST','PATCH','DELETE']
  }
))
/* 跨域设置 */
// 验证规则
app.use(parameter(app))
// 静态资源管理
app.use(KoaStatic(path.join(__dirname,'../upload')))
// 路由处理
app.use(router.routes()).use(router.allowedMethods())
/* 统一的错误处理 */
app.on('error',errHandler)
/* 导出模块 */
module.exports = app