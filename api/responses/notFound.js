'use strict';

module.exports = function() {
    var result = {
            status: 404
        },
        response = this.res;

    return response.send(404, result);
};
