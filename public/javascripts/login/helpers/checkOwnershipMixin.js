define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Mixin.create(require("login/helpers/transitionToLoginMixin"), {
        checkOwnership: function (owner, transition) {
            if (!this.controllerFor("application").get("isLoggedIn")) {
                this.transitionToLogin(transition);
            } else if (this.controllerFor("application").get("account") !== owner) {
                this.transitionTo("index");
            }
        }
    });
});
