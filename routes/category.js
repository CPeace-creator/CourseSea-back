const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController');

router.post('/list',CategoryController.listCategory);
module.exports = router;
