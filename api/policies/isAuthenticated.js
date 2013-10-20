'use strict';

/**
 * Allow any authenticated user.
 */
module.exports = function (request, response, ok) {

    // User is allowed, proceed to controller
    if (request.isAuthenticated()) {
        return ok();
    }

    // User is not allowed
    else {
        return response.send({
            status: 403,
            message: 'You are not permitted to perform this action.'
        });
    }
};
