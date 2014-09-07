'use strict';

module.exports = {
    get: function(type) {
        return this[type];
    },
    lobbies: ['ownership', 'memberships'],
    players: ['ownerships', 'memberships'],
    memberships: ['lobby', 'player']
};
