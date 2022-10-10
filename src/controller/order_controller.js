const {ordersCreate,ordersList,ordersUpdate} = require('../service/orders_service')
class OrderController{
  /* 生成订单 */
  async createOrder(ctx){
    const user_id = ctx.state.user.id
    const {address_id,goods_info,total} = ctx.request.body
    // 利用时间戳
    const order_number = 'ts'+Date.now()
    const res = await ordersCreate({
      user_id,
      goods_info,
      address_id,
      total,
      order_number
    })
    ctx.body = res
  }
  /* 生成订单列表 */
  async listOrder(ctx){
    const {pageNum=1,pageSize=10} = ctx.request.query
    const user_id = ctx.state.user.id
    const res = await ordersList(pageNum,pageSize,user_id)
    ctx.body = res
  }
  /* 更新订单信息 */
  async updateOrder(ctx){
    const user_id = ctx.state.user.id;
    const id = ctx.params.id
    const {status} = ctx.request.body
    const res = await ordersUpdate(id,user_id,status)
    ctx.body = res
  }
}

module.exports = new OrderController()