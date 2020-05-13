const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || isDev ? 1234 : 80;
const svgIcon = path.join(__dirname, '/src/icons');

module.exports = {
  lintOnSave: isDev,
  productionSourceMap: false,

  devServer: {
    port,
    open: true,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },

  configureWebpack: {
    resolve: {
      extensions: ['.js', 'jsx', '.vue', '.json'],
      alias: {
        '@': path.join(__dirname, '/src'),
      },
    },
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(svgIcon)
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(svgIcon)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },

  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'zh-CN',
      localeDir: 'locales/lang',
      enableInSFC: true,
    },
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: isDev,
    // css预设器配置项
    loaderOptions: {

    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
};
