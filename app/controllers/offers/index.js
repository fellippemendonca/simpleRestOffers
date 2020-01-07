'use strict';

function filterValues(list, query) {
  const limit =  query.limit || 10;
  let amount = 0;
  return list.filter((offer) => {
    if (amount >= limit) { return false; }
    for (let key in query) {
      switch (key) {
        case 'priceFrom': if (offer.price < parseFloat(query[key])) { return false; } break;
        case 'priceTo': if (offer.price > parseFloat(query[key])) { return false; } break;
        default: if (offer[key] && offer[key] !== query[key]) { return false; } break;
      }
    }
    amount++;
    return true;
  });
};

function Offers(options) {
  this.data = options.data;
  this.router = options.router;
  this.init();
};

Offers.prototype.init = async function () {
  this.router.get('/offers/:id', async (req, res, next) => {
    try {
      const result = await this.data.offers.getDetails(req.params.id);
      res.json(result);
    } catch(err) {
      next(err);
    }
  });

  this.router.get('/offers', async (req, res, next) => {
    try {
      const filters = req.query;
      const result = await this.data.offers.getList();
      const filteredResults = filterValues(result, filters) || [];
      res.json({ offers: filteredResults, amount: filteredResults.length });
    } catch(err) {
      next(err);
    }
  });
};

module.exports = Offers;
