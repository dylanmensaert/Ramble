'use strict';

var Bookshelf = require('./bookshelf');
//TODO: player = require('./player');

module.exports = Bookshelf.Model.extend({
    tableName: 'memberships',
    lobby: function () {
        return this.belongsTo(require('./lobby'));
    },
    player: function () {
        return this.belongsTo(require('./player'));
    }
});
