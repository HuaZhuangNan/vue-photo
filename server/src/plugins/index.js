const cors = require('cors'); // 跨域
const morgan = require('morgan'); // 日志
const rfs = require('rotating-file-stream'); // 文件分割
const compression = require('compression'); // 压缩
const session = require('express-session'); // session

const util = require('../util/index');


module.exports = app => {
  // 数据
  const { config } = app.locals.GLOBAL;
  // 信任代理
  app.set('trust proxy', ip => {
    if (config.proxy.indexOf(ip) !== -1) return true;
    return false;
  });
  // 关了标识头
  app.disable('x-powered-by');
  // 解决跨域
  app.use(cors({
    ...config.cors,
    origin: config.cors_origin.length > 0 ? config.cors_origin : true,
    methods: config.cors_methods,
  }));
  // 压缩响应
  app.use(compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }));
  // 写日志
  app.use(morgan('combined', { stream: rfs.createStream(`${util.dateFormat('YYYY-MM-DD')}.log`, config.log) }));
  // session 设置
  app.use(session({
    secret: config.session.secret, // 版本变了签名也变了
    resave: false,
    saveUninitialized: true,
    key: '_u_',
    cookie: {
      path: '/',
      maxAge: config.session.cookieTime,
      httpOnly: true,
      secure: app.get('env') !== 'development',
      sameSite: config.session.sameSite,
    },
  }));
};
