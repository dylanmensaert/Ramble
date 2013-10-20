/* jshint nomen: false */
'use strict';

/**
 * AuthController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

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
                    message: 'login failed'
                });
            } else {
                request.logIn(player, function (error) {
                    if (error) {
                        response.send(error);
                    } else {
                        return response.send({
                            status: 200,
                            message: 'login successful',
                            player: {
                                id: player.id
                            }
                        });
                    }
                });
            }
        })(request, response);
    },
    logout: function (request, response) {
        request.logout();

        response.send({
            status: 200,
            message: 'logout successful'
        });
    }
};
