'use strict';

module.exports = function (ids) {
    return this.query().whereIn(ids).then(function (players) {
        this.add(players);

        return this.load(this.relationNames);
    }.bind(this));
};
