define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        actions: {
            delete: function() {
                var model = this.get('model');

                model.destroyRecord().then(function() {
                    this.send('logout');
                }.bind(this));
                // TODO: Leave all of the user's joined lobbies AND delete all its owned lobbies before deleting the user.
                // model.get('joinedLobbies').clear();
                // model.get('ownedLobbies').clear();
            }
        }
    });
});
