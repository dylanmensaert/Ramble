'use strict';
//TODO: Check in sails-code what subscribe/publish exactly

var Lobbybs = require('../bs-models/lobby'),
    Bookshelf = require('../bs-models/pg');

module.exports = {
    find: function (request, response) {
        var id = request.param('id'),
            ids = request.param('ids'),
            query = request.params.all(),
            lobbies = Bookshelf.Collection.extend({model: Lobbybs}).forge();

        if (id) {
            //TODO: Implement relationships correctly
            Lobbybs.forge({id: id}).fetch(/*{withRelated: ['owner', 'members']}*/).then(function (lobby) {
                response.send({
                    lobby: lobby
                });

                //Lobbybs.subscribe(request.socket, lobby);
            });
        } else if (ids) {
            lobbies.query().whereIn(ids).then(function (lobbies) {
                response.send({
                    lobbies: lobbies
                });
            });
        } else {
            //TODO: Implement limit skip sort.
            lobbies.query().where(query).then(function (lobbies) {
                response.send({
                    lobbies: lobbies
                });

                //Lobbybs.subscribe(request.socket);
                //Lobbybs.subscribe(request.socket, lobbies);
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

        Lobbybs.forge(values).save().then(function (lobby) {
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

        Lobbybs.forge(values).save().then(function (lobby) {
            response.send({
                lobby: lobby
            });

            //Lobbybs.publishUpdate(lobby.id, lobby.toJSON());
        });
    },
    destroy: function (request, response) {
        var id = request.param('id');

        Lobbybs.forge({id: id}).destroy().then(function () {
            request.logOut();

            response.send({
                lobby: {
                    id: id
                }
            });

            //Lobbybs.publishDestroy(lobby.id);
        });
    }
};
