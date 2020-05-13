import request from '@/utils/request';

// 登录  获取token
const baseURL = '/auth';

/**
 * @description 登录
 * @export
 * @param {object} data
 * @returns
 */
export function Login(data) {
  return request({
    url: `${baseURL}/login`,
    method: 'post',
    data,
  });
}


/**
 * @description 注册
 * @export
 * @param {object} data
 * @returns
 */
export function Register(data) {
  return request({
    url: `${baseURL}/register`,
    method: 'post',
    data,
  });
}
