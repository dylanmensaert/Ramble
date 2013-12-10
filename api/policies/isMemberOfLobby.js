/* jshint camelcase:false */
'use strict';

var Membership = require('../bs-models/membership');

module.exports = function (request, response, ok) {
    Membership.forge({player_id: request.user.id, lobby_id: request.param('id')}).fetch().then(function (membership) {
        if (request.isAuthenticated() && membership) {
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
