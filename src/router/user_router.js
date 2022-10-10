const Router = require('koa-router')
const {register, login,changePassword,profile} = require('../controller/user_controller')

// 中间件处理
const {user_validator,verifyUser,crpytPassword,verifyLogin,password_validator,verifyPassword} = require('../middleware/user_middleware')
const {auth} = require('../middleware/authorization_middleware')
const router = new Router({prefix:'/api'})

/* 注册 */
router.post('/register',user_validator,verifyUser,crpytPassword,register)
/* 登录 */
router.post('/login',user_validator,verifyLogin,login)
/* 获取用户信息 */
router.get('/profile',auth,profile)
/* 修改密码 */
router.patch('/',auth,password_validator,verifyPassword,crpytPassword,changePassword)
/* 导出模块 */
module.exports = router