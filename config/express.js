'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (player, done) {
    done(null, player.id);
});

passport.deserializeUser(function (id, done) {
    Player.findOne(id).done(function (error, player) {
        done(error, player);
    });
});

module.exports.express = {
    customMiddleware: function (app) {
        passport.use(new LocalStrategy(function (username, password, done) {
            Player.findOneByUsername(username).done(function (error, player) {
                if (error) {
                    done(error);
                } else if (!player) {
                    done(null, false);
                } else {
                    player.verifyPassword(password, function (error, isValid) {
                        if (error) {
                            done(error);
                        } else if (!isValid) {
                            done(null, false);
                        } else {
                            done(null, player);
                        }
                    });
                }
            });
        }));

        app.use(passport.initialize());
        app.use(passport.session());
    }
};
