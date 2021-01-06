'use strict';
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  runtimeCompiler: true,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://localhost:7001',
        // target: 'http://119.3.160.82:9999',
        ws: true,
        changeOrigin: true,
        pathRequiresRewrite: {
          '^/admin': '/'
        }
      },
      '/excel': {
        target: 'http://localhost:7001/public',
        ws: true,
        changeOrigin: true,
        pathRequiresRewrite: {
          '^/excel': '/'
        }
      },
      '/ranqi': {
        target: 'https://10.109.19.12:10443',
        ws: true,
        changeOrigin: true,
        pathRequiresRewrite: {
          '^/ranqi': '/'
        }
      },
      '/rqserver': {
        target: 'http://obs.cn-north-1.myhuaweicloud.com',
        ws: true,
        changeOrigin: true,
        pathRequiresRewrite: {
          '^/rqserver': '/'
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // 不删除源文件
          })
        ]
      };
    }
  },
  chainWebpack (config) {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .end();
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      );
  }
};
