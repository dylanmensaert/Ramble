/* jshint camelcase: false */
'use strict';

var Model = require('../components/model'),
    Fields = require('bookshelf-fields'),
    events = require('./events'),
    Lobby,
    Membership;

Lobby = Model.extend({
    tableName: 'lobbies',
    initialize: function() {
        Model.prototype.initialize.apply(this, arguments);

        events.init(this);
    },
    memberships: function() {
        return this.hasMany(Membership);
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

Membership = require('../membership/model');
