import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store';
import baseRoutes from './module/base';
import localRoutes from './module/local';

Vue.use(VueRouter);

// 3.x 版本的返回异步函数的一些问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

// 创建路由函数
const createRouter = () => new VueRouter({
  mode: 'history',
  baseURL: '/',
  routes: baseRoutes,
});
// 创建对象
const Router = createRouter();
// 错误处理
Router.onError(err => {
  console.log(err);
});

/**
 * @description 动态注册添加路由
 * @export
 */
export async function asyncRoutes() {
  const { username } = Store.getters;
  const routes = [{
    path: `/${username}`, // 根据角色名注册路由
    name: username,
    component: () => import('@/layout'),
    redirect: `/${username}/dashboard`,
    children: [
      ...localRoutes, // 导入路由

    ],
  }];
  // 动态添加路由用的
  Router.addRoutes(routes);
  // 添加到缓存中去
  Store.dispatch('app/setRoutes', localRoutes);
}

/**
 * @description 重置路由
 * @export
 */
export function resetRouter() {
  const newRouter = createRouter();
  Router.matcher = newRouter.matcher; // reset router 记录
}


export default Router;
