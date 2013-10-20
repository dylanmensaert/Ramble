define(function (require) {
    'use strict';

    var Ember = require('ember');

    Ember.onLoad('Ember.Application', function (Application) {
        Application.initializer({
            name: 'socket',
            initialize: function (container, application) {
                application.register('socket:main', application.socket, {
                    instantiate: false
                });

                application.inject('route', 'socket', 'socket:main');
                application.inject('controller', 'socket', 'socket:main');
            }
        });
    });
});
