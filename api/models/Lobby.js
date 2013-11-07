'use strict';

var bcrypt = require('bcrypt');
var hashPassword = require('../helpers/hashPassword');

module.exports = {
    schema: true,
    attributes: {
        title: {
            type: 'STRING',
            required: true,
            maxLength: 50
        },
        password: {
            type: 'STRING',
            required: true
        },
        maxMembers: {
            type: 'INTEGER',
            required: true,
            numeric: true
        },
        //TODO: Use association.. (Mongoose)
        owner: {
            type: 'STRING',
            required: true
        },
        members: {
            type: 'ARRAY'
        },
        verifyPassword: function (password, done) {
            var lobby = this.toObject();

            bcrypt.compare(password, lobby.password, done);
        },
        toJSON: function () {
            var lobby = this.toObject();

            delete lobby.password;

            return lobby;
        }
    },
    beforeCreate: function (values, next) {
        hashPassword(values, next);
    },
    beforeUpdate: function (values, next) {
        if (values.password) {
            hashPassword(values, next);
        } else {
            Lobby.findOne(values.id).done(function (error, lobby) {
                if (error) {
                    next(error);
                } else {
                    values.password = lobby.password;

                    next();
                }
            });
        }
    }
};