const { DataTypes } = require("sequelize");

const sequelize = require("../db/seq");

/* 创建模型 */
const Goods = sequelize.define("goods", {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "商品名称",
  },
  goods_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    comment: "商品价格",
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品数量",
  },
  goods_img:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:"商品的图片url"
  }
},
// 软删除设置
{
  paranoid: true,
});
// 强制同步数据库
// Goods.sync({force:true})

module.exports = Goods