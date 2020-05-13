const express = require('express');
const multer = require('multer');

const resBody = require('../util/res-body');
const appModel = require('../model/module/App');
const configModel = require('../model/module/Config');
const statisticModel = require('../model/module/Statistic');
const { validateLogin, validateAdmin } = require('../util/validate');

module.exports = app => {
  // 配置
  const { config } = app.locals.GLOBAL;

  // router对象
  const router = express.Router({
    mergeParams: true, // 合并参数
  });

  // 获取网站信息
  router.get('/', async (req, res) => {
    const data = await appModel.findOne({ __v: 0 }, { _id: 0, __v: 0 }, { lean: true });
    res.status(200).json(resBody(200, data));
  });

  // 修改网站信息
  router.put('/', validateLogin, validateAdmin, async (req, res) => {
    const data = await appModel.findOneAndUpdate({ __v: 0 }, req.body,
      { _id: 0, __v: 0 }, { lean: true });
    res.status(200).json(resBody(200, data));
  });

  // 获取服务器信息
  router.get('/serve', validateLogin, validateAdmin, async (req, res) => {
    const data = await configModel.findOne({ __v: 0 }, req.body,
      { _id: 0, __v: 0 }, { lean: true });
    res.status(200).json(resBody(200, data));
  });

  // 修改服务器信息
  router.put('/serve', validateLogin, validateAdmin, async (req, res) => {
    const data = await configModel.findOneAndUpdate({ __v: 0 }, req.body,
      { _id: 0, __v: 0 }, { lean: true });
    res.status(200).json(resBody(200, data));
  });

  // 获取网站统计信息
  router.get('/statistic', validateLogin, validateAdmin, async (req, res) => {
    const data = await statisticModel.findOne({ __v: 0 }, { _id: 0, __v: 0 }, { lean: true });
    res.status(200).json(resBody(200, data));
  });

  // 修改logo
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.staticPath);
    },
    filename: (req, file, cb) => {
      cb(null, `logo.${file.mimetype.require('image/')}`);
    },
  });
  function fileFilter(req, file, cb) {
    console.log(file.mimetype.require('image/'));
    if (config.img_types.indexOf(file.mimetype.require('image/')) === -1) {
      cb(null, false);
    }
  }
  const img = multer({ storage, fileFilter });
  router.put('/logo', validateLogin, validateAdmin, img.single('logo'), async (req, res) => {
    // TODO 先查询以前的图片
    // const oldLogo = await
    res.status(200).json(resBody(404));
  });

  // 挂载
  app.use(`${config.baseURL}/app`, router);
};
