'use strict';

var crudHelper = require('./helpers/crudHelper'),
    createOptions = require('./helpers/crudOptionsCreater');

//TODO: Put this in Player model as getJoinedLobbies and getOwnedLobbies
var addLobbiesTo = function (options, player, sendModel) {
    Lobby.find({
        owner: player.id
    }).done(function (error, ownedLobbies) {
            if (error) {
                options.error(error);
            } else {
                var ownedLobbiesId = [],
                    joinedLobbiesId = [],
                    i;

                for (i = 0; i < ownedLobbies.length; i += 1) {
                    ownedLobbiesId.push(ownedLobbies[i].id);
                }

                player.ownedLobbies = ownedLobbiesId;

                Lobby.find({
                    members: {
                        contains: player.id
                    }
                }).done(function (error, joinedLobbies) {
                        if (error) {
                            options.error(error);
                        } else {
                            for (var i = 0; i < joinedLobbies.length; i += 1) {
                                joinedLobbiesId.push(joinedLobbies[i].id);
                            }

                            player.joinedLobbies = joinedLobbiesId;

                            sendModel(player);
                        }
                    }
                );
            }
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
                addLobbiesTo(options, player, function (playerWithLobbies) {
                    response.send({
                        player: playerWithLobbies
                    });

                    Player.subscribe(request.socket, playerWithLobbies);
                });
            };

            crudHelper.findOne(options);
        } else if (request.param('ids')) {
            options.success = function (players) {
                response.send({
                    players: players
                });

                Player.subscribe(request.socket, players);
            };

            crudHelper.findMany(options);
        } else {
            options.success = function (players) {
                var counter = players.length;

                playersResult = [];

                players.forEach(function (player) {
                    addLobbiesTo(options, player, function (playerWithLobbies) {
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
            request.logOut();

            response.send({
                player: player
            });

            Player.publishDestroy(player.id);
        };

        crudHelper.destroy(options);
    }
};
