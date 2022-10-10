const {commonError} = require('../constants/err_type')
/* 通用验证中间件 */
const validator = (rules) =>{
  return async (ctx,next) =>{
    try{
      await ctx.verifyParams(rules)
    }catch(err){
      console.error(err)
      commonError.message = err.message
      commonError.result = err
      return ctx.app.emit('error',commonError,ctx)
    }
    await next()
  }
}

module.exports = {
  validator
}