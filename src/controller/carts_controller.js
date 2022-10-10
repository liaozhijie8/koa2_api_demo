const{createOrUpdate,checkListCarts,updateCarts,deleteCarts,selectedCarts}= require('../service/carts_service')
const {successRes} = require('../constants/success_type')
const {invalidGoodsId} = require('../constants/err_type')
class CartsController {
  /* 添加购物车 */
  async addCarts(ctx){
    // 解析登录了的用户id，添加的商品id
    const user_id = ctx.state.user.id
    const goods_id = ctx.request.body.goods_id
    const res = await createOrUpdate(user_id,goods_id)
    try{
      successRes.message = '添加购物车成功'
      successRes.result = res
      ctx.body = successRes
    }catch(err){
      console.error(err)
    }
  }
  /* 查找列表 */
  async listCarts(ctx){
    const {pageNum=1,pageSize=10} = ctx.request.query//因为采用了get请求，query，否则body
    const user_id = ctx.state.user.id
    const res = await checkListCarts(pageNum,pageSize,user_id)
    successRes.message = '查找购物车列表成功',
    successRes.result = res
    ctx.body = successRes
  }
  /* 更新购物车 */
  async update(ctx){
    const {number,selected} = ctx.request.body
    const res = await updateCarts(ctx.params.id,ctx.state.user.id,number,selected)
    if(res){
      successRes.message = '更新购物车成功'
      successRes.result = ''
      ctx.body = successRes
    }else{
      invalidGoodsId.message = '购物车中没有该商品'
      invalidGoodsId.result = ''
      ctx.body = invalidGoodsId
    }
  }
  /* 删除购物车 */
  async remove(ctx){
    const user_id = ctx.state.user.id
    const {ids} = ctx.request.body
    const res = await deleteCarts(user_id,ids)
    try{
      if(res){
        successRes.message = '删除购物车成功'
        successRes.result = ''
        ctx.body = successRes
      }else{
        successRes.message = '没有此购物车'
        successRes.result = ''
        ctx.body = successRes
      }
    }catch(err){
      console.error(err)
    }
  }
  /* 购物车全选/取消全选 */
  async selectedAll(ctx){
    const user_id = ctx.state.user.id
    const is_selected = ctx.params.state
    const res = await selectedCarts(user_id,is_selected)
    try{
      if(res){
        successRes.message = '全选完成'
        successRes.result = ''
        ctx.body = successRes
      }
    }catch(err){
      console.error(err)
    }
  }
}

module.exports = new CartsController()