'use strict';

const middleware = require('../middleware');
const controllers = require('../controllers');

function init (options) {
  middleware.init(options);
  controllers.init(options);
}

module.exports = { init };
