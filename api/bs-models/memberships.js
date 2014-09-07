'use strict';

var Collection = require('./collection'),
    Membership = require('./membership');

module.exports = Collection.extend({
    model: Membership
});
