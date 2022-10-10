const Router = require('koa-router')
const {upload,create,update,remove,reCreate,findAll} = require('../controller/goods_controller')
const {auth,hadAdminPermission} = require('../middleware/authorization_middleware')
const {goodsValidator} = require('../middleware/goods_middleware')
const router = new Router({prefix:'/api/goods'})
/* 上传图片 */
router.post('/upload',auth,hadAdminPermission,upload)
/* 上传商品信息 */
router.post('/create',auth,goodsValidator,hadAdminPermission,create)
/* 修改商品信息 */
router.put('/update/:id',auth,hadAdminPermission,goodsValidator,update)
/* 商品下架 */
router.post('/off/:id',auth,hadAdminPermission,remove)
/* 商品上架 */
router.post('/on/:id',auth,hadAdminPermission,reCreate)
/* 查找商品列表 */
router.get('/list',auth,findAll)
module.exports = router