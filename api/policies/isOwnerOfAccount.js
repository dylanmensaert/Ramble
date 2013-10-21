'use strict';

module.exports = function (request, response, ok) {
    var requestedPlayerId = parseInt(request.params.id, 10);

    if (request.isAuthenticated() && request.user.id === requestedPlayerId) {
        ok();
    } else {
        response.send({
            status: 403,
            message: 'You are not permitted to perform this action.'
        });
    }
};
