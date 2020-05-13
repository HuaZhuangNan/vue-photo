import request from '@/utils/request';

const baseURL = '/app';


/**
 * @description 获取程序信息
 * @export
 * @returns
 */
export function GetApp() {
  return request({
    url: `${baseURL}/`,
    method: 'get',
  });
}


/**
 * @description 修改程序信息
 * @export
 * @param {object} data
 * @returns
 */
export function PutApp(data) {
  return request({
    url: `${baseURL}/`,
    method: 'put',
    data,
  });
}


/**
 * @description 修改Logo
 * @export
 * @param {object} data
 * @returns
 */
export function PutLogo(data) {
  return request({
    url: `${baseURL}/logo`,
    method: 'put',
    data,
  });
}

/**
 * @description 获取服务器信息
 * @export
 * @returns
 */
export function GetServe() {
  return request({
    url: `${baseURL}/serve`,
    method: 'get',
  });
}

/**
 * @description 修改服务器配置
 * @export
 * @param {object} data
 * @returns
 */
export function PutServe(data) {
  return request({
    url: `${baseURL}/serve`,
    method: 'put',
    data,
  });
}


/**
 * @description 获取统计信息
 * @export
 * @returns
 */
export function GetStatistic() {
  return request({
    url: `${baseURL}/statistic`,
    method: 'get',
  });
}
