/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    player,
    membership,
    relations = require('./relations').lobby,
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword'),
    Fields = require('bookshelf-fields'),
    Lobby;

db.plugin(Fields.plugin);

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
        return this.belongsTo(player, 'owner_id');
    },
    members: function() {
        return this.belongsToMany(player).through(membership);
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
    }, {
        not_null: true
    }
], [
    Fields.StringField, 'password', {
        required: true
    }, {
        not_null: true
    }
], [
    Fields.IntField, 'maxMembers', {
        required: true
    }, {
        not_null: true
    }
]);

module.exports = Lobby;

player = require('./player');
membership = require('./membership');
