'use strict';

module.exports = function (ids) {
    return this.query().whereIn(ids).then(function (models) {
        this.add(models);

        return this.load(this.relationNames);
    }.bind(this));
};
