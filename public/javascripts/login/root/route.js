define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Route.extend({
        model: function () {
            //TODO: Use App.Player.createRecord();?
            return Ember.Object.create({});
        },
        //TODO: Is afterModel required? "redirect"-hook suffices?
        afterModel: function () {
            if (this.get("session.isLoggedIn")) {
                this.transitionTo("index");
            }
        }
    });
});
