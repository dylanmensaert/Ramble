/* jshint camelcase: false */
'use strict';

var Model = require('./model'),
    Fields = require('bookshelf-fields'),
    Lobby,
    Membership,
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

Lobby = Model.extend({
    tableName: 'lobbies',
    ownership: function() {
        return this.hasOne(Membership).query({
            where: {
                type: 'owner'
            }
        });
    },
    memberships: function() {
        return this.hasMany(Membership).query({
            where: {
                type: 'member'
            }
        });
    },
    hashPassword: function() {
        return setHashedPassword(this.attributes);
    },
    verifyPassword: function(password) {
        return verifyPassword(password, this.attributes.password);
    }
});

Fields.enable_validation(Lobby);

Fields.fields(Lobby, [
    Fields.StringField, 'title', {
        required: true
    }, {
        max_length: 50
    }
], [
    Fields.StringField, 'password', {
        required: true
    }
], [
    Fields.IntField, 'maxMembers', {
        required: true
    }
]);

module.exports = Lobby;

Membership = require('./membership');
