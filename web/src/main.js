import Vue from 'vue';
import ElementUI from 'element-ui';
import ECharts from 'vue-echarts';
import App from './App';
import router from './router';
import store from './store';
import i18n from './locales';

import 'normalize.css/normalize.css';

import '@/scss/index.scss'; // 全局样式
import '@/icons'; // icon 图标
import './permission'; // 全局路由

// 开发模式
Vue.config.productionTip = process.env.NODE_ENV;

// 插件
Vue.use(ElementUI, {
  // size
  i18n: (key, value) => i18n.t(key, value), // 导入i18n挂载
});// elementUI
// echarts
Vue.component('v-echart', ECharts);


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
