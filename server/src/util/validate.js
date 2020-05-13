const resBody = require('./res-body');
/**
 * @description 5-20位用户名
 * @export
 * @param {string} str
 * @returns {boolean}
 */
function validUserName(str) {
  return /^[A-Za-z][A-Za-z0-9\-_]{4,19}$/.test(str);
}
/**
 * @description 是否字母开头可以后面可以数字 '-' '_' 5-20的密码
 * @export
 * @param {string} str
 * @returns {boolean}
 */
function validPassword(str) {
  return /^[A-Za-z0-9\-?!_]{5,20}$/.test(str);
}
/**
 * @description 邮箱合法性
 * @export
 * @param {string} str
 * @returns {boolean}
 */
function validEmail(str) {
  return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(str);
}


/**
 * @description 验证是否含有 t 参数，并且请求在5秒之内发出的
 */
function validateQuery(req, res, next) {
  const { t } = req.query;
  // eslint-disable-next-line no-restricted-globals
  const time = new Date().getTime() - (isNaN(t) ? 0 : t);
  // 时间过了5000就过时
  if (time <= 5000) {
    return next();
  }
  return res.status(200).send(resBody(404));
}

/**
 * @description 验证是否登录
 */
function validateLogin(req, res, next) {
  const token = req.get('Authorization');
  if (token && req.session.user && token === req.session.user.token) {
    return next();
  }
  return res.status(200).send(resBody(401));
}

/**
 * @description 验证是否管理员
 */
function validateAdmin(req, res, next) {
  if (req.session.user.role && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(200).send(resBody(401));
}


module.exports = {
  validUserName,
  validEmail,
  validPassword,
  validateQuery,
  validateLogin,
  validateAdmin,
};
