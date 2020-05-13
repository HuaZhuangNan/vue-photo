import Vue from 'vue';
import Vuex from 'vuex';
import app from './module/app';
import user from './module/user';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // 开启严格模式
  modules: {
    app,
    user,
  },
  getters,
});
