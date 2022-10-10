const Carts = require("../model/carts_model");
const Goods = require("../model/goods_model");
const { Op } = require("sequelize");
class CartsService {
  /* 添加购物车或更新购物车商品数量 */
  async createOrUpdate(user_id, goods_id) {
    let res = await Carts.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      // 已经添加了购物车，则将number+1
      await res.increment("number");
      return await res.reload(); //刷新数据库
    } else {
      return await Carts.create({
        user_id,
        goods_id,
      });
    }
  }
  /* 查找商品的id是否存在 */
  async checkGoodsId(id) {
    const res = await Goods.findOne({
      attributes: ["id"],
      where: { id },
    });
    return res;
  }
  /* 查找购物车列表 */
  async checkListCarts(pageNum, pageSize, user_id) {
    // 获取列表总数
    const count = await Carts.count({
      where: { user_id },
    });
    // 设置分页数据
    const offset = (pageNum - 1) * pageSize;
    const rows = await Carts.findAll({
      attributes: ["id", "user_id", "goods_id", "number", "selected"],
      where: { user_id },
      offset,
      limit: pageSize * 1,
      // 关联表
      include: {
        model: Goods,
        as: "goods_info",
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
      },
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  /* 更新购物车 */
  async updateCarts(goods_id, user_id, number, selected) {
    let res = await Carts.findOne({
      where: {
        [Op.and]: {
          // 查找符合这两个条件的
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      /* 更新数据 */
      if (number !== undefined) {
        await res.increment("number", { by: number });
        await res.reload();
      }
      if (selected !== undefined) {
        res.selected = selected;
        await res.save();
      }
      return true;
    } else {
      return false;
    }
  }
  /* 删除购物车 */
  async deleteCarts( user_id, ids ) {
    const res = await Carts.destroy({
      where: {
        [Op.and]:{
          user_id,
          goods_id:{
            [Op.in]:ids
          }
        }
      },
    });
    return res
  }
  /* 购物车全选/取消全选 */
  async selectedCarts(user_id,is_selected){
    return await Carts.update(
      {selected:is_selected},
      {
        where:{
          user_id
        }
      }
    )
  }
}

module.exports = new CartsService();
