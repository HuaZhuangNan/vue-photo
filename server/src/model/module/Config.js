const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  img_size: { type: String }, // 上传允许大小
  proxy: { type: Array }, // 代理设置
  cors_origin: { type: Array }, // 跨域头设置
  cors_methods: { type: Array }, // 跨域方法设置
  img_types: { type: Array }, // 上传图片允许类型
});

// 导出权限模型
module.exports = mongoose.model('Config', schema);
