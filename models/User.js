require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 引入数据库配置

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    field:'user_name',
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createAt: {
    type: DataTypes.DATE,
    field: 'create_at',
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  updateAt: {
    type: DataTypes.DATE,
    field: 'update_at',
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  ifDel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'if_del',
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false, // 不生成 createdAt 和 updatedAt 字段
  freezeTableName:true,//强制表名称等于模型名称
});

module.exports = User;
