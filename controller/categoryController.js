const utils = require('../utils/utils');
const ResponseResult = require('../utils/ResponseResult');
const Category = require('../models/Category.js')
//获取分组列表
exports.listCategory=async (req,res)=>{
    const data=await Category.findAll()
    return ResponseResult.send(res,ResponseResult.success(data))
}