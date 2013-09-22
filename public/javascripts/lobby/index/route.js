define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        title: function () {
            return this.get("controller.model.title");
        }.property("controller.model.title"),
        beforeModel: function (transition) {
            if (!this.get("session.isLoggedIn")) {
                this.set("session.attemptedTransition", transition);
            }
        }
    });
});
