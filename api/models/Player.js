'use strict';

/**
 * Player
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

//TODO: Has to change to original bcrypt instead of -nodejs version
var bcrypt = require('bcrypt-nodejs');

module.exports = {
    schema: true,
    attributes: {
        username: {
            type: 'STRING',
            required: true,
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
            maxLength: 50
        },
        //TODO: Should these be defined? Are based off Lobby.owner and Lobby.members
        ownedLobbies: {
            type: 'ARRAY'
        },
        joinedLobbies: {
            type: 'ARRAY'
        },
        toJSON: function () {
            var object = this.toObject();

            delete object.password;

            return object;
        }
    },
    beforeCreate: function (values, cb) {
        bcrypt.hash(values.password, 10, function (error, hashedPassword) {
            if (error) {
                cb(error);
            } else {
                values.password = hashedPassword;

                cb();
            }
        });
    }
};
