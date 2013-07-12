define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        afterModel : function (model) {
            //TODO: Use controller.application instead of controllerFor
            if (this.controllerFor("application").get("account") !== model) {
                this.transitionTo("login");
            }
        }
    });
});
