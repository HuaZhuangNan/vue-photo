const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String, unique: true }, // 用户名
  img_name: { type: String, unique: true }, // 图片名
  labels: { type: Array }, // 标签
  type: { type: String }, // 类型
  size: { type: Number }, // 大小字节
  time: { type: Date, default: Date.now() }, // 上传时间
  url: { type: String }, // 引用地址
  path: { type: String }, // 保存路径
});

// 导出图片模型
module.exports = mongoose.model('Img', schema);
