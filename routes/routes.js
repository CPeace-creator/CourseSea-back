const express = require('express');

const indexRouter = require('./index');
const usersRouter = require('./users');
const categoryRouter = require('./category');
const commonRouter = require('./common');

const authMiddleware = require('../utils/authMiddleware');

console.log('authMiddleware 类型:', typeof authMiddleware);
console.log('usersRouter 类型:', typeof usersRouter); // 检查是否是 `function`
const setRouter=(app)=>{
    app.use('/', indexRouter);
    app.use('/users', authMiddleware, usersRouter);
    app.use('/category', categoryRouter);
    app.use('/common', commonRouter);
}
module.exports = setRouter
