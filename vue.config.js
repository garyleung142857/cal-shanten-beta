const WorkerPlugin = require('worker-plugin');

module.exports = {
  chainWebpack: config => {
    config.plugin('worker').use(WorkerPlugin);
  },
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/cal-shanten-beta/'
}
