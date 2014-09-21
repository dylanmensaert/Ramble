'use strict';

var _ = require('underscore'),
    isValid;

isValid = function(validations, assert) {
    var isValid;

    if (_.isFunction(assert)) {
        isValid = assert(validations);
    } else {
        isValid = _.every(validations)
    }

    return isValid;
};

module.exports = function(assert) {
    return function(request, response, next) {
        if (isValid(request.validations, assert)) {
            next();
        } else {
            response.forbidden('You are not permitted to perform this action.');
        }
    };
}
