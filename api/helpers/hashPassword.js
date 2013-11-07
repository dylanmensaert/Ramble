'use strict';

var bcrypt = require('bcrypt');

module.exports = function (values, next) {
    bcrypt.hash(values.password, 10, function (error, hashedPassword) {
        if (error) {
            next(error);
        } else {
            values.password = hashedPassword;

            next();
        }
    });
};
