define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Mixin.create(require('login/helpers/redirect-login-mixin'), {
        checkOwnershipAndRedirect: function (owner, transition) {
            if (!this.get('session.isLoggedIn')) {
                this.redirectToLogin(transition);
            } else if (this.get('session.account') !== owner) {
                this.transitionTo('index');
            }
        }
    });
});
