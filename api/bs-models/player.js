/* jshint camelcase: false */
'use strict';

var Model = require('./model'),
    Fields = require('bookshelf-fields'),
    Player,
    Membership,
    relations = require('./relations').player,
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

Player = Model.extend({
    tableName: 'players',
    ownerships: function() {
        return this.hasMany(Membership).query({
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
    fetchWithRelated: function() {
        return this.fetch({
            withRelated: relations
        });
    },
    hashPassword: function() {
        return setHashedPassword(this.attributes);
    },
    verifyPassword: function(password) {
        return verifyPassword(password, this.attributes.password);
    }
});

Fields.enable_validation(Player);

Fields.fields(Player, [
    Fields.StringField, 'username', {
        required: true
    }, {
        max_length: 50
    }
], [
    Fields.StringField, 'password', {
        required: true
    }
], [
    Fields.EmailField, 'email', {
        required: true
    }, {
        max_length: 50
    }
]);

module.exports = Player;

Membership = require('./membership');
