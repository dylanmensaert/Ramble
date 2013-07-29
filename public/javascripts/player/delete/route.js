define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        afterModel : function (model) {
            if (this.controllerFor("application").get("account") !== model) {
                this.transitionTo("login");
            }
        }
    });
});
