'use strict';

var _ = require('underscore');

module.exports = function(query) {
    return _.pick(query, function(value) {
        return value;
    });
};
