const fs = require('fs');
// 初始化数据
const baseDB = require('./baseDB');
// 数据库
const appModel = require('./model/module/App');
const configModel = require('./model/module/Config');
const statisticModel = require('./model/module/Statistic');

const userModel = require('./model/module/User');
const LabelModel = require('./model/module/Labels');
const imgModel = require('./model/module/Img');


module.exports = async (app, installFile) => {
  console.log('app install ...');
  try {
    const { config } = app.locals.GLOBAL;
    // 创建文件夹
    if (!fs.existsSync(config.log.path)) {
      fs.mkdirSync(config.log.path);
      console.log(`mkdir ${config.log.path} success`);
    }
    if (!fs.existsSync(config.uploadPath)) {
      fs.mkdirSync(config.uploadPath);
      console.log(`mkdir ${config.uploadPath} success`);
    }
    // 数据库初始化
    await appModel.init();
    await configModel.init();
    await statisticModel.init();

    await userModel.init();
    await imgModel.init();
    await LabelModel.init();

    // 数据初始化
    let result = await appModel.create(baseDB.app);
    if (!result) throw new Error('app model init data error');

    result = await configModel.create(baseDB.config);
    if (!result) throw new Error('config model init data error');

    result = await statisticModel.create(baseDB.statistics);
    if (!result) throw new Error('statistic model init data error');

    result = await userModel.insertMany(baseDB.user);
    if (!result) throw new Error('user model init data error');

    result = await LabelModel.insertMany(baseDB.label);
    if (!result) throw new Error('label model init data error');

    // 安装完成
    await fs.writeFileSync(installFile, JSON.stringify({ create_time: baseDB.app.create_time }));
    console.log('app install success');
  } catch (error) {
    console.error('app install error');
    console.error(error);
    process.exit(1);
  }
};
