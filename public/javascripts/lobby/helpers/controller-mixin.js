define(function (require) {
    "use strict";

    var Ember = require("ember");

    return Ember.Mixin.create({
        documentTitle: function () {
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
        }.property("controllers.lobby.documentTitle", "title", "controllerTitle"),
        hasObjectModel: false,
        needs: ["lobby"]
    });
});
