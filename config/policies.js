'use strict';

module.exports.policies = {
    auth: {
        login: true,
        logout: 'isAuthenticated',
        checkSession: true
    },
    player: {
        find: true,
        create: true,
        update: 'isOwnerOfAccount',
        destroy: 'isOwnerOfAccount'
    },
    lobby: {
        find: true,
        create: 'isAuthenticated',
        update: 'isOwnerOfLobby',
        destroy: 'isOwnerOfLobby'
    },
    membership: {
        join: 'isAuthenticated',
        leave: 'isMemberOfLobby',
        kick: 'isOwnerOfLobby'
    }
};
