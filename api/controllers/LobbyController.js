'use strict';

var crudHelper = require('./helpers/crudHelper.js');

module.exports = {
    find: function (request, response) {
        var id = request.param('id');

        if (id) {
            crudHelper.findOne({
                modelType: Lobby,
                values: request.params.all(),
                error: function (error) {
                    response.send(error);
                },
                notFound: function () {
                    response.notFound();
                },
                success: function (lobby) {
                    response.send({
                        lobby: lobby
                    });
                }
            });
        } else {
            crudHelper.find({
                modelType: Lobby,
                values: request.params.all(),
                error: function (error) {
                    response.send(error);
                },
                notFound: function () {
                    response.notFound();
                },
                success: function (lobbies) {
                    response.send({
                        lobbies: lobbies
                    });

                    Lobby.subscribe(request.socket);

                    Lobby.subscribe(request.socket, lobbies);
                }
            });
        }
    },
    create: function (request, response) {
        crudHelper.create({
            modelType: Lobby,
            values: request.params.all(),
            error: function (error) {
                response.send(error);
            },
            success: function (lobby) {
                response.send({
                    lobby: lobby
                });
            }
        });
    },
    update: function (request, response) {
        crudHelper.update({
            modelType: Lobby,
            values: request.params.all(),
            error: function (error) {
                response.send(error);
            },
            notFound: function () {
                response.notFound();
            },
            success: function (lobby) {
                response.send({
                    lobby: lobby
                });
            }
        });
    },
    destroy: function (request, response) {
        crudHelper.destroy({
            modelType: Lobby,
            values: request.params.all(),
            error: function (error) {
                response.send(error);
            },
            notFound: function () {
                response.notFound();
            },
            success: function (lobby) {
                response.send({
                    lobby: lobby
                });
            }
        });
    }
};
