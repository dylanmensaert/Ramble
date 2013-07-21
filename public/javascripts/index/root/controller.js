define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Controller.extend({
        documentTitle : "Home",
        isLeaf : true,
        needs : ["application"],
        isLoggedInBinding : "controllers.application.isLoggedIn"
    });
});
