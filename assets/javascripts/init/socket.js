/* jshint maxstatements: false */
define(function (require) {
    'use strict';

    var io = require('io'),
        socket;

    require('sails-io');

    socket = io.connect();

    socket.on('connect', function () {
        console.log('connected');
        socket.on('message', function (message) {
            console.log('New comet message received :: ', message);
        });
    });
});
