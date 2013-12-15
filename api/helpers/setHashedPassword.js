'use strict';

var bcrypt = require('bcrypt'),
    Promise = require('bluebird');

module.exports = function (values) {
    var hash = Promise.promisify(bcrypt.hash, bcrypt);

    if (values.password) {
        return hash(values.password, 10).then(function (hashedPassword) {
            values.password = hashedPassword;

            return Promise.resolve();
        });
    } else {
        return Promise.resolve();
    }
};
