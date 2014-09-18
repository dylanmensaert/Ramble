'use strict';

var Membership = require('../orm/membership/model');

// TODO: Duplicate to isMemberOfLobby
module.exports = function(request, response, ok) {
    var values = {
        lobbyId: request.param('id'),
        playerId: request.user.id,
        type: 'host'
    };

    Membership.forge(values).fetch().then(function(membership) {
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
