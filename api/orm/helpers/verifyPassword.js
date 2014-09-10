'use strict';

var bcrypt = require('bcrypt'),
    bluebird = require('bluebird');

module.exports = function(password, hash) {
    var compare = bluebird.promisify(bcrypt.compare, bcrypt);

    return compare(password, hash);
};
