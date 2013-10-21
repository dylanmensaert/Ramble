'use strict';

module.exports.policies = {
    auth: {
        login: true,
        logout: 'isAuthenticated'
    },
    player: {
        find: true,
        create: true,
        update: 'isOwnerOfAccount',
        //TODO: Logout first before destroying player!
        destroy: 'isOwnerOfAccount'
    },
    lobby: {
        find: true,
        create: 'isAuthenticated',
        update: 'isOwnerOfLobby',
        destroy: 'isOwnerOfLobby'
    }
};
