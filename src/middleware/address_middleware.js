const {addrFormatError} = require('../constants/err_type')
/* 地址通用验证中间件 */
const addrValidator = (rules) =>{
  return async (ctx,next) =>{
    try{
      await ctx.verifyParams(rules)
    }catch(err){
      console.error(err)
      addrFormatError.result = err
      return ctx.app.emit('error',addrFormatError,ctx)
    }
    await next()
  }
}

module.exports = {
  addrValidator
}