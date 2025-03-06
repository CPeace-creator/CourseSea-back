require('dotenv').config();
const { Sequelize } = require('sequelize');

// 创建 Sequelize 实例
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false // 禁用日志输出
});

// 测试数据库连接
sequelize.authenticate()
  .then(() => {
    console.log('Databasçe connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize; 