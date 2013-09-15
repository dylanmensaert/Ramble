define(function (require) {
    "use strict";

    var Ember = require("ember"),
        App = require("App");

    return {
        initialize: function () {
            App.Session = Ember.Object.extend({
                hasValidCredentials: true,
                isLoggedIn: false,
                account: null,
                attemptedTransition: null
            });

            Ember.onLoad("Ember.Application", function (Application) {
                Application.initializer({
                    name: "session",
                    initialize: function (container, application) {
                        application.register("session:current", application.Session, {
                            singleton: true
                        });

                        application.inject("route", "session", "session:current");
                        application.inject("controller", "session", "session:current");
                    }
                });
            });
        }
    };
});
