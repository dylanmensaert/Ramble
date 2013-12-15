define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/update-title-mixin'), require('helpers/model-rollback-mixin'), {
        title: 'Sign up',
        model: function () {
            return this.get('store').createRecord('player');
        },
        beforeModel: function () {
            if (this.get('session.isLoggedIn')) {
                this.transitionTo('index');
            }
        },
        deactivate: function () {
            this.checkToRollbackModel();
        }
    });
});
