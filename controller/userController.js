const User = require('../models/User');
const utils = require('../utils/utils');
const bcrypt = require('bcrypt');
const ResponseResult = require('../utils/ResponseResult');

//头像上传
exports.uploadAvatar=async (req,res)=>{
    const {avatar} =  req.body;
    const data=await User.update({avatar:avatar},{where:{id:req.user.UserId}})
    return ResponseResult.send(res,ResponseResult.success(data))
}
