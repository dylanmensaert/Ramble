define(function(require) {
    'use strict';

    var Ember = require('ember'),
        injectSession = require('session/inject'),
        injectSocket = require('socket/inject');

    Ember.onLoad('Ember.Application', function(Application) {
        injectSession(Application);

        injectSocket(Application);
    });
});
