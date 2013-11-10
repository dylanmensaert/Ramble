'use strict';

module.exports = function (request, response, ok) {
    if (request.isAuthenticated() && request.user.id === request.param('id')) {
        ok();
    } else {
        response.forbidden('You are not permitted to perform this action.');
    }
};
