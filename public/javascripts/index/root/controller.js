define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Controller.extend({
        documentTitle: "Home",
        isLeaf: true,
        needs: ["application"],
        isLoggedIn: Ember.computed.alias("controllers.application.isLoggedIn")
    });
});
