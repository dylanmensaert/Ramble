'use strict';

var bcrypt = require('bcrypt');

module.exports = function (Model, values, next) {
    if (values.password) {
        bcrypt.hash(values.password, 10, function (error, hashedPassword) {
            if (error) {
                next(error);
            } else {
                values.password = hashedPassword;

                next();
            }
        });
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
