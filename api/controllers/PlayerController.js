'use strict';

var crudHelper = require('./helpers/crudHelper'),
    createOptions = require('./helpers/crudOptionsCreater'),
    Playerbs = require('../bs-models/lobby'),
    fetchLobbiesOne = function (player, success) {
        //TODO: Both callbacks can be executed at once for performance-improvements
        player.fetchOwnedLobbies(function () {
            player.fetchJoinedLobbies(function () {
                success();
            });
        });
    },
    fetchLobbiesMany = function (players, success) {
        var counter = players.length;

        players.forEach(function (player) {
            fetchLobbiesOne(player, function () {
                counter -= 1;

                if (counter === 0) {
                    success();
                }
            });
        });
    };

module.exports = {
    find: function (request, response) {
        var options;

        options = createOptions(request, response);

        if (request.param('id')) {
            options.success = function (player) {
                fetchLobbiesOne(player, function () {
                    response.send({
                        player: player
                    });

                    Player.subscribe(request.socket, player);
                });
            };

            crudHelper.findOne(options);
        } else if (request.param('ids')) {
            options.success = function (players) {
                fetchLobbiesMany(players, function () {
                    response.send({
                        players: players
                    });

                    Player.subscribe(request.socket, players);
                });
            };

            crudHelper.findMany(options);
        } else {
            options.success = function (players) {
                fetchLobbiesMany(players, function () {
                    response.send({
                        players: players
                    });

                    Player.subscribe(request.socket);
                    Player.subscribe(request.socket, players);
                });
            };

            crudHelper.find(options);
        }
    },
    create: function (request, response) {
        var values = {
            username: request.param('username'),
            password: request.param('password'),
            email: request.param('email')
        };

        Playerbs.forge(values).save().then(function (player) {
            response.send({
                player: player
            });
        });
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
            request.logOut();

            response.send({
                player: player
            });

            Player.publishDestroy(player.id);
        };

        crudHelper.destroy(options);
    }
};
