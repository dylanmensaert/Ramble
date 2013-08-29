define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Controller.extend({
        documentTitle: "Application",
        isLeaf: false,
        needs: ["login"],
        isLoggedIn: Ember.computed.alias("controllers.login.isLoggedIn"),
        account: Ember.computed.alias("controllers.login.model"),
        actions: {
            logout: function () {
                this.get("controllers.login").send("logout");
            }
        }
    });
});
