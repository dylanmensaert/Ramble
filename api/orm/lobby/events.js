'use strict';

var Lobby,
    createOwnership,
    destroyChildren;

createOwnership = function(model, response, options) {
    var values = {
        lobbyId: model.id,
        playerId: options.userId,
        type: 'owner'
    };

    Lobby.forge(values).save();
};

destroyChildren = function(model) {
    // TODO: bulk is possible but events are not called as such
    // Memberships.query().whereIn('id', [ids]).del().then(..
    model.ownership().destroy();
    model.memberships().invokeThen('destroy');
};

module.exports = {
    init: function(model) {
        Lobby = model;

        Lobby.on('created', this.onCreated);
        Lobby.on('destroying', this.onDestroying);
    },
    onCreated: function(model, response, options) {
        createOwnership(model, response, options);
    },
    onDestroying: function(model, response, options) {
        destroyChildren(model, response, options);
    }
};
