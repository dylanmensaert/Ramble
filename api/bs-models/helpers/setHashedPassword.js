'use strict';

var bcrypt = require('bcrypt'),
    bluebird = require('bluebird');

module.exports = function(values) {
    var hash = bluebird.promisify(bcrypt.hash, bcrypt);

    if (values.password) {
        return hash(values.password, 10).then(function(hashedPassword) {
            values.password = hashedPassword;

            return bluebird.resolve();
        });
    } else {
        return bluebird.resolve();
    }
};
