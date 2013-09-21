define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Mixin.create({
        documentTitle: function () {
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
        }.property("controllers.player.documentTitle", "username", "controllerTitle"),
        hasObjectModel: false,
        needs: ["player"]
    });
});
