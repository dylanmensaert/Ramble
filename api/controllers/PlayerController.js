
'use strict';

var Bookshelf = require('../bs-models/bookshelf'),
    Player = require('../bs-models/player'),
    Players = Bookshelf.Collection.extend({model: Player}),
    relations = ['ownedLobbies', 'joinedLobbies'],
    findMany = function (request, response) {
        var ids = request.param('ids'),
            limit = request.param('limit'),
            offset = request.param('offset'),
            queryParams = request.params.all(),
            playerCollection = Players.forge(),
            promise = playerCollection.query();

        delete queryParams.limit;
        delete queryParams.offset;

        //TODO: Implement limit skip sort.
        if (ids) {
            promise = promise.whereIn(ids);
        } else {
            promise = promise.where(queryParams);
        }

        if (limit) {
            promise = promise.limit(limit);

            if (offset) {
                promise = promise.offset(offset);
            }
        }

        promise.then(function (players) {
            playerCollection.add(players);

            return playerCollection.load(relations);
        }).then(function (players) {
                response.send({
                    players: players
                });

                //TODO: Check in sails-code what subscribe/publish exactly
                //Player.subscribe(request.socket);
                //Player.subscribe(request.socket, players);
            });
    };

module.exports = {
    find: function (request, response) {
        var id = request.param('id');

        if (id) {
            //TODO: Implement relationships correctly
            Player.forge({id: id}).fetch({withRelated: relations}).then(function (player) {
                response.send({
                    player: player
                });

                //Player.subscribe(request.socket, player);
            });
        } else {
            findMany(request, response);
        }
    },
    create: function (request, response) {
        //TODO; Refactor syntax without using extra variable
        var values = {
                username: request.param('username'),
                password: request.param('password'),
                email: request.param('email')
            },
            player = Player.forge(values);

        player.hashPassword().then(function () {
            return player.save();
        }).then(function (player) {
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
            },
            player = Player.forge(values);

        player.hashPassword().then(function () {
            return player.save();
        }).then(function (player) {
                response.send({
                    player: player
                });

                //Player.publishUpdate(player.id, player.toJSON());
            });
    },
    destroy: function (request, response) {
        var id = request.param('id');

        Player.forge({id: id}).destroy().then(function () {
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
