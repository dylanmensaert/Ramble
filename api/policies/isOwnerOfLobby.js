/* jshint camelcase: false */
'use strict';

var Lobby = require('../bs-models/lobby');

module.exports = function(request, response, ok) {
    Lobby.forge({id: request.param('id')}).fetch().then(function(lobby) {
        if (request.isAuthenticated() && request.user.id === lobby.attributes.owner_id) {
            ok();
        } else {
            //TODO: Check if error and send it as response (ex: if lobby not found)
            response.forbidden('You are not permitted to perform this action.');
        }
    });
};
