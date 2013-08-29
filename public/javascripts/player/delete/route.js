define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend(require("login/helpers/transitionToLoginMixin"), {
        afterModel: function (model, transition) {
            if (!this.controllerFor("application").get("isLoggedIn")) {
                this.transitionToLogin(transition);
            } else if (this.controllerFor("application").get("account") !== model) {
                this.transitionTo("index");
            }
        }
    });
});
