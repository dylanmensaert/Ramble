/* jshint camelcase: false */
'use strict';

var Membership = require('../bs-models/membership');

// TODO: Duplicate to isOwnerOfLobby
module.exports = function(request, response, ok) {
    var lobby_id = request.param('id'),
        player_id = request.user.id;

    Membership.forge({
        lobby_id: lobby_id,
        player_id: player_id,
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
