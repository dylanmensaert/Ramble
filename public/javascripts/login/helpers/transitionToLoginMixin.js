define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Mixin.create({
        transitionToLogin: function (transition) {
            this.controllerFor("login").set("lastTransition", transition);
            this.transitionTo("login");
        }
    });
});
