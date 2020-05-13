const fs = require('fs');
const path = require('path');

const express = require('express');
const install = require('./install');
const init = require('./init');
const model = require('./model');
const plugins = require('./plugins');
const router = require('./router');
const defaultConfig = require('./config');

const app = express();

// 全局默认配置数据初始化
app.locals.GLOBAL = {
  config: defaultConfig,
};

// 数据库链接
model(app)
  .then(async () => {
    // 是否需要安装,数据库初始化操作
    const installFile = path.join(__dirname, './installed');
    if (!fs.existsSync(installFile)) await install(app, installFile);
  })
  .then(async () => {
    // 数据库数据挂载全局,插件路由等初始化
    await init(app);
    // 解析数据大小处理
    const { config } = app.locals.GLOBAL;
    app.use(express.json({ limit: config.img_size }));
    app.use(express.urlencoded({
      limit: config.img_size,
      extended: false,
    }));
  })
  .then(async () => {
    // 插件
    await plugins(app);
  })
  .then(async () => {
    // 路由
    await router(app);
  });

// 服务器错误处理
process.on('uncaughtException', err => {
  console.log('这里有个未捕获的同步错误', err);
});
process.on('unhandledRejection', err => {
  console.log('这里有个未处理的异步错误', err);
});

module.exports = app;
