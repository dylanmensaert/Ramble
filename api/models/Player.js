'use strict';

var bcrypt = require('bcrypt'),
    hashPassword = function (values, next) {
        bcrypt.hash(values.password, 10, function (error, hashedPassword) {
            if (error) {
                next(error);
            } else {
                values.password = hashedPassword;

                next();
            }
        });
    };

module.exports = {
    schema: true,
    attributes: {
        username: {
            type: 'STRING',
            required: true,
            unique: true,
            maxLength: 50
        },
        password: {
            type: 'STRING',
            required: true,
            maxLength: 50
        },
        email: {
            type: 'EMAIL',
            required: true,
            unique: true,
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
                    //TODO: Is needed to fill password again?
                    values.password = player.password;

                    next();
                }
            });
        }
    }
};
