'use strict';

var bcrypt = require('bcrypt');
var hashPassword = require('../helpers/hashPassword');

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
        hashPassword(values, next);
    },
    beforeUpdate: function (values, next) {
        if (values.password) {
            hashPassword(values, next);
        } else {
            Player.findOne(values.id).done(function (error, player) {
                if (error) {
                    next(error);
                } else {
                    values.password = player.password;

                    next();
                }
            });
        }
    }
};
