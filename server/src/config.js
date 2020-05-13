const path = require('path');
const pack = require('../package.json');

module.exports = {
  log: { // 日志有关
    size: '10M',
    compress: 'gzip',
    interval: '1d',
    path: path.join(__dirname, 'logs'),
  },
  cors: { // 跨域
    credentials: true,
    maxAge: 60 * 60 * 1000, // 60 分钟
  },
  cacheTime: '1d', // 缓存时间
  session: { // session 设置
    secret: pack.version,
    cookieTime: 3 * 24 * 60 * 60 * 1000, // 3d
    sameSite: 'none',
  },
  db: { // 数据库
    url: 'mongodb://localhost:27017',
    dbName: 'photo-system',
  },
  baseURL: '/api', // 基础路径
  webPath: path.join(__dirname, 'web'), // web文件夹
  staticPath: path.join(__dirname, 'assets'),
  uploadPath: path.join(__dirname, 'uploads'), // 上传路径
};
