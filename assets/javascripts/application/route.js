define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend({
        title: 'Ramble',
        activate: function () {
            //TODO: Move code in separate method?
            var socket,
                store;

            socket = this.get('socket');
            store = this.get('store');

            socket.on('message', function (message) {
                //TODO: If created new model locally, it will be duplicated because Sails first broadcasts, before sending response to sender
                store.push(message.model, message.data);
            });

            this.checkSession();

            this._super();
        },
        checkSession: function () {
            var socket,
                store,
                session,
                json;

            socket = this.get('socket');
            store = this.get('store');
            session = this.get('session');
            json = {
                url: '/api/auth/checkSession'
            };

            socket.emit('get', json, function (data) {
                if (data.status === 200) {
                    this.get('store').find('player', data.player.id).then(function (player) {
                        session.set('account', player);
                    }.bind(this));
                }
            }.bind(this));
        }
    });
});
