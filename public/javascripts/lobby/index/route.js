define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        beforeModel: function (transition) {
            if (!this.get("session.isLoggedIn")) {
                this.set("session.attemptedTransition", transition);
            }
        }
    });
});
