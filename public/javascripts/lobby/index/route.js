define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        hasSavedTransition: false,
        afterModel: function (model, transition) {
            if (!this.controllerFor("application").get("isLoggedIn")) {
                this.controllerFor("login").set("lastTransition", transition);
            }
        }
    });
});
