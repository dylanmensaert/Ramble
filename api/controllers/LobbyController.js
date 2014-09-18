'use strict';

var Lobby = require('../orm/lobby/model'),
    Lobbies = require('../orm/lobby/collection'),
    cleanQuery = require('./helpers/cleanQuery');

module.exports = {
    find: function(request, response) {
        var id = request.param('id'),
            ids = request.param('ids'),
            query = cleanQuery(request.params.all());

        if (id) {
            Lobby.forge({
                id: id
            }).fetchWithRelated().then(function(lobby) {
                response.send({
                    lobby: lobby
                });
                // Lobby.subscribe(request.socket, lobby);
            });
        } else if (ids) {
            Lobbies.forge().findMany(ids).then(function(lobbies) {
                response.send({
                    lobbies: lobbies
                });
                // Lobby.subscribe(request.socket);
                // Lobby.subscribe(request.socket, lobbies);
            });
        } else {
            Lobbies.forge().findQuery(query).then(function(lobbies) {
                response.send({
                    lobbies: lobbies
                });
                // Lobby.subscribe(request.socket);
                // Lobby.subscribe(request.socket, lobbies);
            });
        }
    },
    create: function(request, response) {
        var values = {
                title: request.param('title'),
                password: request.param('password'),
                maxMembers: request.param('maxMembers')
            },
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
        var values = {
                id: request.param('id'),
                title: request.param('title'),
                password: request.param('password'),
                maxMembers: request.param('maxMembers')
            },
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
