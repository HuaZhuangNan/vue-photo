import Axios from 'axios';
import { Message } from 'element-ui';
import { getToken } from './auth';


// 创建实例
const service = Axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/api`, // 基础 url
  withCredentials: true, // 跨域发送cookies
  timeout: 5000, // 超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 发送参数
    config.url += `?t=${new Date().getTime()}`;
    // 发送用户认证
    const token = getToken();
    if (token) config.headers.Authorization = token;
    return config;
  },
  error => Promise.reject(error),
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const { data } = response;
    if (data.code && data.code >= 400) {
      Message({
        showClose: true,
        message: `${data.data}`,
        type: 'error',
      });
      return Promise.reject(data.msg);
    }
    return data;
  },
  error => Promise.reject(error),
);

export default service;
