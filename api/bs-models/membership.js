/* jshint camelcase:false */
'use strict';

var Bookshelf = require('./bookshelf');
//TODO: player = require('./player');

module.exports = Bookshelf.Model.extend({
    tableName: 'memberships',
    player_id: function () {
        return this.belongsTo(require('./player'));
    },
    lobby_id: function () {
        return this.belongsTo(require('./lobby'));
    }
});