'use strict';

var Membership = require('../bs-models/membership');

module.exports = function (request, response, ok) {
    Membership.forge().query().where({player: request.user.id, lobby: request.param('id')}).then(function (ids) {
        if (request.isAuthenticated() && ids.length > 0) {
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
