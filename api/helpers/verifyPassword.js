'use strict';

var bcrypt = require('bcrypt'),
    Promise = require('bluebird');

module.exports = function(password, hash) {
    var compare = Promise.promisify(bcrypt.compare, bcrypt);

    return compare(password, hash);
};
