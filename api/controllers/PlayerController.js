'use strict';

var Player = require('../orm/player/model'),
    Players = require('../orm/player/collection'),
    toQuery = require('./helpers/toQuery'),
    _ = require('underscore');

module.exports = {
    find: function(request, response) {
        var query = toQuery(request.params.all());

        Players.forge().findQuery(query).then(function(players) {
            response.send({
                players: players
            });
            // Player.subscribe(request.socket);
            // Player.subscribe(request.socket, players);
        });
    },
    create: function(request, response) {
        var values = _.pick(request.params.all(), 'name', 'password', 'email');

        Player.forge(values).save().then(function(player) {
            response.send({
                player: player
            });
        });
    },
    update: function(request, response) {
        var values = _.pick(request.params.all(), 'id', 'name', 'password', 'email');

        Player.forge(values).save().then(function(player) {
            response.send({
                player: player
            });
            // Player.publishUpdate(player.id, player.toJSON());
        });
    },
    destroy: function(request, response) {
        var id = request.param('id');

        Player.forge({
            id: id
        }).destroy().then(function() {
            request.logOut();

            response.send({
                player: {
                    id: id
                }
            });
            // Player.publishDestroy(player.id);
        });
    }
};
