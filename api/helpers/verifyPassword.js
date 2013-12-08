'use strict';

var bcrypt = require('bcrypt'),
    Promise = require('bluebird');

module.exports = Promise.method(function (password, hash) {
    var compare = Promise.promisify(bcrypt.compare, bcrypt);

    return compare(password, hash).then(function (isValid) {
        return Promise.resolve(isValid);
    });
});
