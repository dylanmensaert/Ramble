'use strict';

var Membership = require('../orm/membership/model');

// TODO: Duplicate to isOwnerOfLobby
module.exports = function(request, response, next) {
    var values = {
            id: request.param('id'),
            playerId: request.user.id
        },
        isValid;

    Membership.forge(values).fetch().then(function(membership) {
        isValid = membership !== null;
        request.validations.push(isValid);

        next();
    });
};
