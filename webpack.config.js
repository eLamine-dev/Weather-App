const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
   mode: 'development',
   entry: './src/app.js',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: '[name][ext]',
      clean: true,
   },
   devtool: 'inline-source-map',
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
         },

         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },

         // {
         //    test: /\.(?:js|mjs|cjs)$/,
         //    exclude: /node_modules/,
         //    use: {
         //       loader: 'babel-loader',
         //       options: {
         //          presets: [['@babel/preset-env', { targets: 'defaults' }]],
         //       },
         //    },
         // },
      ],
   },

   plugins: [
      new HtmlWebpackPlugin({
         title: 'Weather-app',
         filename: 'index.html',
         template: path.resolve(__dirname, './src/index.html'),
      }),
   ],
};
