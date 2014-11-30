define(function(require) {
    'use strict';

    // TODO: Integrate socket.io v1.0 when supported by sails.
    // Follow: https://github.com/balderdashy/sails/issues/1443
    var io = require('io'),
        socket = io.connect();

    return function(Application) {
        Application.initializer({
            name: 'socket',
            initialize: function(container, application) {
                application.register('socket:main', socket, {
                    instantiate: false
                });

                application.inject('route', 'socket', 'socket:main');
                application.inject('controller', 'socket', 'socket:main');
                application.inject('adapter', 'socket', 'socket:main');
            }
        });
    };
});
