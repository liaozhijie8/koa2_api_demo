const { DataTypes } = require("sequelize");

const sequelize = require("../db/seq");

/* 创建模型 */
const Address = sequelize.define(
  "address",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户的id",
    },
    consigness: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "收件人",
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      comment: "手机号码",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "地址",
    },
    is_default:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false,
      comment:'是否默认地址'
    }
  },
  {
    paranoid: true,
  }
);
// 强制同步数据库
// Address.sync({force:true})


module.exports = Address;
