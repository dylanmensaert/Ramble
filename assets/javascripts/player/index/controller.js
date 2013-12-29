define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        //TODO: Not equal when they are the same record? Bug in ember-data, or just compare the ID's?
        isOwnerOfAccount: function() {
            return this.get('session.account') === this.get('model');
        }.property('session.account', 'model')
    });
});
