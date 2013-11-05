define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('login/helpers/redirect-login-mixin'), require('helpers/model-rollback-mixin'), {
        title: 'Create',
        model: function () {
            return this.get('store').createRecord('lobby');
        },
        beforeModel: function (transition) {
            if (!this.get('session.isLoggedIn')) {
                this.redirectToLogin(transition);
            }
        },
        deactivate: function () {
            this.checkToRollbackModel();
        }
    });
});
