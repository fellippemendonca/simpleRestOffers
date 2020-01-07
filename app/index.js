'use strict';

const express = require('express');
const router = require('./router');
const Data = require('./data');

function App () {
  this.app = express();
  this.router = express.Router();
  this.data = new Data();
}

App.prototype.init = function() {
  const port = 3000;
  this.data.init();
  const options = {
    router: this.router,
    data: this.data
  };
  router.init(options);
  this.app.use('/', this.router);
  this.app.listen(port, () => console.log(`App listening on port: ${port}`))
}

module.exports = App;
