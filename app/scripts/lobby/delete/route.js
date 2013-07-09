define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        redirect : function () {
            if (this.controllerFor("application").get("account") != this.modelFor("lobby").get("owner")) {
                this.transitionTo("login");
            }
        }
    });
});
