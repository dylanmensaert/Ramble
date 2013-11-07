'use strict';


//TODO: jsHint error: redefinition of Player
//var mongoose = require('mongoose'),
//Player = mongoose.model('Player'),
var crudHelper = require('./helpers/crudHelper'),
    createOptions = require('./helpers/crudOptionsCreater'),

    addLobbiesTo = function (player, sendModel) {
        Lobby.find(/*{
             owner: player.id
             }*/).done(function (/*error, lobbies*/) {
                //TODO: objects not correctly embedded for ember-data!
                //player.ownedLobbies = lobbies;

                Lobby.find(/*{
                     members: {
                     contains: player.id
                     }
                     }*/).done(function (/*error, lobbies*/) {
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

        options = createOptions(request, response, Player);

        if (request.param('id')) {
            options.success = function (player) {
                addLobbiesTo(player, function (playerWithLobbies) {
                    response.send({
                        player: playerWithLobbies
                    });

                    //TODO: Subscribe!
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

                //TODO: Subscribe!
            };

            crudHelper.find(options);
        }
    },
    create: function (request, response) {
        var options = createOptions(request, response, Player);

        options.success = function (player) {
            response.send({
                player: player
            });

            //TODO: Publish!
        };

        crudHelper.create(options);
    },
    update: function (request, response) {
        var options = createOptions(request, response, Player);

        options.success = function (player) {
            response.send({
                player: player
            });

            //TODO: Publish!
        };

        crudHelper.update(options);
    },
    destroy: function (request, response) {
        var options = createOptions(request, response, Player);

        options.success = function (player) {
            request.logOut();

            response.send({
                player: player
            });

            //TODO: Publish!
        };

        crudHelper.destroy(options);
    }
};
