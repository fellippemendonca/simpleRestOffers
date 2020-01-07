'use strict';

const logging = require('./logging');

function init(options) {
    logging.init(options);
}

module.exports = { init };
