define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Mixin.create({
        documentTitle : Ember.computed(function () {
            var documentTitle = this.get("controllers.player.documentTitle");

            if (this.get("hasObjectModel")) {
                documentTitle += " - " + this.get("username");
            }

            if (this.get("controllerTitle")) {
                documentTitle += " - " + this.get("controllerTitle");
            }

            return documentTitle;
        }).property("controllers.player.documentTitle", "username", "controllerTitle"),
        isLeaf : true,
        hasObjectModel : false,
        needs : ["application", "player"]
    });
});
