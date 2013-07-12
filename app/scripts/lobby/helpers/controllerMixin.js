define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Mixin.create({
        documentTitle : Ember.computed(function () {
            var documentTitle = this.get("controllers.lobby.documentTitle");

            if (this.get("hasObjectModel")) {
                documentTitle += " - " + this.get("title");
            }

            if (this.get("controllerTitle")) {
                documentTitle += " - " + this.get("controllerTitle");
            }

            return documentTitle;
        }).property("controllers.lobby.documentTitle", "title", "controllerTitle"),
        isLeaf : true,
        hasObjectModel : false,
        needs : ["application", "lobby"]
    });
});
