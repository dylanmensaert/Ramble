define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        //TODO: Transition is undefined (providedModelsArray: ) if transitionTo() didn't happen.
        afterModel: function (model, transition) {
            if (!this.controllerFor("application").get("isLoggedIn") && !this.controllerFor("login").get("lastTransition")) {
                this.controllerFor("login").set("lastTransition", transition);

                this.transitionTo("lobby");
            }
        }
    });
});
