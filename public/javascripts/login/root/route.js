define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Route.extend({
        model: function () {
            //TODO: Use App.Player.createRecord();?
            return Ember.Object.create({});
        },
        //TODO: Is afterModel required? "redirect"-hook suffices?
        afterModel: function () {
            if (this.get("controller.isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});
