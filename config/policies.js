'use strict';

module.exports.policies = {
    auth: {
        login: true,
        logout: true,
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
    }
};
