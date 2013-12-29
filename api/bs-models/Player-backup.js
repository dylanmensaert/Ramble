/* global Player, Lobby */
'use strict';

var bcrypt = require('bcrypt'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    getLobbies = function(query, success) {
        Lobby.find(query).done(function(error, lobbies) {
            var lobbyIds = [];

            lobbies.forEach(function(lobby) {
                lobbyIds.push(lobby.id);
            });

            success(lobbyIds);
        });
    };

module.exports = {
    schema: true,
    attributes: {
        username: {
            type: 'STRING',
            unique: true,
            required: true,
            maxLength: 50
        },
        password: {
            type: 'STRING',
            required: true
        },
        email: {
            type: 'EMAIL',
            unique: true,
            required: true,
            maxLength: 50
        },
        fetchOwnedLobbies: function(next) {
            var query = {
                    owner: this.id
                },
                player = this;

            getLobbies(query, function(ownedLobbyIds) {
                player.ownedLobbies = ownedLobbyIds;

                next();
            });
        },
        fetchJoinedLobbies: function(next) {
            var query = {
                    members: {
                        contains: this.id
                    }
                },
                player = this;

            getLobbies(query, function(joinedLobbyIds) {
                player.joinedLobbies = joinedLobbyIds;

                next();
            });
        },
        verifyPassword: function(password, done) {
            var player = this.toObject();

            bcrypt.compare(password, player.password, done);
        },
        toJSON: function() {
            var player = this.toObject();

            delete player.password;

            return player;
        }
    },
    beforeCreate: function(values, next) {
        setHashedPassword(Player, values, next);
    },
    beforeUpdate: function(values, next) {
        setHashedPassword(Player, values, next);
    }
};
