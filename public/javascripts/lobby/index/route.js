define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        hasSavedTransition: false,
        afterModel: function (model, transition) {
            if (!this.get("session.isLoggedIn")) {
                this.set("session.attemptedTransition", transition);
            }
        }
    });
});
