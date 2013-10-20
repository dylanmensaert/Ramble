define(function (require) {
    'use strict';

    var Ember = require('ember'),
        App = require('init/app');

    Ember.onLoad('Ember.Application', function (Application) {
        Application.initializer({
            name: 'session',
            initialize: function (container, application) {
                application.register('session:current', application.Session, {
                    singleton: true
                });

                application.inject('route', 'session', 'session:current');
                application.inject('controller', 'session', 'session:current');
            }
        });
    });

    App.Session = Ember.Object.extend({
        account: null,
        isLoggedIn: function () {
            return this.get('account') !== null;
        }.property('account'),
        attemptedTransition: null
    });
});
