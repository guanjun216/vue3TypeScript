/* jshint esversion:6 */
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const path = require("path");
const merge = require("webpack-merge");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const cdn = {
  css: [],
  js: [],
};
// const host = window.location.host;
const externals = {};
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  productionSourceMap: false, // 关闭sourceMap
  devServer: {
    host: process.env.VUE_APP_MY_URL, //target host
    port: 8080,
    open: true,
    hot: true,
  },
  lintOnSave: false,
  configureWebpack: {
    // Webpack配置
    devtool: "none", // webpack内关闭sourceMap
    optimization: {
      // 优化配置
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          // 拆分Vue
          vue: {
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            name: "chunk-vue",
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve("src"), // 主目录
        views: resolve("src/views"), // 页面
        components: resolve("src/components"), // 组件
        api: resolve("src/api"), // 接口
        utils: resolve("src/utils"), // 通用功能
        assets: resolve("src/assets"), // 静态资源
        style: resolve("src/style"), // 通用样式
      },
    },
  },
  chainWebpack(config) {
    if (IS_PRODUCTION) {
      config.plugin("html").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
      config.externals(externals);
      config.plugin("html").tap((args) => {
        args[0].minify.minifyCSS = true;
        return args;
      });
      // gzip需要nginx进行配合
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 超过10k进行压缩
            deleteOriginalAssets: true, // 是否删除源文件，这里最好不要删除
          },
        ]);
    }
    // config.module
    //   .rule("scss")
    //   .use("sass-loader")
    //   .tap((options) =>
    //     merge(options, {
    //       includePaths: [path.resolve(__dirname, "node_modules")],
    //     })
    //   );
    // config.module
    //   .rule("less")
    //   .use("less-loader")
    //   .tap((options) =>
    //     merge(options, {
    //       includePaths: [path.resolve(__dirname, "node_modules")],
    //     })
    //   );
    // config.module
    //   .rule("css")
    //   .use("css-loader")
    //   .tap((options) =>
    //     merge(options, {
    //       includePaths: [path.resolve(__dirname, "node_modules")],
    //     })
    //   );
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!IS_PRODUCTION,
    // 开启 CSS source maps?
    sourceMap: true,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false,
    loaderOptions: {
      sass: {},
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
