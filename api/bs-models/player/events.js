'use strict';

var Player,
    bluebird = require('bluebird'),
    destroyChildren;

// TODO: Implement destroy children via dependents attribute on model. Create logic to handle dependants on destroy
destroyChildren = function(model) {
    return bluebird.all([
        model.memberships().invokeThen('destroy')
    ]);
};

module.exports = {
    init: function(model) {
        Player = model;

        Player.on('destroying', this.onDestroying);
    },
    onDestroying: function(model, response, options) {
        return bluebird.all([
            destroyChildren(model, response, options)
        ]);
    }
};
