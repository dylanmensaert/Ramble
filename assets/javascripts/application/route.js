define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend({
        title: 'Ramble',
        activate: function () {
            this._super();

            this.registerSocketMessages();
            this.controllerFor('login').checkSession();
        },
        registerSocketMessages: function () {
            this.get('socket').on('message', function (message) {
                if (message.verb !== 'destroy') {
                    //TODO: If created new model locally, it will be duplicated because Sails first broadcasts, before sending response to sender
                    this.get('store').push(message.model, message.data);
                }
            }.bind(this));
        },
        actions: {
            /*error: function (error) {
             //TODO: Make error-handling more robust?
             console.debug(error);
             this.transitionTo('index');
             },*/
            logout: function () {
                this.controllerFor('login').send('logout');
            }
        }
    });
});
