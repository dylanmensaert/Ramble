'use strict';

var Membership = require('../bs-models/membership/model'),
    Memberships = require('../bs-models/membership/collection'),
    toQuery = require('./helpers/toQuery');

module.exports = {
    find: function(request, response) {
        var query = toQuery(request.params.all());

        Memberships.forge().findQuery(query).then(function(memberships) {
            response.send({
                memberships: memberships
            });
            // Membership.subscribe(request.socket);
            // Membership.subscribe(request.socket, memberships);
        });
    },
    create: function(request, response) {
        var values = {
            lobbyId: request.param('lobby'),
            playerId: request.user.id,
            type: 'participant'
        };

        // TODO: Check the password!
        Membership.forge(values).save().then(function(membership) {
            response.send({
                membership: membership
            });
        });
    },
    update: function(request, response) {
        var values = {
            id: request.param('id'),
            type: request.param('type')
        };

        Membership.forge(values).save().then(function(membership) {
            response.send({
                membership: membership
            });
            // Membership.publishUpdate(membership.id, membership.toJSON());
        });
    },
    destroy: function(request, response) {
        var id = request.param('id');

        Membership.forge({
            id: id
        }).destroy().then(function() {
            response.send({
                membership: {
                    id: id
                }
            });
            // Membership.publishDestroy(membership.id);
        });
    }
};
