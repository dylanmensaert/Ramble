'use strict';

var Membership = require('../bs-models/membership/model');

module.exports = function(request, response, next) {
    var values = {
            id: request.param('id')
        },
        isValid;

    Membership.forge(values).fetch().then(function(membership) {
        membership = membership.toJSON();

        values = {
            playerId: request.user.id,
            lobbyId: membership.lobbyId,
            type: 'host'
        };

        Membership.forge(values).fetch().then(function(membership) {
            isValid = membership !== null;
            request.validations.push(isValid);

            next();
        });
    });
};
