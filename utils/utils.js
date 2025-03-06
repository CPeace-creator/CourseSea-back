const bcrypt = require("bcrypt");
// 加密
exports.hashPassword = async (plainText, saltRounds) => {
    return await bcrypt.hash(plainText, saltRounds);
}


// 比较密码
exports.comparePassword = async (hashedPassword, password) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
};

