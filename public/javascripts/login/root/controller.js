define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        App = require("App");

    return Ember.ObjectController.extend({
        documentTitle : "Log in",
        isLeaf : true,
        isLoggedIn : false,
        isValidLogin : true,
        login : function () {
            //TODO: temporary client-sided test
            //TODO: before trying to authenticate, check if fields are not empty
            //TODO: Weird bug sometimes when pressing enter on a text-field
            var model;

            if (this.get("username") === "donut" && this.get("password") === "donut") {
                this.set("isLoggedIn", true);
                this.set("isValidLogin", true);

                model = App.Player.find(1);

                this.set("model", model);

                //TODO: Transition to route that the user wanted to access, but had to be authenticated for
                //See: https://gist.github.com/machty/5647589
                this.transitionToRoute("player.index", this.get("model"));
            } else {
                this.set("isValidLogin", false);
            }
        },
        logout : function () {
            this.set("isLoggedIn", false);

            //TODO: Secure to just put model of logged-in user to null?
            this.set("model", null);

            this.transitionToRoute("index");
        }
    });
});
