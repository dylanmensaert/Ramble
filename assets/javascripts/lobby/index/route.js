define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/update-title'), {
        title: function() {
            return this.controller.get('title');
        }.property(),
        beforeModel: function(transition) {
            if (!this.get('session.isLoggedIn')) {
                // TODO: Shouldn't always set session.attemptedTransition? Only when clicking join and not loggedIn?
                this.set('session.attemptedTransition', transition);
            }
        }
    });
});
