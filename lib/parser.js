'use strict';

function trackList(input, output = []) {
  for (let path of input) {
    output.push(trackObject(path));
  }
  return output;
};

function trackObject(input, output = {}) {
  for (let path in input) {
    switch(path) {
      case 'S': output = input[path]; break;
      case 'N': output = parseFloat(input[path]); break;
      case 'B': output = input[path]; break;
      case 'SS': output = input[path]; break;
      case 'NS': output = input[path]; break;
      case 'BS': output = input[path]; break;
      case 'BOOL': output = input[path]; break;
      case 'NULL': output = input[path]; break;
      case 'M': output = trackObject(input[path]); break;
      case 'L': output = trackList(input[path]); break;
      default: output[path] = trackObject(input[path]);
    }
  }
  return output;
};

function parser(input) {
  const result = trackObject(input);
  return result;
};

module.exports = parser;
