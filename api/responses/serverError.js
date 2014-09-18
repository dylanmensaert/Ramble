'use strict';

module.exports = function(errors) {
    var result = {
            status: 500
        },
        response = this.res;

    sails.log.error('Server Error (500)');
    // TODO: Show message of each error separately, otherwise the console.log just shows "[Object]"
    sails.log.error(errors);

    // TODO: Really only show errors in development? What about validation-errors?
    if (sails.config.environment === 'development') {
        result.errors = errors;
    }

    return response.send(500, result);
};
