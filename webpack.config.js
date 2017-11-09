const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// one is setting the env to 'production' on Heroku , the other one is setting env as 'test'
// if neither then it is 'development'

if(process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test'});
} else if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development'});
}

// placing object inside a func when ready for production
// advantage of func is that you can use params
module.exports = (env) => {
  const isProduction = env === 'production';
// make new instance of plugin, we have to pass name of file as arg
 const CSSExtract = new ExtractTextPlugin('styles.css')
  console.log('env', env);
  return {
  entry: ['babel-polyfill','./src/app.js'],
  output: {  // first is path, second is file name
    // path is the absolute path on your machine to where you want to
    // output that webpack file, we want to put in the public folder of this project
    // we can't use ./ , needs to be an absolute path

    //now we have access to path.join & we can use it to join our 2 paths
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  }, // setting up loader
  module: { // rules defines how you want to use your loader
    rules: [{
      loader: 'babel-loader', // what loader are we trying to use?
      test: /\.js$/, // what files do we actually want to run this loader on?
      exclude: /node_modules/ // lets us exclude a given set of files in our case the node modules
    }, {
      test: /\.s?css$/ ,  // target all files that end in .css
      // how we define how we want our abstraction to work , we deleted arrays of use
      use: CSSExtract.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }]
  },
  plugins: [
    CSSExtract, // going to extract css to their own files out of bundle.js
    new webpack.DefinePlugin({
// setting value in client side JS in order to get same value from NODE ENV
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)

    })
  ],
  devtool: isProduction ? 'source-map' :'inline-source-map',
  devServer: { // setting up webpack devserver
  // many other config options available in Webpack devserver documentation
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true, // tells our dev server that we are going to be
    // handling routing via our client side & that it should return this page
    publicPath: '/dist/' // adding dist to our public path since we want all webpack
    // bundle files to be in one folder

  }
};

}


