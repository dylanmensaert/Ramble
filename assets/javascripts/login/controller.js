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
                var socket,
                    json;

                socket = this.get('socket');
                json = {
                    url: '/api/auth/login',
                    data: {
                        username: this.get('username'),
                        password: this.get('password')
                    }
                };

                //TODO: before trying to authenticate, check if fields are not empty
                socket.emit('get', json, function (data) {
                    if (data.status === 200) {
                        this.get('store').find('player', data.player.id).then(function (player) {
                            this.didLoginSuccessfully(player);
                        }.bind(this));
                    } else {
                        this.set('session.hasValidCredentials', false);
                    }
                }.bind(this));
            },
            logout: function () {
                var socket,
                    json;

                socket = this.get('socket');
                json = {
                    url: '/api/auth/logout'
                };

                socket.emit('get', json, function (data) {
                    if (data.status === 200) {
                        this.set('session.account', null);
                        this.set('session.isLoggedIn', false);

                        this.transitionToRoute('index');
                    }
                }.bind(this));
            }
        }
    });
});
