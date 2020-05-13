/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const configModel = require('./model/module/Config');

module.exports = async app => {
  const { config } = app.locals.GLOBAL;
  // 一些其他配置
  if (!config.admin_url) {
    const appConfig = await configModel.findOne({ __v: 0 }, { _id: 0, __v: 0 }, { lean: true });
    app.locals.GLOBAL.config = {
      ...config,
      ...appConfig,
    };
  }
  console.log('app init success');
  console.log('app api url: ', app.locals.GLOBAL.config.baseURL);
};
