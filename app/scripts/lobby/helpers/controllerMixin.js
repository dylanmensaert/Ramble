define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Mixin.create({
        documentTitle : Ember.computed(function () {
            var documentTitle, divider;

            documentTitle = this.get("controllers.lobby.documentTitle");
            divider = " - ";

            if (this.get("hasObjectModel")) {
                documentTitle += divider + this.get("title");
            }

            if (this.get("controllerTitle")) {
                documentTitle += divider + this.get("controllerTitle");
            }

            return documentTitle;
        }).property("controllers.lobby.documentTitle", "title", "controllerTitle"),
        isLeaf : true,
        hasObjectModel : false,
        needs : ["application", "lobby"],
        isLoggedIn : false,
        account : null,
        isLoggedInBinding : "controllers.application.isLoggedIn",
        accountBinding : "controllers.application.account"
    });
});
