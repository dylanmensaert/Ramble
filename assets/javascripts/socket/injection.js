define(function(require) {
    'use strict';

    var io = require('io'),
        socket = io.connect();

    return {
        name: 'socket',
        initialize: function(container, application) {
            application.register('socket:main', socket, {
                instantiate: false
            });

            application.inject('route', 'socket', 'socket:main');
            application.inject('controller', 'socket', 'socket:main');
            application.inject('adapter', 'socket', 'socket:main');
        }
    };
});
