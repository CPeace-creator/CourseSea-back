const winston = require('winston');
const path = require('path');

// 获取项目根目录
const rootDir = path.resolve(__dirname, '..');

// 创建日志实例
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(rootDir, 'logs', 'error.log'),
            level: 'error'
        })
    ],
});
const fs = require('fs');
const logDir = path.join(rootDir, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

module.exports = logger;
