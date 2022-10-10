const { DataTypes } = require("sequelize");

const sequelize = require("../db/seq");
const Goods = require("./goods_model");

/* 创建模型 */
const Carts = sequelize.define(
  "carts",
  {
    goods_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品id",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户id",
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "商品数量",
    },
    selected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "是否选中的状态",
    },
  },
  {
    paranoid: true,
  }
);
// 强制同步数据库
// Carts.sync({force:true})

/* 连表查询(一对一) */
Carts.belongsTo(Goods, {
  // 查询Carts中的属性与Goods中的对应
  foreignKey: "goods_id",
  as: "goods_info",
});

module.exports = Carts;
