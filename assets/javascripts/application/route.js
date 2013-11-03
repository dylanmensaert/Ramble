define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend({
        title: 'Ramble',
        activate: function () {
            this.registerSocketMessages();
            this.controllerFor('login').send('checkSession');

            this._super();
        },
        registerSocketMessages: function () {
            var socket,
                store;

            socket = this.get('socket');
            store = this.get('store');

            socket.on('message', function (message) {
                //TODO: If created new model locally, it will be duplicated because Sails first broadcasts, before sending response to sender
                store.push(message.model, message.data);
            });
        }
    });
});
