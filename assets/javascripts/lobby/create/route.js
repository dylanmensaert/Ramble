define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/login-redirect-mixin'), require('helpers/model-rollback-mixin'), {
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
            //TODO: Is rollback needed after creating a record?
            this.checkToRollbackModel();
        }
    });
});
