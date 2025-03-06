const jwt = require('jsonwebtoken');
const ResponseResult = require('../utils/ResponseResult');

const authMiddleware = (req, res, next) => {
    // 获取请求头中的 Authorization 字段
    const token = req.headers['token'];

    // 如果没有 Token，返回错误信息
    if (!token) {
        return ResponseResult.send(res, ResponseResult.error(401, '未提供 Token'));
    }

    // 验证 Token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return ResponseResult.send(res, ResponseResult.error(403, 'Token无效'));
        }

        // 检查解码后的 token 中是否包含 userId
        if (!decoded.userId) {
            return ResponseResult.send(res, ResponseResult.error(403, 'Token中未包含 userId'));
        }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
