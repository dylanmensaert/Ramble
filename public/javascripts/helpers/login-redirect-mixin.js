define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Mixin.create({
        redirectToLogin: function (transition) {
            this.set("session.attemptedTransition", transition);
            this.transitionTo("login");
        }
    });
});
