'use strict';

module.exports = function (attrs) {
    return _.reduce(attrs, function (memo, value, key) {
        memo[_.str.underscored(key)] = value;
        return memo;
    }, {});
};
