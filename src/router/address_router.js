const Router = require('koa-router')

const {auth} = require('../middleware/authorization_middleware')
const {addAddress,listAddress,updateAddress,deleteAddress,changeAddress} = require('../controller/address_controller')
const {addrValidator} = require('../middleware/address_middleware')
const router = new Router({prefix:'/api/address'})
/* 上传图片 */
// 地址参数验证
const addrRules = {
  consigness:'string',
  phone:{type:'string',format:/^\d{11}$/},
  address:'string'
}
router.post('/add',auth,addrValidator(addrRules),addAddress)
/* 获取地址列表 */
router.get('/list',auth,listAddress)
/* 更新地址参数 */
router.put('/update/:id',auth,addrValidator(addrRules),updateAddress)
/* 删除地址 */
router.delete('/delete/:id',auth,deleteAddress)
/* 设置默认地址 */
router.patch('/change/:id',auth,changeAddress)

module.exports = router