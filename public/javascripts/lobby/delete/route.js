define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        afterModel : function (model) {
            if (this.controllerFor("application").get("account") !== model.get("owner")) {
                this.transitionTo("login");
            }
        }
    });
});
