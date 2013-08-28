define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        //TODO: Transition is undefined (providedModelsArray: 0) if transitionTo() didn't happen after saving transition object.
        //this is caused by a possible ember bug.
        hasSavedTransition: false,
        afterModel: function (model, transition) {
            if (!this.controllerFor("application").get("isLoggedIn") && !this.get("hasSavedTransition")) {
                this.controllerFor("login").set("lastTransition", transition);
                this.set("hasSavedTransition", true);

                this.transitionTo("lobby");
            } else {
                this.set("hasSavedTransition", false);
            }
        }
    });
});
