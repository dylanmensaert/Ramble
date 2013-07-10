define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        //TODO: add join lobby and correct redirection
        afterModel : function () {
            if (!this.controllerFor("application").get("isLoggedIn")) {
                this.transitionTo("login");
            }
        }
    });
});
