'use strict';
//TODO: Check in sails-code what subscribe/publish exactly

var Playerbs = require('../bs-models/player'),
    Bookshelf = require('../bs-models/pg');

module.exports = {
    find: function (request, response) {
        var id = request.param('id'),
            ids = request.param('ids'),
            query = request.params.all(),
            players = Bookshelf.Collection.extend({model: Playerbs}).forge();

        if (id) {
            //TODO: Implement relationships correctly
            Playerbs.forge({id: id}).fetch(/*{withRelated: ['ownedLobbies', 'joinedLobbies']}*/).then(function (player) {
                response.send({
                    player: player
                });

                //Playerbs.subscribe(request.socket, player);
            });
        } else if (ids) {
            players.query().whereIn(ids).then(function (players) {
                response.send({
                    players: players
                });
            });
        } else {
            //TODO: Implement limit skip sort.
            players.query().where(query).then(function (players) {
                response.send({
                    players: players
                });

                //Playerbs.subscribe(request.socket);
                //Playerbs.subscribe(request.socket, players);
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

        Playerbs.forge(values).save().then(function (player) {
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

        Playerbs.forge(values).save().then(function (player) {
            response.send({
                player: player
            });

            //Playerbs.publishUpdate(player.id, player.toJSON());
        });
    },
    destroy: function (request, response) {
        var id = request.param('id');

        Playerbs.forge({id: id}).destroy().then(function () {
            request.logOut();

            response.send({
                player: {
                    id: id
                }
            });

            //Playerbs.publishDestroy(player.id);
        });
    }
};
