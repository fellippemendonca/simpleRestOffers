'use strict';

const Offers = require('./offers');

function init(options) {
  const offers = new Offers(options);
}

module.exports = { init };
