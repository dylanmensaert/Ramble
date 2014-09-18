'use strict';

module.exports.policies = {
    auth: {
        logout: 'isAuthenticated'
    },
    player: {
        update: 'isOwnerOfAccount',
        destroy: 'isOwnerOfAccount'
    },
    lobby: {
        create: 'isAuthenticated',
        update: 'isOwnerOfLobby',
        destroy: 'isOwnerOfLobby'
    },
    membership: {
        create: 'isAuthenticated',
        update: 'isMemberOfLobby',
        destroy: 'isOwnerOfLobby'
    }
};
