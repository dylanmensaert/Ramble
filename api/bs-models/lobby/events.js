'use strict';

var Lobby,
    bluebird = require('bluebird'),
    Membership = require('../membership/model'),
    createMembershipOfTypeHost,
    destroyChildren;

createMembershipOfTypeHost = function(model, response, options) {
    var values = {
        lobbyId: model.id,
        playerId: options.userId,
        type: 'host'
    };

    return Membership.forge(values).save();
};

destroyChildren = function(model) {
    return bluebird.all([
        model.memberships().invokeThen('destroy')
    ]);
};

module.exports = {
    init: function(model) {
        Lobby = model;

        Lobby.on('created', this.onCreated);
        Lobby.on('destroying', this.onDestroying);
    },
    onCreated: function(model, response, options) {
        return bluebird.all([
            createMembershipOfTypeHost(model, response, options)
        ]);
    },
    onDestroying: function(model, response, options) {
        return bluebird.all([
            destroyChildren(model, response, options)
        ]);
    }
};
