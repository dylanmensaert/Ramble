'use strict';

var crudHelper = require('./helpers/crudHelper'),
    createOptions = require('./helpers/crudOptionsCreater');

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

            Lobby.publishCreate(lobby);
        };

        crudHelper.create(options);
    },
    update: function (request, response) {
        var options = createOptions(request, response);

        options.success = function (lobby) {
            response.send({
                lobby: lobby
            });

            Lobby.publishUpdate(lobby.id, lobby);
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
