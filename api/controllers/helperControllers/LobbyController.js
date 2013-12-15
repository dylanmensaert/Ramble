'use strict';

var Lobby = require('../../bs-models/lobby'),
    Lobbies = require('../../bs-models/lobbies');

module.exports = {
    find: function (request, response) {
        var relations = Lobby.relationNames,
            id = request.param('id'),
            ids = request.param('ids'),
            lobbyCollection;

        if (id) {
            Lobby.forge({id: id}).fetch({withRelated: relations}).then(function (lobby) {
                response.send({
                    lobby: lobby
                });

                //Lobby.subscribe(request.socket, lobby);
            });
        } else if (ids) {
            lobbyCollection = Lobbies.forge();

            lobbyCollection.findMany(ids).then(function (lobbies) {
                response.send({
                    lobbies: lobbies
                });

                //Lobby.subscribe(request.socket);
                //Lobby.subscribe(request.socket, lobbies);
            });
        } else {
            lobbyCollection = Lobbies.forge();

            lobbyCollection.findQuery(request.params.all()).then(function (lobbies) {
                response.send({
                    lobbies: lobbies
                });

                //Lobby.subscribe(request.socket);
                //Lobby.subscribe(request.socket, lobbies);
            });
        }
    },
    create: function (request, response) {
        //TODO; Refactor syntax without using extra variable
        var values = {
                title: request.param('title'),
                password: request.param('password'),
                maxMembers: request.param('maxMembers'),
                owner: request.user.id
            },
            lobby = Lobby.forge(values);

        lobby.hashPassword().then(function () {
            return lobby.save();
        }).then(function (lobby) {
                response.send({
                    lobby: lobby
                });
            });
    },
    update: function (request, response) {
        var values = {
                id: request.param('id'),
                title: request.param('title'),
                password: request.param('password'),
                maxMembers: request.param('maxMembers')
            },
            lobby = Lobby.forge(values);

        lobby.hashPassword().then(function () {
            return lobby.save();
        }).then(function (lobby) {
                response.send({
                    lobby: lobby
                });

                //Lobby.publishUpdate(lobby.id, lobby.toJSON());
            });
    },
    destroy: function (request, response) {
        var id = request.param('id');

        Lobby.forge({id: id}).destroy().then(function () {
            response.send({
                lobby: {
                    id: id
                }
            });

            //Lobby.publishDestroy(lobby.id);
        });
    }
};
