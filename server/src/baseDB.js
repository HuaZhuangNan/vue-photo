module.exports = {
  // 数据库预数据
  app: {
    title: 'vue-express-photo',
    logo: '/static/logo.png',
    keywords: 'vue,express,photo,photo system',
    description: '一个vue+express全栈的图片管理系统',
    version: '0.1.0',
    author: 'HuaZhuangNan',
    icp: '备案号。。。。。。',
    create_time: new Date().getTime(),
  },
  config: { // 配置
    img_size: 2 * 1024 * 1024,
    proxy: [
      '127.0.0.1',
    ],
    cors_origin: [ // 空表示所有

    ],
    cors_methods: [
      'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE',
    ],
    img_types: ['bmp', 'jpg', 'png', 'gif', 'tif', 'svg'],
  },
  statistics: { // 信息

  },
  user: [
    {
      email: 'admin@test.com', // 管理员
      username: 'admin',
      password: 'admin',
      role: 'admin',
      avatar: 'static/login.png',
      history: '/admin',
    },
    {
      email: 'user123@test.com', // 用户
      username: 'user123',
      password: 'user123',
      avatar: 'static/login.png',
      history: '/user123',
    },
  ],
  label: [
    {
      username: 'admin',
      label_name: 'default',
    },
    {
      username: 'user123',
      label_name: 'default',
    },
  ],
};
