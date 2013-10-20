define(function (require) {
    'use strict';

    var Ember = require('ember'),
        loginModel = require('login/model');

    return Ember.Route.extend({
        title: 'Log in',
        model: function () {
            return loginModel.create();
        },
        beforeModel: function () {
            if (this.get('session.isLoggedIn')) {
                this.transitionTo('index');
            }
        }
    });
});
