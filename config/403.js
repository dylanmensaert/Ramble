'use strict';

module.exports[403] = function (message, request, response) {
    var result = {
        status: 403
    };

    if (message) {
        result.message = message;
    }

    return response.send(result);
};
