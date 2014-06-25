/* jshint camelcase: false */
'use strict';

var Membership = require('../bs-models/membership'),
    deleteMembership;

deleteMembership = function(values, response) {
    // TODO: Can be shorter? : Membership.forge(values).destroy().then(function () {
    Membership.forge().query().where(values).del().then(function() {
        response.send({
            // TODO: Look into what to send to client
            lobby: {
                id: values.lobby_id
            }
        });
    });
};

module.exports = {
    join: function(request, response) {
        var values = {
            lobby_id: request.param('id'),
            player_id: request.user.id
        };

        // TODO: Check the password!
        Membership.forge(values).save().then(function(lobby) {
            response.send({
                lobby: lobby
            });
        });
    },
    leave: function(request, response) {
        var values = {
            lobby_id: request.param('id'),
            player_id: request.user.id
        };

        deleteMembership(values, response);
    },
    kick: function(request, response) {
        var values = {
            lobby_id: request.param('id'),
            player_id: request.param('player').id
        };

        deleteMembership(values, response);
    }
};
