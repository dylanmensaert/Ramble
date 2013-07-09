define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : "Log in",
        isLeaf : true,
        isValidLogin : true,
        isLoggedIn : false,
        login : function () {
            //TODO: temporary client-sided test
            //TODO: before trying to authenticate, check if fields are not empty
            if (this.get("username") === "donut" && this.get("password") === "donut") {
                this.set("isValidLogin", true);
                this.set("isLoggedIn", true);

                this.set("model", App.Player.find(1));

                this.transitionToRoute("player", this.get("model"));
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
