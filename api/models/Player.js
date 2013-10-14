'use strict';

//TODO: Has to change to original bcrypt instead of -nodejs version
var bcrypt = require('bcrypt-nodejs');
/**
 * Player
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

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
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function (values, next) {
        bcrypt.hash(values.password, 10, function (err, hash) {
            if (err) {
                return next(err);
            }
            values.password = hash;
            next();
        });
    }
};
