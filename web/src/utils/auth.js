import JsCookie from 'js-cookie';

const tokenKey = 'token';
/**
 * @description 设置token
 * @param {string} str
 */
export function setToken(str, date) {
  JsCookie.set(tokenKey, str);
  if (date) JsCookie.set(tokenKey, str, { expires: date });
}

/**
 * @description 获取用户token
 * @export
 * @returns {string} token
 */
export function getToken() {
  return JsCookie.get(tokenKey);
}


/**
 * @description
 * @export
 */
export function removeToken() {
  JsCookie.remove(tokenKey);
}
