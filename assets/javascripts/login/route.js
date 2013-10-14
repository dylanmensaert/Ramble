define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend({
        title: 'Log in',
        model: function () {
            return Ember.Object.create({});
        },
        beforeModel: function () {
            if (this.get('session.isLoggedIn')) {
                this.transitionTo('index');
            }
        }
    });
});
