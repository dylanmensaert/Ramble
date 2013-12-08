'use strict';

var Bookshelf = require('../models/bookshelf'),
    Player = require('../models/player'),
    Players = Bookshelf.Collection.extend({model: Player}),
    relations = ['ownedLobbies', 'joinedLobbies'],
    findMany = function (request, response) {
        var ids = request.param('ids'),
            queryParams = request.params.all(),
            playerCollection = Players.forge(),
            promise = playerCollection.query();

        //TODO: Implement limit skip sort.
        if (ids) {
            promise = promise.whereIn(ids);
        } else {
            promise = promise.where(queryParams);
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
        };

        Player.forge(values).save().then(function (player) {
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

        Player.forge(values).save().then(function (player) {
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
