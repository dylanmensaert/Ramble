define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend({
        title: function () {
            return this.get('controller.title');
        }.property('controller.title'),
        beforeModel: function (transition) {
            if (!this.get('session.isLoggedIn')) {
                this.set('session.attemptedTransition', transition);
            }
        }
    });
});
