'use strict';
//TODO: Check in sails-code what subscribe/publish exactly

var Player = require('../bs-models/player'),
    Bookshelf = require('../bs-models/pg');

module.exports = {
    find: function (request, response) {
        var id = request.param('id'),
            ids = request.param('ids'),
            query = request.params.all(),
            Players = Bookshelf.Collection.extend({model: Player}).forge(),
            relations = ['ownedLobbies', 'joinedLobbies'];

        if (id) {
            //TODO: Implement relationships correctly
            Player.forge({id: id}).fetch({withRelated: relations}).then(function (player) {
                response.send({
                    player: player
                });

                //Player.subscribe(request.socket, player);
            });
        } else if (ids) {
            Players.query().whereIn(ids).then(function (players) {
                Players.add(players);

                Players.load(relations).then(function (players) {
                    response.send({
                        players: players
                    });
                });
            });
        } else {
            //TODO: Implement limit skip sort.
            //TODO: Remove duplicate code
            Players.query().where(query).then(function (players) {
                Players.add(players);

                Players.load(relations).then(function (players) {
                    response.send({
                        players: players
                    });

                    //Player.subscribe(request.socket);
                    //Player.subscribe(request.socket, players);
                });
            });
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
