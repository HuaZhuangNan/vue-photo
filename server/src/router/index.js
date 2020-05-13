const express = require('express');
const resBody = require('../util/res-body');
const { validateQuery } = require('../util/validate');

// 模块
const authRoute = require('./auth');
const crudRoute = require('./crud');
const appRoute = require('./app');

module.exports = async app => {
  // 配置
  const { config } = app.locals.GLOBAL;
  // web路径
  app.use('/', express.static(config.webPath));
  // 静态文件目录
  app.use('/static', express.static(config.staticPath));

  // 访问api目录一定要带get参数 t
  app.use(`${config.baseURL}/*`, validateQuery);
  // 模块
  authRoute(app);
  appRoute(app);
  crudRoute(app);// 一定放最后

  // 处理 404
  app.use((req, res) => {
    res.status(404).json(resBody(404));
  });
  // 错误处理
  app.use((err, req, res) => {
    res.status(err.status).json(resBody(500));
  });
};
