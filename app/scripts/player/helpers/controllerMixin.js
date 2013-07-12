define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Mixin.create({
        documentTitle : Ember.computed(function () {
            var documentTitle, divider;

            documentTitle = this.get("controllers.player.documentTitle");
            divider = " - ";

            if (this.get("hasObjectModel")) {
                documentTitle += divider + this.get("username");
            }

            if (this.get("controllerTitle")) {
                documentTitle += divider + this.get("controllerTitle");
            }

            return documentTitle;
        }).property("controllers.player.documentTitle", "username", "controllerTitle"),
        isLeaf : true,
        hasObjectModel : false,
        needs : ["application", "player"]
    });
});
