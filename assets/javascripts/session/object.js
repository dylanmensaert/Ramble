define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Object.extend({
        user: null,
        isLoggedIn: function() {
            return this.get('user') !== null;
        }.property('user'),
        attemptedTransition: null
    });
});
