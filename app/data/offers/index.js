'use strict';

const restClient = require('../../../lib/restClient');
const parser = require('../../../lib/parser');
const offersJson = require('./offers.json');


function sortByPrice(unsortedOffers) {
  return unsortedOffers.sort((a,b) => {
    var priceA = a.price;
    var priceB = b.price;
    if (priceA > priceB) return 1;
    if (priceA < priceB) return -1;
    return 0;
  });
}

function Offers () {
  this.keys = {},
  this.list = [],
  this.timestamp = new Date()
}

Offers.prototype.checkExpiration = async function() {
  const timeNow = new Date().getTime();
  if (this.timestamp.getTime() < timeNow - 30000) {
    await this.init();
    return this;
  }
  return this;
}

Offers.prototype.init = async function() {
  const unsortedOffers = [];
  const options = {
    port: 443,
    host: 'assets.cluno.com',
    path: '/offer/dynamodb.export.json',
    headers: { 'Content-Type': 'Application/Json' }
  };

  let jsonData;
  try {
    const response = await restClient.httpsRequest(options);
    jsonData = JSON.parse(response.body);
  } catch(err) {
    console.log(err.stack);
    console.log(`Failed to retrieve fresh data from endpoint ${options.host}${options.path}`);
    console.log('Loading local offers.json file.');
    jsonData = offersJson;
  }

  const offers = jsonData.Items;
  offers.forEach(offer => {
    const parsedOffer = parser(offer);
    const leanOffer = {
      id: parsedOffer.id,
      teaser: parsedOffer.teaser,
      detailUrl: `https://www.cluno.com/${parsedOffer.detailUrl}`,
      labels: parsedOffer.labels,
      price: parsedOffer.pricing.price,
      make: parsedOffer.car.make,
      portfolio: parsedOffer.portfolio
    };
    if (parsedOffer.visible) {
      this.keys[offer.id.S] = parsedOffer;
      unsortedOffers.push(leanOffer);
    }
  });
  this.list = sortByPrice(unsortedOffers);
  this.timestamp = new Date();
}

Offers.prototype.getList = async function() {
  await this.checkExpiration();
  return this.list;
}

Offers.prototype.getDetails = async function(id) {
  await this.checkExpiration();
  return this.keys[id];
}

module.exports = Offers;
