const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError,jsonWebTokenError,hasNotAdminPermission,notFoundTokenError } = require("../constants/err_type");
/* 判断是否已经登录 */
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  if(!authorization){
    return ctx.app.emit('error',notFoundTokenError,ctx)
  }
  const token = authorization.replace("Bearer ", "");
  try {
    // user 包含了id，user_name,is_admin,由jwt解析还原
    const user = jwt.verify(token, JWT_SECRET);
    // 全局携带的对象
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token已过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效的token", err);
        return ctx.app.emit("error", jsonWebTokenError, ctx);
      default:
        return ctx.body = 'token其他错误'
    }
  }
  await next();
};
/* 判断是否有管理权限 */
const hadAdminPermission = async (ctx,next)=>{
  const {is_admin} = ctx.state.user
  if(!is_admin){
    console.error('没有权限')
    return ctx.app.emit('error',hasNotAdminPermission,ctx)
  }
  await next()
}
module.exports = {
  auth,
  hadAdminPermission
};
