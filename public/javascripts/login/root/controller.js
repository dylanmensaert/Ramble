define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.ObjectController.extend({
        documentTitle: "Log in",
        isLeaf: true,
        isLoggedIn: false,
        isValidLogin: true,
        lastTransition: null,
        didLoginSuccessfully: function (player) {
            var lastTransition = this.get("lastTransition");

            this.set("model", player);
            this.set("isLoggedIn", true);
            this.set("isValidLogin", true);

            if (lastTransition) {
                this.set("lastTransition", null);

                lastTransition.retry();
            } else {
                this.transitionToRoute("player", this.get("model"));
            }
        },
        actions: {
            login: function () {
                var self = this;

                //TODO: temporary client-sided test
                //TODO: before trying to authenticate, check if fields are not empty
                if (this.get("username") === "donut" && this.get("password") === "donut") {
                    this.get("store").find("player", 1).then(function (model) {
                        self.didLoginSuccessfully(model);
                    });
                } else {
                    this.set("isValidLogin", false);
                }
            },
            logout: function () {
                this.set("isLoggedIn", false);

                //TODO: Secure to just put model of logged-in user to null?
                this.set("model", null);

                this.transitionToRoute("index");
            }
        }
    });
});
