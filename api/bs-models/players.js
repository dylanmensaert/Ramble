'use strict';

var Bookshelf = require('./bookshelf'),
    Player = require('./player'),
    relations = Player.relationNames;

module.exports = Bookshelf.Collection.extend({
    model: Player,
    findMany: function (ids) {
        return this.query().whereIn(ids).then(function (players) {
            this.add(players);

            return this.load(relations);
        }.bind(this));
    }
});
