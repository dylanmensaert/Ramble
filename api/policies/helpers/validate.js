'use strict';

module.exports = function(isValid) {
    return function(request, response, next) {
        if (isValid(request.validations)) {
            next();
        } else {
            response.forbidden('You are not permitted to perform this action.');
        }
    };
};
