'use strict';

var crudHelper = require('./helpers/crudHelper'),
    createOptions = require('./helpers/crudOptionsCreater'),
    Lobbybs = require('../bs-models/lobby');

module.exports = {
    find: function (request, response) {
        var options,
            lobbiesResult;

        options = createOptions(request, response);

        if (request.param('id')) {
            options.success = function (lobby) {
                response.send({
                    lobby: lobby
                });

                Lobby.subscribe(request.socket, lobby);
            };

            crudHelper.findOne(options);
        } else if (request.param('ids')) {
            options.success = function (lobbies) {
                response.send({
                    lobbies: lobbies
                });

                Lobby.subscribe(request.socket, lobbies);
            };

            crudHelper.findMany(options);
        } else {
            options.success = function (lobbies) {
                lobbiesResult = [];

                lobbies.forEach(function (lobby) {
                    lobbiesResult.push(lobby);
                });

                response.send({
                    lobbies: lobbiesResult
                });

                //TODO: Check in sails-code what subscribe/publish exactly do!
                Lobby.subscribe(request.socket);
                Lobby.subscribe(request.socket, lobbies);
            };

            crudHelper.find(options);
        }
    },
    create: function (request, response) {
        /*var options = createOptions(request, response);

         options.values.owner = request.user.id;

        options.success = function (lobby) {
            response.send({
                lobby: lobby
            });

            Lobby.publishCreate(lobby.toJSON());
        };

         crudHelper.create(options);*/

        var values = request.params.all();

        values.owner = request.user.id;

        Lobbybs.forge(values).save().then(function (lobby) {
            response.send({
                lobby: lobby
            });
        });
    },
    update: function (request, response) {
        var options = createOptions(request, response);

        options.success = function (lobby) {
            response.send({
                lobby: lobby
            });

            Lobby.publishUpdate(lobby.id, lobby.toJSON());
        };

        crudHelper.update(options);
    },
    destroy: function (request, response) {
        var options = createOptions(request, response);

        options.success = function (lobby) {
            response.send({
                lobby: lobby
            });

            Lobby.publishDestroy(lobby.id);
        };

        crudHelper.destroy(options);
    }
};
