'use strict';

var Bookshelf = require('../bs-models/bookshelf'),
    crudHelper = require('./helpers/crudHelper'),
    Player = require('../bs-models/player');

module.exports = {
    find: function (request, response) {
        var id = request.param('id'),
            ids = request.param('ids'),
            Players = Bookshelf.Collection.extend({model: Player}),
            relations = ['ownedLobbies', 'joinedLobbies'],
            options;

        if (id) {
            options = {
                Model: Player,
                id: id,
                relations: relations
            };

            crudHelper.findOne(options, function (player) {
                response.send({
                    player: player
                });

                //Player.subscribe(request.socket, player);
            });
        } else if (ids) {
            options = {
                Models: Players,
                ids: ids,
                relations: relations
            };

            crudHelper.findMany(options, function (players) {
                response.send({
                    players: players
                });

                //Player.subscribe(request.socket);
                //Player.subscribe(request.socket, players);
            });
        } else {
            options = {
                Models: Players,
                queryParams: request.params.all(),
                relations: relations,
                limit: request.param('limit'),
                offset: request.param('offset')

            };
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
