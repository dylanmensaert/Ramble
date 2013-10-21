'use strict';

module.exports = function (request, response, ok) {
    var requestedLobbyId = parseInt(request.params.id, 10),
        requestedOwnerId;

    Lobby.findOne(requestedLobbyId).done(function (error, lobby) {
        requestedOwnerId = parseInt(lobby.owner, 10);

        if (request.isAuthenticated() && request.user.id === requestedOwnerId) {
            ok();
        } else {
            response.send({
                status: 403,
                message: 'You are not permitted to perform this action.'
            });
        }
    });
};
