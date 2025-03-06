const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.post('/upload',UserController.uploadAvatar);
module.exports = router;
