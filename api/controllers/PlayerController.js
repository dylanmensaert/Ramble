'use strict';

var crudHelper = require('./helpers/crudHelper'),
    createOptions = require('./helpers/crudOptionsCreater');

var addLobbiesTo = function (player, sendModel) {
    Lobby.find({
        owner: player.id
    }).done(function (error, lobbies) {
            //TODO: objects not correctly embedded for ember-data!
            //player.ownedLobbies = lobbies;

            Lobby.find({
                members: {
                    contains: player.id
                }
            }).done(function (error, lobbies) {
                    //player.joinedLobbies = lobbies;

                    sendModel(player);
                }
            );
        }
    );
};

module.exports = {
    find: function (request, response) {
        var options,
            playersResult;

        options = createOptions(request, response);

        if (request.param('id')) {
            options.success = function (player) {
                addLobbiesTo(player, function (playerWithLobbies) {
                    response.send({
                        player: playerWithLobbies
                    });

                    Player.subscribe(request.socket, playerWithLobbies);
                });
            };

            crudHelper.findOne(options);
        } else {
            options.success = function (players) {
                var counter = players.length;

                playersResult = [];

                players.forEach(function (player) {
                    addLobbiesTo(player, function (playerWithLobbies) {
                        playersResult.push(playerWithLobbies);

                        counter -= 1;

                        if (counter === 0) {
                            response.send({
                                players: playersResult
                            });
                        }
                    });
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
