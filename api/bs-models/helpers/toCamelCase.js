'use strict';

var _ = require('lodash'),
    _s = require('underscore.string');

module.exports = function(attrs) {
    return _.reduce(attrs, function(memo, value, key) {
        memo[_s.camelize(key)] = value;
        return memo;
    }, {});
};
