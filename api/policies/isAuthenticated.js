'use strict';

module.exports = function(request, response, next) {
    request.validations = [];

    if (request.isAuthenticated()) {
        next();
    } else {
        response.forbidden('You are not permitted to perform this action.');
    }
};
