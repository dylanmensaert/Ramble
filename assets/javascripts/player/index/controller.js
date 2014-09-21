define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        isOwnerOfAccount: function() {
            return this.get('session.user') === this.get('model');
        }.property('session.user', 'model')
    });
});
