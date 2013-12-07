'use strict';
//TODO: Check in sails-code what subscribe/publish exactly

var Lobby = require('../bs-models/lobby'),
    Bookshelf = require('../bs-models/pg');

module.exports = {
    find: function (request, response) {
        var id = request.param('id'),
            ids = request.param('ids'),
            query = request.params.all(),
            Lobbies = Bookshelf.Collection.extend({model: Lobby}).forge(),
            relations = ['owner', 'members'];

        if (id) {
            Lobby.forge({id: id}).fetch({withRelated: relations}).then(function (lobby) {
                response.send({
                    lobby: lobby
                });

                //Lobby.subscribe(request.socket, lobby);
            });
        } else if (ids) {
            Lobbies.query().whereIn(ids).then(function (lobbies) {
                Lobbies.add(lobbies);

                Lobbies.load(relations).then(function (lobbies) {
                    response.send({
                        lobbies: lobbies
                    });
                });
            });
        } else {
            //TODO: Implement limit skip sort.
            //TODO: Remove duplicate code
            Lobbies.query().where(query).then(function (lobbies) {
                Lobbies.add(lobbies);

                Lobbies.load(relations).then(function (lobbies) {
                    response.send({
                        lobbies: lobbies
                    });

                    //Lobby.subscribe(request.socket);
                    //Lobby.subscribe(request.socket, lobbies);
                });
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
        };

        Lobby.forge(values).save().then(function (lobby) {
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
        };

        Lobby.forge(values).save().then(function (lobby) {
            response.send({
                lobby: lobby
            });

            //Lobby.publishUpdate(lobby.id, lobby.toJSON());
        });
    },
    destroy: function (request, response) {
        var id = request.param('id');

        Lobby.forge({id: id}).destroy().then(function () {
            request.logOut();

            response.send({
                lobby: {
                    id: id
                }
            });

            //Lobby.publishDestroy(lobby.id);
        });
    }
};
