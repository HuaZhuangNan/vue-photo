
import { GetApp } from '@/api/app';

const state = {
  title: '', // 标题
  logo: '',
  keywords: '', // 关键字
  description: '', // 说明
  version: '', // 版本
  author: '', // 作者
  icp: '', // 备案号
  create_time: 0, // 创建时间
  is_close: false, //
  is_login: true, // 是否可以登录
  is_register: true, // 是否可以注册
  visit_code: '', // 第三方统计代码
  routes: [],
  code_img: `${process.env.VUE_APP_BASE_URL}/api/auth/code-img`,
};

const mutations = {
  SET_STATE: (state, data) => {
    Object.assign(state, data);
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes;
  },
};

const actions = {
  getApp({ commit }) {
    return new Promise((resolve, reject) => {
      GetApp().then(res => {
        commit('SET_STATE', res.data);
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  },
  setRoutes({ commit }, routes) {
    commit('SET_ROUTES', routes);
  },
};

export default {
  namespaced: true, // 打开命名空间
  state,
  mutations,
  actions,
};
