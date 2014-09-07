/* jshint camelcase: false */
'use strict';

var Model = require('./model'),
    Fields = require('bookshelf-fields'),
    Player,
    Membership;

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
    // TODO: Set as required issue: https://github.com/bogus34/bookshelf-fields/issues/6
    // Current solution through unsetFields in model.js
    Fields.StringField, 'password', {
        required: true
    }
], [
    // TODO: Check if client validation is compatible with this one.
    Fields.EmailField, 'email', {
        required: true
    }, {
        max_length: 50
    }
]);

module.exports = Player;

Membership = require('./membership');
