var express = require('express');
var router = express.Router();
const commonController = require("../controller/commonController");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//注册
router.post("/register",commonController.register)
//登录
router.post("/login",commonController.login)
module.exports = router;
