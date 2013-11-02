'use strict';

module.exports[404] = function (request, response) {
    var result = {
        status: 404
    };

    return response.send(result);
};
