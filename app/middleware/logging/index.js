'use strict';

async function log(req, res, next) {
    console.log(new Date(), 'hostname:', req.hostname, 'path:', req.path, 'params:', req.params, 'query:', req.query);
    next();
};

function init (options) {
  options.router.use(log);
};

module.exports = { init }
