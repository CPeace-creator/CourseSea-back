require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 引入数据库配置

const Course = sequelize.define('course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
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
	},
	userId: {
	    type: DataTypes.INTEGER,
	    defaultValue:0,
		field:"user_id"
	},
	link: {
	    type: DataTypes.STRING(255),
	    allowNull: true
	},
    duration:{
        type:DataTypes.DOUBLE(10),
        allowNull:true
    }
}, {
    timestamps: false, // 不生成 createdAt 和 updatedAt 字段
    tableName: "course"
});

module.exports = Course;
