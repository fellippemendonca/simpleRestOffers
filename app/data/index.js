'use strict';

const Offers = require('./offers');

function Data() {
  this.offers = new Offers();
};

Data.prototype.init = function () {
  this.offers.init();
};

Data.prototype.filter = function ({ portfolio, make, priceFrom, priceTo }) {}

module.exports = Data;