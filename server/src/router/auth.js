/* eslint-disable no-underscore-dangle */
const express = require('express');
const uuid = require('node-uuid');
const { strCode } = require('../util/captcha');
const resBody = require('../util/res-body');
const { validUserName, validEmail, validPassword } = require('../util/validate');
const { getReqIp } = require('../util/index');

const Users = require('../model/module/User');

/**
 * @description 检验数据合法性
 */
async function validateData(req, res, next) {
  const {
    user, email, pass, code,
  } = req.body;
  // 检测验证码
  const sessionCode = req.session.code;
  delete req.session.code; // 删除 code
  if (!code || code !== sessionCode) {
    return res.status(200).json(resBody(401, 'code error'));
  }

  // 检测用户名 // 检测邮箱 // 检测密码
  let isValidate = false;

  if (req.path === '/login') { // 如果是登录，email为空,
    isValidate = user && pass && validPassword(pass) && (validEmail(user) || validUserName(user));
  } else {
    isValidate = user && pass && email
      && validPassword(pass) && validEmail(email) && validUserName(user);
  }
  if (!isValidate) {
    return res.status(200).json(resBody(401, 'info error'));
  }
  let userInfo = null;
  // 判断是用户名还是邮箱
  userInfo = await Users.findOne({
    $or: [{ username: user, password: pass },
      { email: user, password: pass }],
  }, { __v: 0 }, { lean: true });
  isValidate = !!userInfo;
  // 返回是否存在
  req.isValidate = isValidate;
  if (isValidate) {
    req.user = userInfo;
  }
  return next();
}

/**
 * @description 注册
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function Register(req, res, next) {
  const {
    user, email, pass,
  } = req.body;
  // 用户存在不可以注册
  if (req.isValidate) {
    return res.status(200).json(resBody(401, 'user exists'));
  }
  delete req.isValidate; // 删除验证
  // 不存在可以注册
  const ip = getReqIp(req);
  const userInfo = await Users.create({
    username: user,
    email,
    password: pass,
    ip,
    history: `/${user}`,
  });
  if (userInfo) {
    return next();
  }
  res.status(200).json(resBody(500));
}

/**
 * @description 登录
 * @param {*} req
 * @param {*} res
 * @returns
 */
function Login(req, res, next) {
  // 验证通过登录
  if (req.isValidate) {
    next();
    return;
  }
  res.status(200).json(resBody(401, 'info error'));
}

/**
 * @description 返回token
 * @param {*} req
 * @param {*} res
 * @returns
 */
function resToken(req, res) {
  const { user } = req;
  const token = uuid.v4();
  const id = user._id;
  delete user._id;
  // 设置 session,返回token
  req.session.user = {
    id,
    username: user.username,
    role: user.role,
    token,
  };
  req.user = null;
  // 返回 cookies
  return res.status(200).json(resBody(200, { token }));
}

module.exports = app => {
  // 配置
  const { config } = app.locals.GLOBAL;

  // router对象
  const router = express.Router({
    mergeParams: true, // 合并参数
  });

  // 获取验证码
  router.get('/code-img', (req, res) => {
    const code = strCode();
    req.session.code = code.text;
    res.status(200).type('image/svg+xml;charset=UTF-8').send(code.data);
  });
  // 登录
  router.post('/login', validateData, Login, resToken);
  // 注册
  router.post('/register', validateData, Register, resToken);

  // 注册路由
  app.use(`${config.baseURL}/auth`, router);
};
