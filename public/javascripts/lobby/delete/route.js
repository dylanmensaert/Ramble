define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        afterModel: function (model, transition) {
            if (!this.controllerFor("application").get("isLoggedIn")) {
                this.transitionToLogin(transition);
            } else if (this.controllerFor("application").get("account") !== model.get("owner")) {
                this.transitionTo("index");
            }
        },
        transitionToLogin: function (transition) {
            this.controllerFor("login").set("lastTransition", transition);
            this.transitionTo("login");
        }
    });
});
