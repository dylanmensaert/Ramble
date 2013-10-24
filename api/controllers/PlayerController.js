'use strict';

var crudHelper = require('./helpers/crudHelper.js');

module.exports = {
    find: function (request, response) {
        var id = request.param('id');

        if (id) {
            crudHelper.findOne({
                modelType: Player,
                values: request.params.all(),
                error: function (error) {
                    response.send(error);
                },
                notFound: function () {
                    response.notFound();
                },
                success: function (player) {
                    response.send({
                        player: player
                    });
                }
            });
        } else {
            crudHelper.find({
                modelType: Player,
                values: request.params.all(),
                error: function (error) {
                    response.send(error);
                },
                notFound: function () {
                    response.notFound();
                },
                success: function (players) {
                    response.send({
                        players: players
                    });

                    Player.subscribe(request.socket);

                    Player.subscribe(request.socket, players);
                }
            });
        }
    },
    create: function (request, response) {
        crudHelper.create({
            modelType: Player,
            values: request.params.all(),
            error: function (error) {
                response.send(error);
            },
            success: function (player) {
                response.send({
                    player: player
                });
            }
        });
    },
    update: function (request, response) {
        crudHelper.update({
            modelType: Player,
            values: request.params.all(),
            error: function (error) {
                response.send(error);
            },
            notFound: function () {
                response.notFound();
            },
            success: function (player) {
                response.send({
                    player: player
                });
            }
        });
    },
    destroy: function (request, response) {
        crudHelper.destroy({
            modelType: Player,
            values: request.params.all(),
            error: function (error) {
                response.send(error);
            },
            notFound: function () {
                response.notFound();
            },
            success: function (player) {
                response.send({
                    player: player
                });
            }
        });
    }
};
