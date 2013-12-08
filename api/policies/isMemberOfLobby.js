'use strict';

var Lobby = require('../bs-models/lobby');

module.exports = function (request, response, ok) {
    Lobby.forge({id: request.param('id')}).fetch({withRelated: ['owner', 'members']}).then(function (lobby) {
        if (request.isAuthenticated() && lobby.members.contains(request.user.id)) {
            ok();
        } else {
            //TODO: Check if error and send it as response (ex: if lobby not found)
            response.send({
                status: 403,
                message: 'You are not permitted to perform this action.'
            });
        }
    });
};
