// 设置环境变量
const {APP_PORT} = require('./config/config.default.js')
const app = require('./app')
app.listen(APP_PORT,()=>{
  console.log(`服务器启动端口号:${APP_PORT}`)
})