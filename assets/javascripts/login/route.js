define(function (require) {
    'use strict';

    var Ember = require('ember'),
        loginModel = require('login/model');

    return Ember.Route.extend(require('helpers/update-title-mixin'), {
        title: 'Log in',
        model: function () {
            return loginModel.create();
        },
        beforeModel: function () {
            if (this.get('session.isLoggedIn')) {
                this.transitionTo('index');
            }
        },
        setupController: function (controller, model) {
            this._super(controller, model);

            controller.set('errorMessage', null);
        }
    });
});
