'use strict';

//TODO: create crudHelper?

var Bookshelf = require('../bs-models/bookshelf'),
    Lobby = require('../bs-models/lobby'),
    Lobbies = Bookshelf.Collection.extend({model: Lobby}),
    relations = ['owner', 'members'],
    findMany = function (request, response) {
        var ids = request.param('ids'),
            limit = request.param('limit'),
            offset = request.param('offset'),
            queryParams = request.params.all(),
            lobbyCollection = Lobbies.forge(),
            promise = lobbyCollection.query();

        delete queryParams.limit;
        delete queryParams.offset;

        //TODO: Implement skip sort.
        if (ids) {
            promise = promise.whereIn(ids);
        } else {
            promise = promise.where(queryParams);
        }

        promise.limit(limit).offset(offset).then(function (lobbies) {
            lobbyCollection.add(lobbies);

            return lobbyCollection.load(relations);
        }).then(function (lobbies) {
                response.send({
                    lobbies: lobbies
                });

                //TODO: Check in sails-code what subscribe/publish exactly
                //Lobby.subscribe(request.socket);
                //Lobby.subscribe(request.socket, lobbies);
            });
    };

module.exports = {
    find: function (request, response) {
        var id = request.param('id');

        if (id) {
            Lobby.forge({id: id}).fetch({withRelated: relations}).then(function (lobby) {
                response.send({
                    lobby: lobby
                });

                //Lobby.subscribe(request.socket, lobby);
            });
        } else {
            findMany(request, response);
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
