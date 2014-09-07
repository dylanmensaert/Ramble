'use strict';

module.exports = {
    get: function(type) {
        var value;

        if (this.hasOwnProperty(type)) {
            value = this[type];
        }

        return value;
    },
    lobbies: ['ownership', 'memberships'],
    players: ['ownerships', 'memberships'],
    memberships: ['lobby', 'player']
};
