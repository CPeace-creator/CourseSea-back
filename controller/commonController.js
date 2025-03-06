const User = require('../models/User');
const ResponseResult = require('../utils/ResponseResult');
const utils = require('../utils/utils');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const logger2 = require("../utils/logger");

exports.login = async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { user_name: userName } });
    if (!user) {
        return ResponseResult.send(res, ResponseResult.error(500, "账号不存在,请注册!"));
    }
    if (await utils.comparePassword(user.password, password)) {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return ResponseResult.send(res, ResponseResult.success({ token:token,id:user.id }));
    } else {
        return ResponseResult.send(res, ResponseResult.error(500, "密码不正确,请重试!"));
    }
}

// 注册
exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return ResponseResult.send(res, ResponseResult.error(400, "Name, email, and password are required"));
        }
        const saltRounds = parseInt(process.env.SALT || 10, 10);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await utils.hashPassword(password, salt);
        const newUser = await User.create({ userName, email, password: hashedPassword });
        return ResponseResult.send(res, ResponseResult.success(newUser));
    } catch (error) {
        // console.error('Error during user registration:', error); // 添加详细的错误信息输出
        logger2.error(`Error: ${error.message}\nStack: ${error.stack}`)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return ResponseResult.send(res, ResponseResult.error(409, 'Email or username already exists'));
        }
        return ResponseResult.send(res, ResponseResult.error(500, error.message));
    }
};
