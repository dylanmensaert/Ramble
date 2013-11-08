'use strict';

var bcrypt = require('bcrypt'),
    setHashedPassword = require('../helpers/setHashedPassword');

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
        setHashedPassword(Lobby, values, next);
    },
    beforeUpdate: function (values, next) {
        setHashedPassword(Lobby, values, next);
    }
};