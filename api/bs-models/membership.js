'use strict';

var Bookshelf = require('./bookshelf');
//TODO: player = require('./player');
//TODO: Owner/OwnedLobbies not returning object after name change + through() implementation.

module.exports = Bookshelf.Model.extend({
    tableName: 'memberships',
    player_id: function () {
        return this.belongsTo(require('./player'));
    },
    lobby_id: function () {
        return this.belongsTo(require('./lobby'));
    }
});