import request from '@/utils/request';

// 登录  获取token
const baseURL = '/user';

/**
 * @description 获取用户信息
 * @export
 * @param {object} data
 * @returns
 */
export function GetInfo(data = null) {
  return request({
    url: `${baseURL}/`,
    method: 'get',
    data,
  });
}

/**
 * @description 修改用户信息
 * @export
 * @param {object} data
 * @returns
 */
export function PutInfo(id, data) {
  return request({
    url: `${baseURL}/${id}`,
    method: 'put',
    data,
  });
}
