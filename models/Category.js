require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 引入数据库配置

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'update_at',
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    ifDel: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
        field: 'if_del',
    }
}, {
    timestamps: false // 不生成 createdAt 和 updatedAt 字段
});

module.exports = Category;
