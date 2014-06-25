'use strict';

var setupPassportForSocketIO = function() {
    // TODO: Fix to make passport.js work with websockets!
    // see http://stackoverflow.com/questions/17365444/sails-js-passport-js-authentication-through-websockets/18343226#18343226
    var passport = require('passport'),
        initialize = passport.initialize(),
        session = passport.session(),
        http = require('http'),
        methods = ['login', 'logIn', 'logout', 'logOut', 'isAuthenticated', 'isUnauthenticated'];

    sails.removeAllListeners('router:request');
    sails.on('router:request', function(request, response) {
        initialize(request, response, function() {
            session(request, response, function(error) {
                if (error) {
                    sails.config[500](500, request, response);
                } else {
                    methods.forEach(function(method) {
                        request[method] = http.IncomingMessage.prototype[method].bind(request);
                    });

                    sails.router.route(request, response);
                }
            });
        });
    });
};

module.exports.bootstrap = function(cb) {
    setupPassportForSocketIO();

    cb();
};
