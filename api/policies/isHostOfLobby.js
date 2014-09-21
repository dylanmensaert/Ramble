'use strict';

var Membership = require('../orm/membership/model');

module.exports = function(request, response, next) {
    var values = {
            lobbyId: request.param('id'),
            playerId: request.user.id,
            type: 'host'
        },
        isValid;

    Membership.forge(values).fetch().then(function(membership) {
        isValid = membership !== null;
        request.validations.push(isValid);

        next();
    });
};
