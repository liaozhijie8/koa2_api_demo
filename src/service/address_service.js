const Address = require("../model/address_model");
const { Op } = require("sequelize");
class AddressService {
  /* 添加地址 */
  async addressAdd(addrParams) {
    const res = await Address.create(addrParams);
    return res.dataValues;
  }
  /* 获取地址列表 */
  async addressList(pageNum, pageSize, user_id) {
    const count = await Address.count({
      where: { user_id },
    });
    const offset = (pageNum - 1) * pageSize;
    const rows = await Address.findAll({
      attributes: [
        "id",
        "user_id",
        "consigness",
        "phone",
        "address",
        "is_default",
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
  /* 更新地址 */
  async addressUpdate(id, user_id, addressParams) {
    const res = await Address.update(addressParams, {
      where: {
        [Op.and]: {
          id,
          user_id,
        },
      },
    });
    return res[0]
  }
  /* 删除地址 */
  async addressDelete(id,user_id){
    const res = await Address.destroy({
      where:{
        [Op.and]:{
          id,
          user_id
        }
      }
    })
    return res
  }
  /* 设置默认地址 */
  async addressChange(id,user_id){
    // 先将其他的地址默认取消
    await Address.update(
      {is_default:false},
      {
        where:{
          // 防止越权
          [Op.and]:{
            id,
            user_id
          }
        }
      }
    )
    // 设置默认地址
    const res = await Address.update(
      {is_default:true},
      {
        where:{
          [Op.and]:{
            id,
            user_id
          }
        }
      }
    )
    return res>0
  }
}

module.exports = new AddressService();
