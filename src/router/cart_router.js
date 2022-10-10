const Router = require('koa-router')
const {auth} = require('../middleware/authorization_middleware')
const {cartsValidator,goodsIdValidator,requiredParams,selectedParams} = require('../middleware/carts_middleware')
const {addCarts,listCarts,update,remove,selectedAll} = require('../controller/carts_controller')
const router = new Router({prefix:'/api/carts'})
/* 添加购物车 */
const checkIdRules = {goods_id:'number'}
router.post('/add',auth,cartsValidator(checkIdRules),goodsIdValidator,addCarts)
/* 获取购物车列表 */
router.get('/list',auth,listCarts)
/* 更新购物车 */
const updateRules = {
  number:{type:'number',required:false},
  selected:{type:'bool',required:false}
}
router.post('/update/:id',auth,requiredParams,cartsValidator(updateRules),update)
/* 删除购物车 */
const deleteRules = {ids:'array'}
router.delete('/delete',auth,cartsValidator(deleteRules),remove)
/* 购物车全选 */
router.post('/selected/:state',auth,selectedParams,selectedAll)
module.exports = router