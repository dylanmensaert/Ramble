/* jshint maxparams: false */
'use strict';

module.exports = function() {
    var result = {
            status: 400
        },
        response = this.res;

    return response.send(400, result);
};
