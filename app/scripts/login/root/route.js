define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        //TODO: temporary client-sided test
        model : function () {
            return {};
        },
        afterModel : function () {
            if (this.get("controller.isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});
