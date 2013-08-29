define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        App = require("App");

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
                //TODO: temporary client-sided test
                //TODO: before trying to authenticate, check if fields are not empty
                var model;

                if (this.get("username") === "donut" && this.get("password") === "donut") {
                    model = App.Player.find(1);

                    //TODO: Temporary fix, should be able to just use the "one", but for some reason the didLoad-event doesn't always fire.
                    if (model.get("isLoaded")) {
                        this.didLoginSuccessfully(model);
                    } else {
                        model.one("didLoad", this, function () {
                            this.didLoginSuccessfully(model);
                        });
                    }
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
