/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    Fields = require('bookshelf-fields'),
    Lobby,
    Player,
    Membership,
    relations = require('./relations').lobby,
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

Lobby = db.Model.extend({
    tableName: 'lobbies',
    toJSON: function() {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        //TODO: Use Bookshelf-visibility-plugin
        delete model.password;

        return toUnderscore(model);
    },
    format: function(attrs) {
        return toCamelCase(attrs);
    },
    owner: function() {
        return this.belongsTo(Player, 'owner_id');
    },
    members: function() {
        return this.belongsToMany(Player).through(Membership);
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
], [
    Fields.IntField, 'owner_id', {
        required: true
    }
]);

module.exports = Lobby;

Player = require('./player');
Membership = require('./membership');
