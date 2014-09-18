'use strict';

var Lobby = require('../orm/lobby/model'),
    Lobbies = require('../orm/lobby/collection'),
    toQuery = require('./helpers/toQuery'),
    _ = require('underscore');

module.exports = {
    find: function(request, response) {
        var query = toQuery(request.params.all());

        Lobbies.forge().findQuery(query).then(function(lobbies) {
            response.send({
                lobbies: lobbies
            });
            // Lobby.subscribe(request.socket);
            // Lobby.subscribe(request.socket, lobbies);
        });
    },
    create: function(request, response) {
        var values = _.pick(request.params.all(), 'title', 'password', 'maxMembers'),
            options = {
                userId: request.user.id
            },
            lobby = Lobby.forge(values);

        lobby.save(null, options).then(function(lobby) {
            response.send({
                lobby: lobby
            });
        });
    },
    update: function(request, response) {
        var values = _.pick(request.params.all(), 'id', 'title', 'password', 'maxMembers'),
            lobby = Lobby.forge(values);

        lobby.save().then(function(lobby) {
            response.send({
                lobby: lobby
            });
            // Lobby.publishUpdate(lobby.id, lobby.toJSON());
        });
    },
    destroy: function(request, response) {
        var id = request.param('id');

        Lobby.forge({
            id: id
        }).destroy().then(function() {
            response.send({
                lobby: {
                    id: id
                }
            });
            // Lobby.publishDestroy(lobby.id);
        });
    }
};
