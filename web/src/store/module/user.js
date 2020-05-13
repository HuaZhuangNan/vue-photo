import { setToken, getToken } from '@/utils/auth';
import { getLanguage, setLanguage } from '@/locales';
import { Login } from '@/api/auth';
import { GetInfo } from '@/api/user';

const state = {
  id: '',
  token: getToken(), // token
  email: '', // email
  username: '', // 用户名
  avatar: '', // 头像
  theme: '', // 主题
  role: '', // 角色
  ip: [],
  language: getLanguage(),
  history: '/',
  sidebar: true,
  create_time: 0,
  login_count: 0,
  img_count: 0,
  visit_count: 0,
  img_visit_counts: [],
};

const mutations = {
  REST_STATE: (state, data = state) => {
    Object.assign(state, data);
  },
  SET_TOKEN: (state, token, date = null) => {
    setToken(token, date);
    state.token = token;
  },
  SET_LANGUAGE: (state, language) => {
    setLanguage(language);
    state.language = language;
  },
  SET_HISTORY: (state, history) => {
    state.history = history;
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar = !state.sidebar;
  },
};

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
  },
  setHistory({ commit }, history) {
    commit('SET_HISTORY', history);
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  login({ commit }, loginData) {
    const {
      user, pass, code, rem, time,
    } = loginData;
    return new Promise((resolve, reject) => { // 异步操作
      // 登录axios
      Login({
        user, pass, code, rem, time,
      })
        .then(res => {
          if (rem) { // 记住 3天
            commit('SET_TOKEN', res.data.token, 3);
          } else {
            commit('SET_TOKEN', res.data.token);
          }
          resolve(res);
        }).catch(error => {
          reject(error);
        });
    });
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      GetInfo().then(res => {
        commit('REST_STATE', res.data);
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  },
};

export default {
  namespaced: true, // 打开命名空间
  state,
  mutations,
  actions,
};
