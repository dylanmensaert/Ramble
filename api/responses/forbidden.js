'use strict';

module.exports = function() {
    var result = {
            status: 403
        },
        response = this.res;

    return response.send(403, result);
};
