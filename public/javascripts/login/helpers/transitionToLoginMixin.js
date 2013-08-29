define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Mixin.create({
        transitionToLogin: function (transition) {
            this.controllerFor("login").set("lastTransition", transition);
            this.transitionTo("login");
        }
    });
});
