'use strict';

var bcrypt = require('bcrypt'),
    hashPassword = function (values, next) {
        bcrypt.hash(values.password, 10, function (error, hashedPassword) {
            if (error) {
                next(error);
            } else {
                values.password = hashedPassword;

                next();
            }
        });
    };

module.exports = function (Model, values, next) {
    if (values.password) {
        hashPassword(values, next);
    } else {
        Model.findOne(values.id).done(function (error, model) {
            if (error) {
                next(error);
            } else {
                values.password = model.password;

                next();
            }
        });
    }
};
