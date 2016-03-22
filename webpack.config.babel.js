import merge             from 'webpack-merge';
import path              from 'path';
import webpack           from 'webpack';
import NpmInstallPlugin  from 'npm-install-webpack-plugin';
import HtmlPlugin        from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin       from 'clean-webpack-plugin';
import pkg               from './package.json';

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  // https://github.com/webpack/webpack/issues/300
  style : [path.join(__dirname, 'app/main.css')],
  app   : path.join(__dirname, 'app'),
  build : path.join(__dirname, 'build'),
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app   : PATHS.app,
    style : PATHS.style,
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
  },
  output: {
    path     : PATHS.build,
    filename : '[name].js',
  },
  module: {
    preLoaders: [{
      test    : /\.jsx?$/,
      loaders : ['eslint'],
      include : PATHS.app,
    }],
    loaders: [{
      test    : /\.jsx?$/,
      loaders : ['babel?cacheDirectory'],
      include : PATHS.app,
    }],
  },
  plugins : [
    new HtmlPlugin({
      template   : 'node_modules/html-webpack-template/index.ejs',
      title      : 'Kanban app',
      appMountId : 'app',
      inject     : false,
    }),
  ],
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool   : 'eval-source-map',
    devServer : {
      historyApiFallback : true,
      hot                : true,
      inline             : true,
      progress           : true,
      stats              : 'errors-only',
      host               : process.env.HOST,
      port               : process.env.PORT,
    },
    module : {
      loaders : [{
        test    : /\.css$/,
        loaders : ['style', 'css'],
        include : PATHS.app,
      }],
    },
    plugins   : [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save : true,
      }),
    ],
  });
}

if(TARGET === 'build')  {
  module.exports = merge(common, {
    entry : {
      vendor : Object.keys(pkg.dependencies).filter(name => name !== 'alt-utils'),
    },
    output : {
      path          : PATHS.build,
      filename      : '[name].[chunkhash].js',
      chunkFilename : '[chunkhash].js',
    },
    module : {
      loaders : [{
        test    : /\.css$/,
        loader : ExtractTextPlugin.extract('style', 'css'),
        include : PATHS.app,
      }],
    },
    plugins : [
      new CleanPlugin([PATHS.build], {
        verbose : false,
      }),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        names : ['vendor', 'manifest'],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV' : '"production"',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress : {
          warnings : false,
        },
      }),
    ],
  });
}
