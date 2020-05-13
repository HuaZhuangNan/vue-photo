
/**
 * @description 是否含有空格符号
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export function haveSpace(str) {
  return /\s/g.test(str);
}
/**
 * @description 是否字母开头可以后面可以数字 '-' '_'  5-20的用户名
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export function validUserName(str) {
  return /^[A-Za-z][A-Za-z0-9\-_]{4,19}$/.test(str);
}

/**
 * @description 是否字母开头可以后面可以数字 '-' '_' 5-20的密码
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export function validPassword(str) {
  return /^[A-Za-z0-9\-?!_]{5,20}$/.test(str);
}
/**
 * @param {string} str
 * @returns {Boolean}
 */

/**
 * @description 字母或数字 1,6位
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export function validCode(str) {
  return /^[A-Za-z0-9]{1,6}$/.test(str);
}

/**
 * @description 是否外部链接
 * @export
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @description 是否合法网址
 * @export
 * @param {string} url
 * @returns {boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @description 是否是字母
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}


/**
 * @param {string} str
 * @returns {boolean}
 */

/**
 * @description 是否字符串
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}


/**
 * @description 是否数组
 * @export
 * @param {array} arg
 * @returns {boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}
