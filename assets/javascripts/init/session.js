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
                application.register('session:main', session, {
                    singleton: true
                });

                application.inject('route', 'session', 'session:main');
                application.inject('controller', 'session', 'session:main');
            }
        });
    });
});
