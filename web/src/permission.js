import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import Store from '@/store';
import { getToken, removeToken } from '@/utils/auth';
import Router, { asyncRoutes } from '@/router';


// 配置进度条
Nprogress.configure({ showSpinner: false });

// 进入路由前
Router.beforeEach(async (to, from, next) => {
  const { title, role } = Store.getters;
  const token = getToken();

  // 1. 进度条开始
  Nprogress.start();

  // 2. 网站信息是否获取？
  if (!title || title.length === 0) {
    await Store.dispatch('app/getApp');
  }

  // 3. 是否有 token 操作
  if (token && (!role || role.length < 1)) {
    // 3.1 获取用户信息
    await Store.dispatch('user/getInfo')
      .then(async () => {
        // 路由添加
        await asyncRoutes();
      })
      .catch(() => {
        // 验证失败移除token
        removeToken();
      });
    // 3.2 判断是否有历史记录
    let path = null;
    const { username, history } = Store.getters;
    if (history.indexOf(username) !== -1) path = history;
    else path = `/${username}`;
    next({ path });
  }
  // 4. 判断路由权限
  if (to.meta && to.meta.roles && to.meta.roles.indexOf(role) === -1) {
    // 默认没登录404
    let path = '/404';
    // 登录了 401
    if (token) path = '/401';
    next({ path });
  }

  // 5. 放行
  next();
});


// 路由结束
Router.afterEach(to => {
  // 设置标题

  // 进度条结束
  Nprogress.done();
  // 设置历史路由
  if (to.name && to.name.indexOf('Err') === -1) Store.dispatch('user/setHistory', to.path);
});
