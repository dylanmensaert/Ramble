/* jshint maxparams: false */
'use strict';

module.exports[400] = function(validationErrors, redirectTo, request, response) {
    var result = {
        status: 400
    };

    //TODO: Will we even use these validationErrors? We never use badRequest-handler..
    if (validationErrors) {
        result.validationErrors = validationErrors;
    }

    return response.send(400, result);
};
