/**
 * @description 格式化时间
 * @param {string} fmt YYYY-MM-DD hh:mm:ss
 * @param {object,number} time
 * @returns 格式化后的时间
 */
function dateFormat(fmt = 'YYYY-MM-DD hh:mm:ss', time = new Date()) {
  let res = '';
  // 1586875676681
  let date = typeof (time) === 'number' ? new Date(time) : time;
  let str = fmt;
  const obj = {
    Y: date.getFullYear().toString(), // 年
    M: (date.getMonth() + 1).toString(), // 月
    D: date.getDate().toString(), // 日
    h: date.getHours().toString(), // 时
    m: date.getMinutes().toString(), // 分
    s: date.getSeconds().toString(), // 秒
  };
  Object.keys(obj).forEach(key => {
    if ({}.hasOwnProperty.call(obj, key)) {
      res = new RegExp(`(${key}+)`).exec(str);
      if (res) str = str.replace(res[1], (res[1].length === 1) ? (obj[key]) : (obj[key].padStart(res[1].length, '0')));
    }
  });

  date = null;
  res = null;
  return str;
}

/**
 * @description 去除空白
 * @param {string,number} str
 * @returns 去除空白后的字符串
 */
function trimAll(str) {
  let param = str;
  param = typeof (param) === 'number' ? param.toString() : param;
  return param.replace(/\s*/g, '');
}

/**
 * @description 获取请求客户端Ip
 * @param {string} req
 * @returns
 */
function getReqIp(req) {
  // 通过req的hearers来获取客户端ip
  let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']
    || req.connection.remoteAddres || req.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    [ip] = ip.split(',');
  }
  return ip;
}

module.exports = {
  dateFormat,
  trimAll,
  getReqIp,
};
