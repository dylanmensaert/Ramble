'use strict';

/**
 * Allow any authenticated user.
 */
module.exports = function (request, response, ok) {
    if (request.isAuthenticated()) {
        ok();
    } else {
        response.send({
            status: 403,
            message: 'You are not permitted to perform this action.'
        });
    }
};
