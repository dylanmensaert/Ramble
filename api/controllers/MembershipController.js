'use strict';

var Membership = require('../bs-models/membership'),
    Memberships = require('../bs-models/memberships'),
    deleteMembership;

deleteMembership = function(values, response) {
    // TODO: Can be shorter? : Membership.forge(values).destroy().then(function () {
    Membership.forge().query().where(values).del().then(function() {
        response.send({
            // TODO: Look into what to send to client
            lobby: {
                id: values.lobbyId
            }
        });
    });
};

module.exports = {
    find: function(request, response) {
        var id = request.param('id'),
            ids = request.param('ids');

        if (id) {
            Membership.forge({
                id: id
            }).fetchWithRelated().then(function(membership) {
                response.send({
                    membership: membership
                });
                // Membership.subscribe(request.socket, membership);
            });
        } else if (ids) {
            Memberships.forge().findMany(ids).then(function(memberships) {
                response.send({
                    memberships: memberships
                });
                // Membership.subscribe(request.socket);
                // Membership.subscribe(request.socket, memberships);
            });
        } else {
            Memberships.forge().findQuery(request.params.all()).then(function(memberships) {
                response.send({
                    memberships: memberships
                });
                // Membership.subscribe(request.socket);
                // Membership.subscribe(request.socket, memberships);
            });
        }
    },
    join: function(request, response) {
        var values = {
            lobbyId: request.param('id'),
            playerId: request.user.id
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
            lobbyId: request.param('id'),
            playerId: request.user.id
        };

        deleteMembership(values, response);
    },
    kick: function(request, response) {
        var values = {
            lobbyId: request.param('id'),
            playerId: request.param('player').id
        };

        deleteMembership(values, response);
    }
};
