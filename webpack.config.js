const path = require('path');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {
  const isProduction = env === 'production';
  const rootDir = path.resolve(__dirname);
  const srcDir = path.join(rootDir, 'src');
  const outDir = path.join(rootDir, 'dist');
  const staticDir = path.join(rootDir, 'static');
  const assetsDir = path.join(srcDir, 'assets');
  const modulesDir = path.join(rootDir, 'node_modules');

  // ====================
  // ====== Entry =======
  // ====================
  const entry = {
    app: path.join(srcDir, 'index.tsx')
  };

  // ====================
  // ====== Rules =======
  // ====================
  const rules = [];

  // Typescript
  rules.push({
    test: /\.(ts|tsx)$/,
    include: [srcDir],
    use: [{
      loader: 'ts-loader',
      options: {
        logLevel: 'info',
      },
    }],
    exclude: ['node_modules']
  });


  // Styles
  if (isProduction) {
    rules.push({
      test: /\.scss$/,
      use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
    });
  } else {
    rules.push({
      test: /\.scss$/,
      include: [srcDir],
      use: ['style-loader', 'css-loader', 'sass-loader']
    });
  }

  // Images
  rules.push({
    test: /\.(gif|png|jpe?g|svg)$/i,
    include: [assetsDir, modulesDir],
    use: [{
      loader: 'file-loader',
      options: {
        hash: 'sha512',
        digest: 'hex',
        name: '[path][name].[ext]?[hash:6]'
      }
    }, {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
        optipng: {
          optimizationLevel: 4
        },
        gifsicle: {
          interlaced: false
        },
        mozjpeg: {
          quality: 80
        },
        svgo: {
          plugins: [
            { removeViewBox: true },
            { removeEmptyAttrs: false },
            { sortAttrs: true },
          ]
        }
      }
    }]
  });

  // Fonts
  rules.push({
    test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
    include: [assetsDir, modulesDir],
    loader: 'file-loader'
  });

  // ====================
  // ====== Plugins =====
  // ====================
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, 'index.html'),
      inject: true
    }),

    new CopyWebpackPlugin([{
      from: staticDir,
      to: outDir,
    }]),

    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: !isProduction,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
    }),
  ];

  if (isProduction) {
    plugins.push(
      new MiniCSSExtractPlugin({
        filename: `[name].[contenthash:8].css`
      })
    );
  }

  // ====================
  // ==== Dev Stuff =====
  // ====================
  let devtool = false;
  if (!isProduction) {
    devtool = 'cheap-module-eval-source-map';
  }

  // ====================
  // ====== Output ======
  // ====================
  const output = {
    path: path.join(__dirname, 'dist'),
    filename: isProduction ? `[name].[chunkhash:6].js` : '[name].js',
    publicPath: '/',
  };

  // The final config
  const config = {
    devtool,
    entry,
    output,
    module: { rules },
    plugins,
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: [srcDir, modulesDir],
    },
    performance: {
      hints: isProduction ? 'warning' : false
    },
    mode: isProduction ? 'production' : 'development',
  };

  // Serve is a tricky one, must not be on the object at all if not dev
  if (!isProduction) {
    config.serve = {
      add: (app) => {
        // CORS
        app.use((ctx, next) => {
          ctx.set('Access-Control-Allow-Origin', '*');
          ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          return next();
        });

        // History API fallback for webpack-serve
        app.use(convert(history()));
      }
    };
  }

  return config;
}
