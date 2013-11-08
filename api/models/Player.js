'use strict';

var bcrypt = require('bcrypt'),
    setHashedPassword = require('../helpers/setHashedPassword');

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
        //TODO: Should these be defined? Are based off Lobby.owner and Lobby.members
        /*
         ownedLobbies: {
         type: 'ARRAY'
         },
         joinedLobbies: {
         type: 'ARRAY'
         },
         */
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
