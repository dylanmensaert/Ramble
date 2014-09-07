'use strict';

var Collection = require('./collection'),
    Player = require('./player');

module.exports = Collection.extend({
    model: Player
});
