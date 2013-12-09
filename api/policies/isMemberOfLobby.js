'use strict';

var Lobby_Player = require('../bs-models/lobby_player');

module.exports = function (request, response, ok) {
    Lobby_Player.forge().query().where({player_id: request.user.id}).andWhere({lobby_id: request.param('id')}).then(function (ids) {
        if (request.isAuthenticated() && ids.length !== 0) {
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
