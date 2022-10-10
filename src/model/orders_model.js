const { DataTypes } = require("sequelize");

const sequelize = require("../db/seq");
const Address = require('./orders_model')
/* 创建模型 */
const Orders = sequelize.define("orders", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "地址id",
  },
  goods_info: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: "商品信息",
  },
  total:{
    type:DataTypes.DECIMAL(10,2),
    allowNull:false,
    comment:"订单总金额"
  },
  order_number:{
    type:DataTypes.CHAR(16),
    allowNull:false,
    comment:"唯一订单标识"
  },
  status:{
    type:DataTypes.TINYINT,
    allowNull:false,
    defaultValue:0,
    comment:"0:未支付,1:已支付,2:已发货,3:已签收,4:取消"
  }
},
// 软删除设置
{
  paranoid: true,
});
// 强制同步数据库
// Orders.sync({force:true})


module.exports = Orders