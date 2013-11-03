define(function (require) {
    'use strict';

    var Ember = require('ember'),
        session;

    session = Ember.Object.extend({
        account: null,
        isLoggedIn: function () {
            return this.get('account') !== null;
        }.property('account'),
        attemptedTransition: null
    });

    Ember.onLoad('Ember.Application', function (Application) {
        Application.initializer({
            name: 'session',
            initialize: function (container, application) {
                application.register('session:current', session, {
                    singleton: true
                });

                application.inject('route', 'session', 'session:current');
                application.inject('controller', 'session', 'session:current');
            }
        });
    });
});
