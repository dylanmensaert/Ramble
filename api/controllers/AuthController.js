/* jshint nomen: false */
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
                response.send(error);
            } else if (!player) {
                response.send({
                    status: 403,
                    message: 'Login unsuccessful.'
                });
            } else {
                request.logIn(player, function (error) {
                    if (error) {
                        response.send(error);
                    } else {
                        return response.send({
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
        request.logOut();

        response.send({
            status: 200,
            message: 'Logout successful.'
        });
    },
    checkSession: function (request, response) {
        if (request.user !== undefined) {
            response.send({
                status: 200,
                message: 'Session active.',
                player: request.user
            });
        } else {
            response.send({
                status: 403,
                message: 'Session inactive.'
            });
        }
    }
};
