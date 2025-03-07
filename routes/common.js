const express = require('express');
const router = express.Router();
const commonController = require("../controller/commonController");
/**
 * 快速获取课程
 */
 router.post("/post",commonController.exportCourse)
 module.exports = router