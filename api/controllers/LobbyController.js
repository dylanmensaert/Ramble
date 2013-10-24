'use strict';

var crudHelper = require('./helpers/crudHelper'),
    createOptions = function (request, response) {
        return {
            modelType: Lobby,
            values: request.params.all(),
            error: function (error) {
                response.send(error);
            },
            notFound: function () {
                response.notFound();
            }
        };
    };

module.exports = {
    find: function (request, response) {
        var options = createOptions(request, response);

        if (request.param('id')) {
            options.success = function (lobby) {
                response.send({
                    lobby: lobby
                });

                Lobby.subscribe(request.socket, lobby);
            };

            crudHelper.findOne(options);
        } else {
            options.success = function (lobbies) {
                response.send({
                    lobbies: lobbies
                });

                Lobby.subscribe(request.socket);
                Lobby.subscribe(request.socket, lobbies);
            };

            crudHelper.find(options);
        }
    },
    create: function (request, response) {
        var options = createOptions(request, response);

        options.success = function (lobby) {
            response.send({
                lobby: lobby
            });

            Lobby.publishCreate(lobby.toJSON());
        };

        crudHelper.create(options);
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
