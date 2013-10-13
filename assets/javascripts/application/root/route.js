define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend({
        title: 'Ramble',
        activate: function () {
            /* jshint nomen: false */
            var store,
                socket;

            store = this.get('store');
            socket = this.get('socket');

            socket.on('message', function (message) {
                //TODO: If created new model locally, it will be duplicated because Sails first broadcasts, before sending response to sender
                store.push(message.model, message.data);
            });

            this._super();
        }
    });
});
