var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var app = express();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);

module.exports=app;
