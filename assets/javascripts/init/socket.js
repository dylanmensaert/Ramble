define(function (require) {
    'use strict';

    var Ember = require('ember'),
        socket = require('io').connect();

    Ember.onLoad('Ember.Application', function (Application) {
        Application.initializer({
            name: 'socket',
            initialize: function (container, application) {
                application.register('socket:main', socket, {
                    instantiate: false
                });

                application.inject('route', 'socket', 'socket:main');
                application.inject('controller', 'socket', 'socket:main');
                application.inject('adapter', 'socket', 'socket:main');
            }
        });
    });
});
