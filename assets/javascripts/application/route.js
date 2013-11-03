define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend({
        title: 'Ramble',
        activate: function () {
            this._super();

            this.registerSocketMessages();
            //TODO: can't send event from ApplicationRoute's activate?
            //see: https://github.com/emberjs/ember.js/issues/3685
            //this.send('checkSession');
            this.controllerFor('login').send('checkSession');
        },
        registerSocketMessages: function () {
            var socket,
                store;

            socket = this.get('socket');
            store = this.get('store');

            socket.on('message', function (message) {
                if (message.verb !== 'destroy') {
                    //TODO: If created new model locally, it will be duplicated because Sails first broadcasts, before sending response to sender
                    store.push(message.model, message.data);
                }
            });
        },
        actions: {
            error: function () {
                //TODO: Make error-handling more robust?
                this.transitionTo('index');
            },
            logout: function () {
                this.controllerFor('login').send('logout');
            },
            checkSession: function () {
                this.controllerFor('login').send('checkSession');
            }
        }
    });
});
