'use strict';

module.exports = function(request, response, next) {
    var isValid;

    isValid = request.user.id === parseInt(request.param('id'));

    request.validations.push(isValid);

    next();
};
