define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Controller.extend({
        documentTitle : "Application",
        isLeaf : false,
        needs : ["login"],
        isLoggedInBinding : "controllers.login.isLoggedIn",
        accountBinding : "controllers.login.model",
        logout : function () {
            this.get("controllers.login").send("logout");
        }
    });
});
