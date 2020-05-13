const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String }, // 用户名
  label_name: { type: String }, // 标签名
});

// 导出标签模型
module.exports = mongoose.model('Label', schema);
