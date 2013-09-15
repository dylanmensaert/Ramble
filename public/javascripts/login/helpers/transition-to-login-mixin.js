define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Mixin.create({
        transitionToLogin: function (transition) {
            this.set("session.attemptedTransition", transition);
            this.transitionTo("login");
        }
    });
});
