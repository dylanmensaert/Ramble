'use strict';

module.exports[500] = function(errors, request, response) {
    var result = {
        status: 500
    };

    sails.log.error('Server Error (500)');
    // TODO: Show message of each error separately, otherwise the console.log just shows "[Object]"
    sails.log.error(errors);

    // TODO: Really only show errors in development? What about validation-errors?
    if (sails.config.environment === 'development') {
        result.errors = errors;
    }

    return response.send(500, result);
};
