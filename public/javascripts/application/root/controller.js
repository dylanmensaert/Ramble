define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Controller.extend({
        documentTitle: "Application",
        isLeaf: false,
        needs: ["login"],
        isLoggedInBinding: "controllers.login.isLoggedIn",
        accountBinding: "controllers.login.model",
        logout: function () {
            this.get("controllers.login").send("logout");
        }
    });
});
