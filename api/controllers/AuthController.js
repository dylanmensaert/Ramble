'use strict';

var passport = require('passport');

module.exports = {
    login: function(request, response) {
        passport.authenticate('local', function(error, player) {
            if (error) {
                response.error(error);
            } else if (!player) {
                response.forbidden('Login unsuccessful.');
            } else {
                request.logIn(player, function(error) {
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
    logout: function(request, response) {
        request.logOut();

        response.send({
            status: 200,
            message: 'Logout successful.'
        });
    },
    checkSession: function(request, response) {
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
