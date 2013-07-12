define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        afterModel : function (model) {
            if (this.controllerFor("application").get("account") !== model) {
                this.transitionTo("login");
            }
        }
    });
});
