'use strict';

var Collection = require('../components/collection'),
    Player = require('./model');

module.exports = Collection.extend({
    model: Player
});
