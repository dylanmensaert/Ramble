define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        didLoginSuccessfully: function (player) {
            var attemptedTransition = this.get('session.attemptedTransition');

            this.set('session.account', player);
            this.set('session.isLoggedIn', true);
            this.set('session.hasValidCredentials', true);

            if (attemptedTransition) {
                this.set('session.attemptedTransition', null);

                attemptedTransition.retry();
            } else {
                this.transitionToRoute('player', this.get('session.account'));
            }
        },
        actions: {
            login: function () {
                //TODO: before trying to authenticate, check if fields are not empty
                if (this.get('username') === 'donut' && this.get('password') === 'donut') {
                    this.get('store').find('player', 'p1').then(function (model) {
                        this.didLoginSuccessfully(model);
                    }.bind(this));
                } else {
                    this.set('session.hasValidCredentials', false);
                }
            },
            logout: function () {
                this.set('session.isLoggedIn', false);

                //TODO: Secure to just put account of logged-in user to null?
                this.set('session.account', null);

                this.transitionToRoute('index');
            }
        }
    });
});
