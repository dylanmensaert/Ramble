'use strict';

var Bookshelf = require('../bs-models/bookshelf'),
    crudHelper = require('./helpers/crudHelper'),
    Lobby = require('../bs-models/lobby');

module.exports = {
    find: function (request, response) {
        var id = request.param('id'),
            ids = request.param('ids'),
            Lobbies = Bookshelf.Collection.extend({model: Lobby}),
            relations = ['owner', 'members'],
            options;

        if (id) {
            options = {
                Model: Lobby,
                id: id,
                relations: relations
            };

            crudHelper.findOne(options, function (lobby) {
                response.send({
                    lobby: lobby
                });

                //Lobby.subscribe(request.socket, lobby);
            });
        } else if (ids) {
            options = {
                Models: Lobbies,
                ids: ids,
                relations: relations
            };

            crudHelper.findMany(options, function (lobbies) {
                response.send({
                    lobbies: lobbies
                });

                //Lobby.subscribe(request.socket);
                //Lobby.subscribe(request.socket, lobbies);
            });
        } else {
            options = {
                Models: Lobbies,
                queryParams: request.params.all(),
                relations: relations,
                limit: request.param('limit'),
                offset: request.param('offset')
            };

            crudHelper.find(options, function (lobbies) {
                response.send({
                    lobbies: lobbies
                });

                //Lobby.subscribe(request.socket);
                //Lobby.subscribe(request.socket, lobbies);
            });
        }
    },
    create: function (request, response) {
        var values = {
            title: request.param('title'),
            password: request.param('password'),
            maxMembers: request.param('maxMembers'),
            owner: request.user.id
        };

        crudHelper.save(Lobby, values, function (lobby) {
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

        crudHelper.save(Lobby, values, function (lobby) {
            response.send({
                lobby: lobby
            });

            //Lobby.publishUpdate(lobby.id, lobby.toJSON());
        });
    },
    destroy: function (request, response) {
        var id = request.param('id');

        crudHelper.destroy(Lobby, id, function () {
            response.send({
                lobby: {
                    id: id
                }
            });

            //Lobby.publishDestroy(lobby.id);
        });
    }
};
