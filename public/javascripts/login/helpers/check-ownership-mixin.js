define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Mixin.create(require("login/helpers/transition-to-login-mixin"), {
        checkOwnership: function (owner, transition) {
            if (!this.get("session.isLoggedIn")) {
                this.transitionToLogin(transition);
            } else if (this.get("session.account") !== owner) {
                this.transitionTo("index");
            }
        }
    });
});
