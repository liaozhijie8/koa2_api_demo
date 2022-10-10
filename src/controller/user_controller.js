const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user_service");
const { userRegisterError, commonError } = require("../constants/err_type");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { successRes } = require("../constants/success_type");
class UserController {
  /* 注册 */
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  /* 登录 */
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    try {
      // 根据获取的用户信息生成token
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("登录出错");
    }
  }
  /* 修改密码 */
  async changePassword(ctx, next) {
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    try {
      const res = await updateById({ id, password });
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改密码成功",
          result: "",
        };
      } else {
        ctx.body = {
          code: 0,
          message: "修改密码失败",
          result: "",
        };
      }
    } catch (err) {
      console.error(err);
    }
  }
  /* 获取用户信息 */
  async profile(ctx) {
    const id = ctx.state.user.id;
    const { password, ...res } = await getUserInfo({ id });
    try {
      if (!res) {
        commonError.message = "用户个人信息不存在";
        commonError.result = "";
        ctx.app.emit("error", commonError, ctx);
      }else{
        successRes.message = '获取个人信息成功'
        successRes.result = res
        ctx.body = successRes
      }
    } catch (err) {
      console.error("获取个人信息失败", err);
      commonError.message = "获取个人信息失败";
      commonError.result = "";
      ctx.app.emit("error", commonError, ctx);
    }
  }
}

module.exports = new UserController();
