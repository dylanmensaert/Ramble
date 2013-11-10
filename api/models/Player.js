/* jshint maxparams: 4 */
'use strict';

var bcrypt = require('bcrypt'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    addLobbiesTo = function (player, query, response, success) {
        Lobby.find(query).done(function (error, lobbies) {
            if (error) {
                response.error(error);
            } else {
                var lobbiesId = [],
                    counter;

                for (counter = 0; counter < lobbies.length; counter += 1) {
                    lobbiesId.push(lobbies[counter].id);
                }

                success(lobbiesId);
            }
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
        fetchOwnedLobbies: function (response, next) {
            var query = {
                    owner: this.id
                },
                player = this;

            addLobbiesTo(this, query, response, function (ownedLobbiesId) {
                player.ownedLobbies = ownedLobbiesId;

                next();
            });
        },
        fetchJoinedLobbies: function (response, next) {
            var query = {
                    members: {
                        contains: this.id
                    }
                },
                player = this;

            addLobbiesTo(this, query, response, function (joinedLobbiesId) {
                player.joinedLobbies = joinedLobbiesId;

                next();
            });
        },
        verifyPassword: function (password, done) {
            var player = this.toObject();

            bcrypt.compare(password, player.password, done);
        },
        toJSON: function () {
            var player = this.toObject();

            delete player.password;

            return player;
        }
    },
    beforeCreate: function (values, next) {
        setHashedPassword(Player, values, next);
    },
    beforeUpdate: function (values, next) {
        setHashedPassword(Player, values, next);
    }
};
