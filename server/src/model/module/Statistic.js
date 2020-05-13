const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  visit_count: { type: Number, default: 0 }, // 网站总访问次数
  visit_counts: { type: Array, default: new Array(31) }, // 网站访问统计，几号就是下标-1

  user_count: { type: Number, default: 0 }, // 用户总数

  img_count: { type: Number, default: 0 }, // 图片总数
  img_visit_count: { type: Number, default: 0 }, // 图片访问总数
  img_visits: { type: Array, default: new Array(31) }, // 图片访问统计一个月，几号就是下标-1
});

// 导出统计模型
module.exports = mongoose.model('Statistic', schema);
