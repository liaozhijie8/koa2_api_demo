module.exports = {
  commonError:{
    code: "10004",
    message: "",
    result: "",
  },
  userFormatError: {
    code: "10001",
    message: "用户名或密码为空",
    result: "",
  },
  passwordFormatError: {
    code: "10001",
    message: "密码不能为空",
    result: "",
  },
  userAlreadyExisted: {
    code: "10002",
    message: "用户已存在",
    result: "",
  },
  userRegisterError: {
    code: "10003",
    message: "注册用户错误",
    result: "",
  },
  userNotfoundError: {
    code: "10004",
    message: "用户不存在",
    result: "",
  },
  userLoginError: {
    code: "10005",
    message: "用户登录错误",
    result: "",
  },
  invalidPassword: {
    code: "10006",
    message: "密码不正确",
    result: "",
  },
  tokenExpiredError: {
    code: "10101",
    message: "token已过期",
    result: "",
  },
  jsonWebTokenError: {
    code: "10102",
    message: "无效的token",
    result: "",
  },
  notFoundTokenError: {
    code: "10106",
    message: "token信息为空",
    result: "",
  },
  hasNotAdminPermission: {
    code: "10103",
    message: "没有管理员权限",
    result: "",
  },
  fileUploadError: {
    code: "10104",
    message: "商品图片上传失败",
    result: "",
  },
  unSupporFileType: {
    code: "10105",
    message: "不支持的文件类型",
    result: "",
  },
  goodsFormatError:{
    code:"10107",
    message:"商品参数格式错误",
    result:""
  },
  publishGoodsError:{
    code:"10204",
    message:"发布商品信息失败",
    result:""
  },
  invalidGoodsId:{
    code:"10205",
    message:"修改商品不存在",
    result:""
  },
  addrFormatError:{
    code:'10206',
    message:"地址格式错误",
    result:''
  }
};
