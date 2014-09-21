'use strict';

var validate = require('../api/policies/helpers/validate'),
    _ = require('underscore'),
    authorize;

authorize = function(policies, assert) {
    if (!_.isArray(policies)) {
        policies = [];
    }

    return ['isAuthenticated'].concat(policies, [validate(assert)]);
};

module.exports.policies = {
    '*': false,
    auth: {
        login: true,
        checkSession: true,
        logout: authorize()
    },
    player: {
        find: true,
        update: authorize(['isOwnerOfAccount']),
        destroy: authorize(['isOwnerOfAccount'])
    },
    lobby: {
        find: true,
        create: authorize(),
        update: authorize(['isHostOfLobby'])
    },
    membership: {
        find: true,
        create: authorize(),
        update: authorize(['isOwnerOfMembership']),
        destroy: authorize(['isOwnerOfMembership', 'isHostForMembership'], function(validations) {
            return validations[0] || validations[1];
        })
    }
};
