import Err from '@/views/Err';

export default [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      title: 'login',
    },
  },
  {
    path: '/401',
    name: 'Err401',
    component: Err,
    meta: {
      title: '401',
    },
  },
  {
    path: '/404',
    name: 'Err404',
    component: Err,
    meta: {
      title: '404',
    },
  },
  {
    path: '*',
    redirect: '/404',
  },
];
