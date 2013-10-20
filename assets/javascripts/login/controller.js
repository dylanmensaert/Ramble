define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.ObjectController.extend({
        errorMessage: '',
        didLoginSuccessfully: function (player) {
            var attemptedTransition = this.get('session.attemptedTransition');

            this.set('session.account', player);
            this.set('errorMessage', '');

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
                    json,
                    player;

                socket = this.get('socket');
                json = {
                    url: '/api/auth/login',
                    data: {
                        username: this.get('username'),
                        password: this.get('password')
                    }
                };

                player = this.get('model');

                player.validate().then(function () {
                    socket.emit('get', json, function (data) {
                        if (data.status === 200) {
                            this.get('store').find('player', data.player.id).then(function (player) {
                                this.didLoginSuccessfully(player);
                            }.bind(this));
                        } else {
                            this.set('errorMessage', data.message);
                        }
                    }.bind(this));
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

                        this.transitionToRoute('index');
                    }
                }.bind(this));
            }
        }
    });
});
