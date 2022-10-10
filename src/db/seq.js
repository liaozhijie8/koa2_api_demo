const { Sequelize } = require("sequelize");
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql" /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */,
  timezone: '+08:00' //东八时区
});
// sequelize.authenticate().then(()=>{
//   console.log('链接数据库成功')
// }).catch((err)=>{
//   console.log('链接失败',err)
// })

module.exports = sequelize;
