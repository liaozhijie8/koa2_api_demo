const Orders = require("../model/orders_model");
const Address = require("../model/orders_model");
const {Op} = require('sequelize')
class OrdersService {
  /* 生成订单 */
  async ordersCreate(orderParams) {
    return await Orders.create(orderParams);
  }
  /* 生成订单列表 */
  async ordersList(pageNum, pageSize, user_id) {
    // 获取列表总数
    const count = await Orders.count({
      where: { user_id },
    });
    // 设置分页数据
    const offset = (pageNum - 1) * pageSize;
    const rows = await Orders.findAll({
      attributes: [
        "id",
        "user_id",
        "address_id",
        "order_number",
        "goods_info",
        "total",
        "status",
      ],
      where: { user_id },
      offset,
      limit: pageSize * 1,
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  /* 更新订单状态 */
  async ordersUpdate(id,user_id, status) {
    return await Orders.update({status}, {
      where: {
        [Op.and]:{
          id,
          user_id
        }
      },
    });
  }
}

module.exports = new OrdersService();
