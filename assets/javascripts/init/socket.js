define(function(require) {
    'use strict';

    var Ember = require('ember'),
        io = require('io'),
        socket;

    socket = io.connect();

    Ember.onLoad('Ember.Application', function(Application) {
        Application.initializer({
            name: 'socket',
            initialize: function(container, application) {
                application.register('socket:main', socket, {
                    instantiate: false
                });

                application.inject('route', 'socket', 'socket:main');
                application.inject('controller', 'socket', 'socket:main');
                application.inject('data-adapter', 'socket', 'socket:main');
            }
        });
    });
});
