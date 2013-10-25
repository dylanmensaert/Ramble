'use strict';

var crudHelper = require('./helpers/crudHelper'),
    createOptions = require('./helpers/crudOptionsCreater');

module.exports = {
    find: function (request, response) {
        var options,
            playersResult;

        options = createOptions(request, response);

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
                playersResult = [];

                players.forEach(function (player) {
                    playersResult.push(player);
                });

                response.send({
                    players: playersResult
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

            Player.publishCreate(player);
        };

        crudHelper.create(options);
    },
    update: function (request, response) {
        var options = createOptions(request, response);

        options.success = function (player) {
            response.send({
                player: player
            });

            //TODO: Fix bug that crashes server whenever publishing update/destroy/create
            Player.publishUpdate(player.id, player);
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
