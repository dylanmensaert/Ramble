define(function (require) {
    "use strict";

    var Ember = require("Ember");

    return Ember.Controller.extend({
        documentTitle: "Home",
        isLeaf: true,
        needs: ["application"],
        isLoggedInBinding: "controllers.application.isLoggedIn"
    });
});
