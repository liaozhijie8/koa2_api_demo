const { getUserInfo } = require("../service/user_service");
const bcrypt = require("bcryptjs"); //加密模块
const {
  userFormatError,
  userAlreadyExisted,
  userRegisterError,
  userNotfoundError,
  userLoginError,
  invalidPassword,
  passwordFormatError,
  commonError,
} = require("../constants/err_type");
const { successRes } = require("../constants/success_type");
/* 合法性处理 */
// **用户和密码输入合法性**
const user_validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      user_name: { type: "string", required: true },
      password: { type: "string", required: true },
    });
  } catch (err) {
    userFormatError.result = err;
    return ctx.app.emit("error", userFormatError, ctx);
  }
  await next();
};
// **密码输入合法性**
const password_validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      originalPassword: { type: "string", required: true },
      newPassword: { type: "string", required: true },
    });
  } catch (err) {
    commonError.result = err;
    commonError.message = err.message;
    return ctx.app.emit("error", commonError, ctx);
  }
  await next();
};
/* 合理性处理 */
// ***验证用户名是否存在
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  const res = await getUserInfo({ user_name });
  try {
    if (res) {
      console.error("用户已经存在");
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};
// ***登录验证
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  const res = await getUserInfo({ user_name });
  try {
    if (!res) {
      console.error("用户不存在", user_name);
      ctx.app.emit("error", userNotfoundError, ctx);
      return;
    }
    // 验证密码
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }
  await next();
};
/* 加密处理 */
const crpytPassword = async (ctx, next) => {
  const { newPassword } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // 加密处理
  const hash = bcrypt.hashSync(newPassword, salt);
  // 绑定在body上，发送给下一个中间件
  ctx.request.body.password = hash;
  await next();
};
/* 校对密码 */
const verifyPassword = async (ctx, next) => {
  const id = ctx.state.user.id;
  const password = ctx.request.body.originalPassword;
  const res = await getUserInfo({ id }); //利用id查找用户信息
  try {
    // 验证密码
    if (!bcrypt.compareSync(password, res.password)) {
      commonError.message = "原始密码不正确";
      commonError.result = "";
      ctx.app.emit("error", commonError, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }
  await next();
};
module.exports = {
  user_validator,
  verifyUser,
  crpytPassword,
  verifyLogin,
  password_validator,
  verifyPassword,
};
