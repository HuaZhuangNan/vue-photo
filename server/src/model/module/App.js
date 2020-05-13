const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String }, // 标题
  logo: { type: String },
  keywords: { type: String }, // 关键字
  description: { type: String }, // 说明
  version: { type: String }, // 版本
  author: { type: String }, // 作者
  icp: { type: String }, // 备案
  api: { type: String }, // api 路径
  create_time: { type: Number }, // 创建时间
  is_close: { type: Boolean, default: false }, // 是否关站
  is_login: { type: Boolean, default: true }, // 是否可以登录
  is_register: { type: Boolean, default: true }, // 是否可以注册
  visit_code: { type: String, default: '' }, // 第三方统计代码
});

// 导出app模型
module.exports = mongoose.model('App', schema);
