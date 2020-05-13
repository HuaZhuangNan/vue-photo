import AppMain from '@/layout/components/AppMain';

export default [
  {
    path: 'dashboard', // 首页分析
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'el-icon-s-marketing',
    },
    component: () => import('@/views/dashboard'),
  },
  {
    path: 'user', // 用户管理
    name: 'User',
    redirect: { name: 'UserInfo' },
    component: AppMain,
    meta: {
      title: 'user-info',
      icon: 'el-icon-user-solid',
    },
    children: [
      {
        path: 'info', // 个人信息查看修改
        name: 'UserInfo',
        meta: {
          title: 'user-info',
          icon: 'el-icon-user-solid',
        },
        component: () => import('@/views/user-info'),
      },
      {
        path: 'avatar', // 个人修改头像
        name: 'Avatar',
        meta: {
          title: 'user-avatar',
          icon: 'el-icon-picture',
        },
        component: () => import('@/views/avatar'),
      },
      {
        path: 'users', // 所有用户，删除，添加操作
        name: 'Users',
        meta: {
          title: 'user-all',
          role: ['admin'],
          icon: 'el-icon-user-solid',
        },
        component: () => import('@/views/users'),
      },
    ],
  },
  {
    path: 'img', // 图片管理
    name: 'Img',
    redirect: { name: 'ImgInfo' },
    component: AppMain,
    meta: {
      icon: 'el-icon-picture',
    },
    children: [
      {
        path: 'info', // 图片信息，包含获取修改
        name: 'ImgInfo',
        meta: {
          title: 'img-info',
          icon: 'el-icon-picture',
        },
      },
      {
        path: 'add', // 添加图片
        name: 'ImgAdd',
        meta: {
          title: 'img-add',
          icon: 'el-icon-upload',
        },
      },
      {
        path: 'del', // 删除图片
        name: 'ImgDel',
        meta: {
          title: 'img-del',
          icon: 'el-icon-delete-solid',
        },
      },
    ],
  },
  {
    path: 'label', // 标签管理
    name: 'Label',
    redirect: { name: 'LabelAll' },
    component: AppMain,
    meta: {
      icon: 'el-icon-s-management',
    },
    children: [
      {
        path: 'all', // 标签管理，管理员看的到所有标签
        name: 'LabelAll',
        meta: {
          title: 'label-all',
          icon: 'el-icon-s-management',
        },
      },
    ],
  },
  {
    path: 'setting', // 设置
    name: 'Setting',
    redirect: { name: 'SettingLogo' },
    component: AppMain,
    meta: {
      icon: 'el-icon-setting',
    },
    children: [
      {
        path: 'logo', // 修改logo
        name: 'SettingLogo',
        meta: {
          title: 'setting-logo',
          role: ['admin'],
          icon: 'el-icon-picture',
        },
        component: () => import('@/layout'),
      },
      {
        path: 'info', // 修改设置
        name: 'SettingInfo',
        meta: {
          title: 'setting-info',
          role: ['admin'],
          icon: 'el-icon-setting',
        },
        component: () => import('@/layout'),
      },
      {
        path: 'serve', // 修改服务设置
        name: 'SettingServe',
        meta: {
          title: 'setting-serve',
          role: ['admin'],
          icon: 'el-icon-setting',
        },
        component: () => import('@/layout'),
      },
    ],
  },

];
