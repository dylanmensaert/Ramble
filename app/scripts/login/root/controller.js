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
            if (this.get("username") === "test" && this.get("password") === "test") {
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
