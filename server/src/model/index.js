const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
module.exports = async app => {
  const { db } = app.locals.GLOBAL.config;
  // 配置
  mongoose.set('useCreateIndex', true);
  await mongoose.connect(`${db.url}/${db.dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // 连接成功
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connection success');
  });
  // 发生错误
  mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err}`);
    process.exit(1);
  });
  // 断开连接
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
  });
};
