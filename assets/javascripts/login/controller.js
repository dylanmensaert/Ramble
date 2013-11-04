define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        errorMessage: null,
        retryTransition: function () {
            var attemptedTransition = this.get('session.attemptedTransition');

            if (attemptedTransition) {
                this.set('session.attemptedTransition', null);

                attemptedTransition.retry();
            }

            return attemptedTransition;
        },
        checkSession: function () {
            var json = {
                url: '/api/auth/checkSession'
            };

            this.get('socket').emit('get', json, function (data) {
                if (data.status === 200) {
                    this.get('store').find('player', data.player.id).then(function (player) {
                        this.set('session.account', player);

                        this.retryTransition();
                    }.bind(this));
                } else {
                    this.set('session.account', null);
                }
            }.bind(this));
        },
        actions: {
            login: function () {
                var json,
                    player;

                json = {
                    url: '/api/auth/login',
                    data: {
                        username: this.get('username'),
                        password: this.get('password')
                    }
                };
                player = this.get('model');

                player.validate().then(function () {
                    this.get('socket').emit('get', json, function (data) {
                        if (data.status === 200) {
                            this.get('store').find('player', data.player.id).then(function (player) {
                                this.set('session.account', player);

                                if (!this.retryTransition()) {
                                    this.transitionToRoute('player', this.get('session.account'));
                                }
                            }.bind(this));
                        } else {
                            this.set('errorMessage', data.message);
                        }
                    }.bind(this));
                }.bind(this));
            },
            logout: function () {
                var json = {
                    url: '/api/auth/logout'
                };

                this.get('socket').emit('get', json, function (data) {
                    if (data.status === 200) {
                        this.set('session.account', null);

                        this.transitionToRoute('index');
                    }
                }.bind(this));
            }
        }
    });
});
