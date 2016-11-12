/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

let port = config.port;

if(process.env.NODE_ENV == 'production') port = process.env.PORT;

new WebpackDevServer(webpack(config), config.devServer)
.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + port);
  console.log('Opening your system browser...');
  open('http://localhost:' + port);
});
