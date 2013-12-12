'use strict';

var Bookshelf = require('../../bs-models/bookshelf'),
    crudHelper = require('./helpers/crudHelper'),
    optionsCreator = require('./helpers/crudOptionsCreator'),
    Player = require('../../bs-models/player');

module.exports = {
    find: function (request, response) {
        var Players = Bookshelf.Collection.extend({model: Player}),
            relations = ['ownedLobbies', 'joinedLobbies'],
            options;

        if (request.param('id')) {
            options = optionsCreator.getIdOptions(Player, relations, request);

            crudHelper.findOne(options, function (player) {
                response.send({
                    player: player
                });

                //Player.subscribe(request.socket, player);
            });
        } else if (request.param('ids')) {
            options = optionsCreator.getIdsOptions(Players, relations, request);

            crudHelper.findMany(options, function (players) {
                response.send({
                    players: players
                });

                //Player.subscribe(request.socket);
                //Player.subscribe(request.socket, players);
            });
        } else {
            options = optionsCreator.getQueryOptions(Players, relations, request);

            crudHelper.find(options, function (players) {
                response.send({
                    players: players
                });

                //Player.subscribe(request.socket);
                //Player.subscribe(request.socket, players);
            });
        }
    },
    create: function (request, response) {
        var values = {
            username: request.param('username'),
            password: request.param('password'),
            email: request.param('email')
        };

        crudHelper.save(Player, values, function (player) {
            response.send({
                player: player
            });
        });
    },
    update: function (request, response) {
        var values = {
            id: request.param('id'),
            username: request.param('username'),
            password: request.param('password'),
            email: request.param('email')
        };

        crudHelper.save(Player, values, function (player) {
            response.send({
                player: player
            });

            //Player.publishUpdate(player.id, player.toJSON());
        });
    },
    destroy: function (request, response) {
        var id = request.param('id');

        crudHelper.destroy(Player, id, function () {
            request.logOut();

            response.send({
                player: {
                    id: id
                }
            });

            //Player.publishDestroy(player.id);
        });
    }
};
