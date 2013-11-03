'use strict';

var passport = require('passport');

module.exports = {
    _config: {
        blueprints: {
            pluralize: false
        }
    },
    login: function (request, response) {
        passport.authenticate('local', function (error, player) {
            if (error) {
                response.error(error);
            } else if (!player) {
                response.forbidden('Login unsuccessful.');
            } else {
                request.logIn(player, function (error) {
                    if (error) {
                        response.error(error);
                    } else {
                        response.send({
                            status: 200,
                            message: 'Login successful.',
                            player: player
                        });
                    }
                });
            }
        })(request, response);
    },
    logout: function (request, response) {
        if (request.user) {
            request.logOut();

            response.send({
                status: 200,
                message: 'Logout successful.'
            });
        } else {
            response.send({
                status: 200,
                message: 'Already logged out.'
            });
        }
    },
    checkSession: function (request, response) {
        if (request.user) {
            response.send({
                status: 200,
                message: 'Session active.',
                player: request.user
            });
        } else {
            response.forbidden('Session inactive.');
        }
    }
};
