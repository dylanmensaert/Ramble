define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Object.extend({
        account: null,
        isLoggedIn: function() {
            return this.get('account') !== null;
        }.property('account'),
        attemptedTransition: null
    });
});
