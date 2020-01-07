'use strict';

const https = require('https');

function httpsRequest(options) {
  let body = '';
  let statusCode;
  let headers;
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      statusCode = res.statusCode;
      headers = res.headers;
      res.on('data', (d) => { body += d; });
      res.on('end', () => { resolve({ statusCode, headers, body }); })
    });
    req.on('error', (e) => { reject(e) });
    req.end();
  })
};

module.exports = { httpsRequest };
