'use strict';

var Bookshelf = require('../../bs-models/bookshelf'),
    crudHelper = require('./helpers/findHelper'),
    optionsCreator = require('./helpers/findOptionsCreator'),
    Lobby = require('../../bs-models/lobby');

module.exports = {
    find: function (request, response) {
        var Lobbies = Bookshelf.Collection.extend({model: Lobby}),
            relations = ['owner', 'members'],
            id = request.param('id'),
            ids = request.param('ids'),
            options;

        if (id) {
            Lobby.forge({id: id}).fetch({withRelated: relations}).then(function (lobby) {
                response.send({
                    lobby: lobby
                });

                //Lobby.subscribe(request.socket, lobby);
            });
        } else if (ids) {
            var lobbyCollection = Lobbies.forge();

            lobbyCollection.query().whereIn(ids).then(function (lobbies) {
                lobbyCollection.add(lobbies);

                return lobbyCollection.load(relations);
            }).then(function (lobbies) {
                    response.send({
                        lobbies: lobbies
                    });

                    //Lobby.subscribe(request.socket);
                    //Lobby.subscribe(request.socket, lobbies);
                });
        } else {
            options = optionsCreator.getFindOptions(Lobbies, relations, request);

            crudHelper.find(options).then(function (lobbies) {
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
