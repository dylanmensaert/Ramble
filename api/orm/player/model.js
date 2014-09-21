/* jshint camelcase: false */
'use strict';

var Model = require('../components/model'),
    Fields = require('bookshelf-fields'),
    events = require('./events'),
    Player,
    Membership;

Player = Model.extend({
    tableName: 'players',
    initialize: function() {
        Model.prototype.initialize.apply(this, arguments);

        events.init(this);
    },
    memberships: function() {
        return this.hasMany(Membership);
    }
});

Fields.enable_validation(Player);

Fields.fields(Player, [
    Fields.StringField, 'name', {
        required: true
    }, {
        max_length: 50
    }
], [
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

Membership = require('../membership/model');
