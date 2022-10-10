const Router = require('koa-router')

const {auth} = require('../middleware/authorization_middleware')
const {createOrder,listOrder,updateOrder} = require('../controller/order_controller')
const {validator} = require('../middleware/common_middleware')

const router = new Router({prefix:'/api/orders'})
/* 生成订单接口 */
// 订单参数规则
const orderRules = {
  address_id:'number',
  total:'string'
}
router.post('/create',auth,validator(orderRules),createOrder)
/* 订单列表 */
router.get('/list',auth,listOrder)
/* 更新订单状态 */
// 订单状态参数
const statusRules = {
  status:'number'
}
router.patch('/update/:id',auth,validator(statusRules),updateOrder)


module.exports = router