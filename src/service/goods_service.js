const Goods = require('../model/goods_model')
class GoodsService {
  /* 上传商品信息 */
  async createGoods(goods){
    const res = await Goods.create(goods)
    return res.dataValues
  }
  /* 修改商品信息 */
  async updateGoods(id,goods){
    const res = await Goods.update(goods,{where:{id}})
    return res[0]>0
  }
  /* 下架商品 */
  async removeGoods(id){
    const res =  await Goods.destroy({where:{id}})
    return res>0
  }
  /* 上架商品 */
  async restoreGoods(id){
    const res =  await Goods.restore({where:{id}})
    return res>0
  }
  /* 查找商品列表 */
  async findGoods(pageNum,pageSize){
    // 获取商品总数
    const count = await Goods.count()
    // 获取分页的具体数据
    const offset = (pageNum - 1) * pageSize
    const rows = await Goods.findAll({offset,limit:pageSize*1})
    return {
      pageNum,
      pageSize,
      total:count,
      list:rows
    }
  }
}

module.exports = new GoodsService()