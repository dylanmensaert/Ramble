'use strict';

var Membership = require('../orm/membership/model');

// TODO: Duplicate to isOwnerOfLobby
module.exports = function(request, response, ok) {
    var lobbyId = request.param('id'),
        playerId = request.user.id;

    Membership.forge({
        lobbyId: lobbyId,
        playerId: playerId,
        type: 'member'
    }).fetch().then(function(membership) {
        if (request.isAuthenticated() && membership) {
            ok();
        } else {
            response.send({
                status: 403,
                message: 'You are not permitted to perform this action.'
            });
        }
    });
};
