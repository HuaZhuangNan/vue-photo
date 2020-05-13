const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: { type: String, unique: true }, // 邮件
  username: { type: String, unique: true }, // 名字
  password: { type: String }, // 密码
  avatar: { type: String, default: '/static/login.png' }, // 头像
  theme: { type: String, default: 'default' }, // 主题
  role: { type: String, default: 'user' }, // 角色
  ip: { type: Array }, // ip 地址数组
  language: { type: String, default: 'zh-CN' }, // 语言
  history: { type: String }, // 历史路由
  sidebar: { type: Boolean, default: true }, // 侧边栏
  create_time: { type: Date, default: new Date().getTime() }, // 创建时间
  login_count: { type: Number, default: 0 }, // 登录次数
  img_count: { type: Number, default: 0 }, // 图片总数
  visit_count: { type: Number, default: 0 }, // 图片访问总数
  img_visit_counts: { type: Array, default: new Array(31) }, // 图片访问统计一个月，几号就是下标-1
});

// 导出用户信息模型
module.exports = mongoose.model('UserInfo', schema);
