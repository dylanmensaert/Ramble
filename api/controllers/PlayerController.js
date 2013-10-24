'use strict';

var crudHelper = require('./helpers/crudHelper'),
    createOptions = function (request, response) {
        return {
            modelType: Player,
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
            options.success = function (player) {
                response.send({
                    player: player
                });

                Player.subscribe(request.socket, player);
            };

            crudHelper.findOne(options);
        } else {
            options.success = function (players) {
                response.send({
                    players: players
                });

                Player.subscribe(request.socket);
                Player.subscribe(request.socket, players);
            };

            crudHelper.find(options);
        }
    },
    create: function (request, response) {
        var options = createOptions(request, response);

        options.success = function (player) {
            response.send({
                player: player
            });

            Player.publishCreate(player.toJSON());
        };

        crudHelper.create(options);
    },
    update: function (request, response) {
        var options = createOptions(request, response);

        options.success = function (player) {
            response.send({
                player: player
            });

            Player.publishUpdate(player.id, player.toJSON());
        };

        crudHelper.update(options);
    },
    destroy: function (request, response) {
        var options = createOptions(request, response);

        options.success = function (player) {
            response.send({
                player: player
            });

            Player.publishDestroy(player.id);
        };

        crudHelper.destroy(options);
    }
};
