/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const express = require('express');
const resBody = require('../util/res-body');
const { validateLogin } = require('../util/validate');

// 防止引入其他模型
const crudArr = ['user', 'img', 'label'];
/**
 * @description 获取模型对象
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function requireModel(req, res, next) {
  let model = null;
  const { resource } = req.params;
  // 是否接口符合
  if (!resource || crudArr.indexOf(resource) === -1) return res.status(200).send(resBody(404));

  // 模型文件夹是否有
  const className = `${resource.toLowerCase().charAt(0).toUpperCase()}${resource.slice(1)}`; // 第一个大写
  model = await require(`../model/module/${className}`);

  // 返回模型
  req.model = model;
  req.className = className;
  return next();
}


module.exports = app => {
  // 配置
  const { config } = app.locals.GLOBAL;

  // router对象
  const router = express.Router({
    mergeParams: true, // 合并参数
  });

  // 添加
  router.post('/add', async (req, res) => {
    const { model, className } = req;
    const { role } = req.session.user;

    // limitDO 上传图片
    if (className === 'Img') return res.status(404).send(resBody(404));

    // 用户
    if (className === 'User' && role === 'user') return res.status(404).send(resBody(404));

    // 其他
    try {
      await model.create(req.body);
    } catch (error) {
      return res.status(200).send(resBody(204));
    }
    return res.status(200).send(resBody(201));
  });

  // 获取
  router.get('/', async (req, res) => {
    const { model, className } = req;
    const { role, username } = req.session.user;
    const { offset, limit } = req;

    // 用户
    if (className === 'User' && (role === 'user' || (!offset && !limit))) {
      const data = await model.findOne({ username }, { _id: 0, __v: 0 });
      return res.status(200).send(resBody(200, data));
    }

    // 其他
    let result = null;
    if (offset && limit && limit < 50) { // 最多50个
      if (req.session.role === 'admin') { // 管理员获得所有用户数据
        result = await model.find().skip(offset).limit(limit);
      } else {
        result = await model.find({ username }, { __v: 0 }).skip(offset).limit(limit);
      }
      return res.status(200).send(resBody(200, result));
    }
    return res.status(200).send(resBody(404));
  });

  // 获取特殊结果
  router.get('/:id', async (req, res) => {
    const { model, className } = req;
    const { role, username } = req.session.user;

    // 用户
    if (className === 'User' && role === 'user') return res.status(404).send(resBody(404));

    let params = null;
    if (role === 'user') params = { _id: req.params.id, username };
    else params = { _id: req.params.id };
    const result = await model.find(params);
    // 不是管理员只可以获取自己的
    if (role !== 'admin' && result.username !== username) return res.status(404).send(resBody(404));
    if (result !== null) {
      return res.status(200).send(resBody(200));
    }
    return res.status(200).send(resBody(404));
  });

  // 修改
  router.put('/:id', async (req, res) => {
    const { model, className } = req;
    const { role, id, username } = req.session.user;

    // 如果不是管理员不可以修改不属于自己的数据
    if (className === 'User' && role !== 'admin' && id !== req.params.id) return res.status(404).send(resBody(404));

    let params = null;
    if (role === 'user') params = { _id: req.params.id, username };
    else params = { _id: req.params.id };
    const result = await model.findByIdAndUpdate(params, req.body);
    if (result !== null) {
      return res.status(200).send(resBody(200));
    }
    return res.status(200).send(resBody(404));
  });
  // 删除
  router.delete('/:id', async (req, res) => {
    const { model, className } = req;
    const { role, id, username } = req.session.user;

    // 如果不是管理员不可以修改不属于自己的数据
    if (className === 'User' && role !== 'admin' && id !== req.params.id) return res.status(404).send(resBody(404));

    let params = null;
    if (role === 'user') params = { _id: req.params.id, username };
    else params = { _id: req.params.id };
    const result = await model.findByIdAndDelete(params);
    if (result !== null) {
      return res.status(200).send(resBody(200));
    }
    return res.status(200).send(resBody(404));
  });

  // 挂载
  app.use(`${config.baseURL}/:resource`, validateLogin, requireModel, router);
};
