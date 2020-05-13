import config from '@/config';

const { title } = config;
/**
 * @description 获取当前页面标题
 * @export
 * @param {string} pageTitle
 * @returns {string} 返回标题名字
 */
export function getPageTitle(pageTitle) {
  if (typeof pageTitle === 'string' && pageTitle.length > 0) {
    return `${pageTitle}-${title}`;
  }
  return `${title}`;
}

// /**
//  * @description 返回设备名
//  * @returns {string} pc|pad|android|iphone
//  */
// function getDevice (){
//   let device = '';
//   return device;
// }

/**
 * @description 格式化日期
 * @export
 * @param {string} [fmt='YYYY-MM-DD hh:mm:ss']
 * @param {number，Date} [time=new Date()]
 * @returns
 */
export function dateFormat(fmt = 'YYYY-MM-DD hh:mm:ss', time = new Date()) {
  let res = '';
  let str = fmt;
  const date = typeof time === 'number' ? new Date(time) : time;
  const obj = {
    Y: date.getFullYear().toString(),
    M: (date.getMonth() - 1).toString(),
    D: date.getDay().toString(),
    h: date.getHours().toString(),
    m: date.getMinutes().toString(),
    s: date.getSeconds().toString(),
  };
  Object.keys(obj).forEach(key => {
    if ({}.hasOwnProperty.call(obj, key)) {
      res = new RegExp(`${key}+`).exec(str);
      if (res !== null) str = str.replace(res[1], (res[1].length === 1) ? (obj[key]) : (obj[key].padStart(res[1].length, '0')));
    }
  });
  return str;
}

/**
 * @description 去除所有的空白
 * @export
 * @param {string} str
 * @returns
 */
export function trimAll(str) {
  if (typeof str !== 'string') throw new Error('str is a string');
  return str.replace(/\s*/, '');
}
