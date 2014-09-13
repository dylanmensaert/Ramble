define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        errorMessage: null,
        retryTransition: function() {
            var attemptedTransition = this.get('session.attemptedTransition');

            if (attemptedTransition) {
                this.set('session.attemptedTransition', null);

                attemptedTransition.retry();
            }

            return attemptedTransition;
        },
        checkSession: function() {
            var json = {
                url: '/api/auth/checkSession'
            };

            this.get('socket').emit('get', json, function(data) {
                if (data.status === 200) {
                    this.get('store').find('player', data.player.id).then(function(player) {
                        this.set('session.user', player);

                        this.retryTransition();
                    }.bind(this));
                } else {
                    this.set('session.user', null);
                }
            }.bind(this));
        },
        actions: {
            login: function() {
                var player,
                    json;

                player = this.get('model');
                json = {
                    url: '/api/auth/login',
                    data: {
                        name: player.get('name'),
                        password: player.get('password')
                    }
                };

                player.validate().then(function() {
                    this.get('socket').emit('get', json, function(data) {
                        if (data.status === 200) {
                            this.get('store').find('player', data.player.id).then(function(player) {
                                this.set('session.user', player);

                                if (!this.retryTransition()) {
                                    this.transitionToRoute('player', this.get('session.user'));
                                }
                            }.bind(this));
                        } else {
                            this.set('errorMessage', data.message);
                        }
                    }.bind(this));
                }.bind(this));
            },
            logout: function() {
                var json = {
                    url: '/api/auth/logout'
                };

                this.get('socket').emit('get', json, function(data) {
                    if (data.status === 200 || data.status === 403) {
                        this.set('session.user', null);

                        this.transitionToRoute('index');
                    }
                }.bind(this));
            }
        }
    });
});
