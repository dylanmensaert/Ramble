'use strict';

var Collection = require('../components/collection'),
    Membership = require('./model');

module.exports = Collection.extend({
    model: Membership
});
